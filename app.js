require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dbConnection = require('./app/config/dbConfig');
const router = require('./app/router/studentRoutes');
const swaggerDocs = require('./swagger/swagger');


const app = express();

swaggerDocs(app);


const PORT = process.env.PORT || 3000;

dbConnection();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(__dirname + '/public'));
app.use("/uploads", express.static(__dirname + '/uploads'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));
app.use('/api', router)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})