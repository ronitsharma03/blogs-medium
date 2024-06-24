import { Hono } from 'hono'

const app = new Hono()

app.get('/api/v1', (c) => {
  return c.text('Hello Hono!');
});

app.post('/api/v1/user/signup', (c) => {
  return c.text('Signup post route')
});


app.post('/api/v1/user/signin', (c) => {
  return c.text('Signin post route')
});


app.post('/api/v1/blog', (c) => {
  return c.text('Blog post route')
});


app.put('/api/v1/blog', (c) => {
  return c.text('Blog put route')
});

app.get('/api/v1/blog/:id', (c) => {
  return c.text('Blog with id Get route')
});

app.get('/api/v1/blog/bulk', (c) => {
  return c.text('Bulk blog get route')
});


export default app
