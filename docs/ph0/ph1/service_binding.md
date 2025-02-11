# Service binding
## 概要


## front→apiにbindingする
frontのwrangler.jsonに以下を追加する
```
"services": [
    {
      "binding": "API",  // envとして参照するkey
      "service": "hyper-librarian-api" // bindするWorker名

    }
  ]

```
- https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/