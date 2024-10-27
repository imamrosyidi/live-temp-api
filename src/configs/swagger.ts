import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Temperature Monitoring API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.ts", "./src/docs/*.ts"],
};

const swaggerSpecs = swaggerJsDoc(options);
export default swaggerSpecs;
