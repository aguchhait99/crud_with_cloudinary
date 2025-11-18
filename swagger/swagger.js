const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Student API Documentation",
            version: "1.0.0",
            description: "API documentation for Student CRUD system",
        },
        servers: [
            {
                url: process.env.NODE_ENV === 'production' ? "https://crud-with-claudinary.vercel.app" : `http://localhost:${process.env.PORT || 3000}`,
                description: process.env.NODE_ENV === 'production' ? "Production server" : "Local server",
            },
        ],
    },
    apis: [
        path.join(__dirname, "../app/router/*.js"),
        path.join(__dirname, "../app/controller/*.js"),
    ],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    console.log(`📄 Swagger Docs available at ${process.env.NODE_ENV === 'production' ? 'https://crud-with-claudinary.vercel.app' : `http://localhost:${process.env.PORT || 3000}`}/api-docs`);
}

module.exports = swaggerDocs;
