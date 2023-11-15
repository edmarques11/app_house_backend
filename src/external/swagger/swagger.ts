import swaggerAutogen from "swagger-autogen";

swaggerAutogen();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["../routes/index.ts"];

swaggerAutogen(outputFile, endpointsFiles);
