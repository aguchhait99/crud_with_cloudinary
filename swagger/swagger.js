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
                url: process.env.BASE_URL || (process.env.NODE_ENV === 'production'
                    ? `https://${process.env.VERCEL_URL || 'crud-with-claudinary.vercel.app'}`
                    : `http://localhost:${process.env.PORT || 3000}`),
                description: process.env.NODE_ENV === 'production' ? "Production server" : "Local server",
            },
        ],
    },
    apis: [
        // use __dirname-based paths so swagger-jsdoc can find JSDoc files after deployment
        path.join(__dirname, "../app/router/*.js"),
        path.join(__dirname, "../app/controller/*.js"),
    ],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
    // enable explorer for easier navigation
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

    const baseUrl = process.env.BASE_URL || (process.env.NODE_ENV === 'production'
        ? `https://${process.env.VERCEL_URL || 'crud-with-claudinary.vercel.app'}`
        : `http://localhost:${process.env.PORT || 3000}`);
    console.log(`📄 Swagger Docs available at ${baseUrl}/api-docs`);
}

module.exports = swaggerDocs;
