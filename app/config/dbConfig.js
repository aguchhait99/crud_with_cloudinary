const mongooes = require('mongoose');

const dbConnection = async () => {
    try {
        const isConnected = await mongooes.connect(process.env.MONGODB_URL);
        if (isConnected) {
            console.log("DB Connected Successfully");
        }
        else {
            console.log("DB Connection Failed");
        }
    } catch (err) {
        console.log("DB Connection Error: ", err);
    }
}

module.exports = dbConnection;