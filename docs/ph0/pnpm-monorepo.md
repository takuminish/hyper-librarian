# pnpmでモノレポ構成にする

## pnpmのインストール
npm installでpnpmをインストール
- https://pnpm.io/ja/installation#npm-%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8B

## pnpm init
- pnpm initでpackage.jsonを作成
- package.jsonにてenginesを指定し、.npmrcにてengine-strict=trueを指定することで、npm、yarnを禁止する
  - https://pnpm.io/ja/npmrc#engine-strict
```json
  "engines": {
    "npm": "pnpmを使用してください",
    "yarn": "pnpmを使用してください"    
  },
```


## pnpm-workspace.yamlを定義してモノレポ構成を作る
- https://pnpm.io/ja/pnpm-workspace_yaml
```
packages:
  - 'packages/*'
```