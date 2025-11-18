const { uploadToCloudinary, deleteFromCloudinary } = require("../helper/cloudinary")
const StudentModel = require("../model/student")


class StudentController {
    // Create STudent 
    async createStudent(req, res) {
        try {
            const { name, email, phone, age } = req.body
            const students = new StudentModel({
                name,
                email,
                phone,
                age
            })
            const isEmailExist = await StudentModel.findOne({ email: email })
            if (isEmailExist) {
                return res.status(400).json({
                    message: "Email Already Exists"
                })
            }
            if (req.file) {
                const cloudinaryResponse = await uploadToCloudinary(req.file.path)
                if (!cloudinaryResponse) {
                    return res.status(500).json({
                        message: "Failed to upload image to Cloudinary"
                    })
                }
                students.photo = cloudinaryResponse.secure_url
            }
            const data = await students.save()
            return res.status(201).json({
                message: "Student Created Successfully",
                data: data
            })
        } catch (err) {
            return res.status(500).json({
                message: "Internal Server Error",
                error: err.message
            })
        }
    }

    // Get All Students
    async getAllStudents(req, res) {
        try {
            const data = await StudentModel.find().sort({ createdAt: -1 })
            return res.status(200).json({
                message: "Students Retrieved Successfully",
                data: data
            })
        } catch (err) {
            return res.status(500).json({
                message: "Internal Server Error",
                error: err.message
            })
        }
    }

    // Student Details
    async singleStudent(req, res) {
        try {
            const studentId = req.params.id
            const data = await StudentModel.findById(studentId)
            if (!data) {
                return res.status(404).json({
                    message: "Student Not Found"
                })
            }
            return res.status(200).json({
                message: "Student Retrieved Successfully",
                data: data
            })
        } catch (err) {
            return res.status(500).json({
                message: "Internal Server Error",
                error: err.message
            })
        }
    }

    // Update Student
    async updateStudent(req, res) {
        try {
            const studentId = req.params.id
            const { name, email, phone, age } = req.body

            let updateData = { name, email, phone, age }

            if (req.file) {
                const studentData = await StudentModel.findById(studentId)
                if (studentData && studentData.photo) {
                    // Delete the old photo from Cloudinary
                    const publicId = studentData.photo.split('/').pop().split('.')[0]
                    await deleteFromCloudinary(publicId)
                }

                // Upload new image to Cloudinary
                const cloudinaryResponse = await uploadToCloudinary(req.file.path)
                if (!cloudinaryResponse) {
                    return res.status(500).json({
                        message: "Failed to upload new image to Cloudinary"
                    })
                }
                updateData.photo = cloudinaryResponse.secure_url
            }

            const student = await StudentModel.findByIdAndUpdate(studentId, updateData)
            if (!student) {
                return res.status(404).json({
                    message: "Student Not Found"
                })
            }

            return res.status(200).json({
                message: "Student Updated Successfully"
            })
        } catch (err) {
            return res.status(500).json({
                message: "Internal Server Error",
                error: err.message
            })
        }
    }

    // Delete Student
    async deleteStudent(req, res) {
        try {
            const studentId = req.params.id
            const student = await StudentModel.findById(studentId)
            if (!student) {
                return res.status(404).json({
                    message: "Student Not Found"
                })
            }

            // Delete photo from Cloudinary if exists
            if (student.photo) {
                const publicId = student.photo.split('/').pop().split('.')[0]
                await deleteFromCloudinary(publicId)
            }

            await StudentModel.findByIdAndDelete(studentId)
            return res.status(200).json({
                message: "Student Deleted Successfully"
            })
        } catch (err) {
            return res.status(500).json({
                message: "Internal Server Error",
                error: err.message
            })
        }
    }
}

module.exports = new StudentController();