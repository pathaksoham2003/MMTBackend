import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth API',
      version: '1.0.0',
      description: 'User Authentication API with JWT and Swagger',
    },
  },
  apis: ['./routes/*.js','./docs/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;