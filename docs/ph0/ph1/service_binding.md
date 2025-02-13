# Service binding
## 概要
>Service bindings are fast. When you use Service Bindings, there is zero overhead or added latency. By default, both Workers run on the same thread of the same Cloudflare server.

URLを知ることなく、あるWorkerから別のWorkerを呼び出すことができる仕組み。RPCのようにメソッドを呼び出したり、HTTPリクエストを転送できる。

- https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/

## front→apiにbindingする
frontのwrangler.jsonに以下を追加する。apiのwrangler.jsonには何も追記しない
```
"services": [
    {
      "binding": "API",  // envとして参照するkey
      "service": "hyper-librarian-api" // bindするWorker名

    }
  ]

```
- https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/

## hono rpcを使用したbinding先への疎通
HTTPでのService binding。

```typescript
type Bindings = {
  API: Fetcher;
};

const app = new Hono<{Bindings: Bindings}>();

...
const url = new URL(c.req.url);
const baseUrl = `${url.protocol}//${url.hostname}`;
const client = hc<AppType>(baseUrl, {fetch: c.env.API.fetch.bind(c.env.API)});
```
- https://hono.dev/docs/guides/rpc#custom-fetch-method
  - documentだと、hc()の第一引数は'/'だが、baseUrlを指定しないと疎通ができなかった。`Invalid URL: `が発生する。
  - https://github.com/honojs/hono/issues/2487