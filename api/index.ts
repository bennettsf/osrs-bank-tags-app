import { OpenAPIHono } from '@hono/zod-openapi';
import bankTabs from './bank-tabs';

const app = new OpenAPIHono();

app.get('/', (c) => c.text('API running'));

app.route('/bankTabs', bankTabs);

/**
 * OpenAPI JSON
 */
app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    title: 'My API',
    version: '1.0.0',
  },
});

export default app;
