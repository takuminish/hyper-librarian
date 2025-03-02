import { Hono } from 'hono'

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{Bindings: Bindings}>();

const routes = app.get('/', async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM Customers WHERE CompanyName = ?",
  )
    .bind("Bs Beverages")
    .all();
  return Response.json(results);
})

export type AppType = typeof routes

export default app
