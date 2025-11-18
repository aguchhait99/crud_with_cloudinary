const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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
                url: "http://localhost:3001",
                description: "Local server",
            },
        ],
    },

    // Path to routes/controllers where Swagger comments are written
    apis: ["./app/router/*.js", "./controllers/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    console.log("📄 Swagger Docs available at http://localhost:3001/api-docs");
}

module.exports = swaggerDocs;
