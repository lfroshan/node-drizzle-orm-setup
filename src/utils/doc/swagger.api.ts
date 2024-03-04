import swaggerUi from 'swagger-ui-express';
import { Request, Response } from 'express';
import swaggerJsdoc, { Options } from 'swagger-jsdoc';

/**
 * Swagger options for API documentation.
 */
const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node and Drizzle ORM Development Guide',
      description: 'A comprehensive guide demonstrating the implementation of Drizzle ORM in Node.js. Covers backend basics, including error handling and security.',
      contact: {
        name: 'Roshan Shrestha',
        email: 'contactroshanstha@gmail.com',
        url: 'https://github.com/lfroshan'
      },
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server'
      },
      {
        url: 'http://localhost:8080',
        description: 'Local server'
      }
    ]
  },
  // Looks for configuration in specified directories
  apis: ['../../route/**/*.ts']
};

/**
 * Generates the Swagger specification.
 */
const swaggerSpec = swaggerJsdoc(options);

/**
 * Configures Swagger documentation for the Express app.
 * @param app - The Express app instance.
 * @param port - The server port.
 */
export default function SwaggerDocs(app: any, port: string | undefined) {
  // Swagger Page
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Documentation in JSON format.
  app.get('/api-docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}
