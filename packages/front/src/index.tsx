import { Hono } from 'hono'
import { renderer } from './renderer'
import { hc } from 'hono/client'
import { AppType } from '@api/index'

type Bindings = {
  API: Fetcher;
};

const app = new Hono<{Bindings: Bindings}>()

app.use(renderer)

app.get('/', async (c) => {
  // https://github.com/honojs/hono/issues/2487
  const url = new URL(c.req.url)
  const baseUrl = `${url.protocol}//${url.hostname}`
  const client = hc<AppType>(baseUrl, {fetch: c.env.API.fetch.bind(c.env.API)});
 
  const res = await client.index.$get();
  const data = await res.text();
  return c.text(data);
})

export default app
