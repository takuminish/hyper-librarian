import { Hono } from 'hono'
import { renderer } from './renderer'
import { hc } from 'hono/client'
import { AppType } from '@api/index'
type Bindings = {
  API: Fetcher;
};

const app = new Hono<{Bindings: Bindings}>()

app.use(renderer)

app.get('/', (c) => {
  const client = hc<AppType>('/', { fetch: c.env.API.fetch.bind(c.env.API) })
  const res = client.index.$get();
  return c.render(<h1>{res}</h1>)
})

export default app
