// DT Node.js Challenge - Swagger API Documentation (HR Required)
export default {
  openapi: '3.0.0',
  info: {
    title: 'DT Task Manager API',
    version: '1.0.0',
    description: 'DeepTech Node.js Challenge - Full CRUD Task Management API'
  },
  servers: [
    { url: 'http://localhost:3000/api', description: 'Local Development' }
  ],
  paths: {
    '/tasks': {
      get: {
        summary: 'Get all tasks',
        tags: ['Tasks'],
        responses: {
          '200': {
            description: 'List of tasks',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    count: { type: 'integer', example: 5 },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          _id: { type: 'string', example: '64f...abc' },
                          title: { type: 'string', example: 'Complete DT Challenge' },
                          description: { type: 'string', example: 'Backend + Frontend' },
                          completed: { type: 'boolean', example: false },
                          createdAt: { type: 'string', format: 'date-time' }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        summary: 'Create new task',
        tags: ['Tasks'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { 
                    type: 'string', 
                    example: 'Test Task',
                    description: 'Task title (required)'
                  },
                  description: { 
                    type: 'string', 
                    example: 'Task description (optional)' 
                  }
                },
                required: ['title']
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Task created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/Task' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/tasks/{id}': {
      put: {
        summary: 'Update task',
        tags: ['Tasks'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Task ID',
            schema: { type: 'string' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  completed: { type: 'boolean' }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Task updated successfully'
          },
          '404': {
            description: 'Task not found'
          }
        }
      },
      delete: {
        summary: 'Delete task',
        tags: ['Tasks'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Task ID',
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': {
            description: 'Task deleted successfully'
          },
          '404': {
            description: 'Task not found'
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Task: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          completed: { type: 'boolean', default: false },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      }
    }
  }
};
