# Everything in Vue Test

everything I should know to test vue

## jest config 相关

```bash
jest --init
```

创建 jest config 时候，我们希望代码可以测试 dom，但是 jest-environment-jsdom 从 28 版本开始不再默认安装，所以我们需要手动:

```bash
npm install --save-dev jest-environment-jsdom
```

## 让 jest 支持 ts

### via babel

npm install --save-dev @babel/preset-typescript

之后修改 babel.config.js 为:

```js
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
};
```

试验一下，我们把 sum.test.js 改成 sum.test.ts，sum.js 改成 sum.ts 然后改成 es module，尝试重新 `npm run test`， 成功咯

ps: 这里 ts 会提示缺少类型，`npm i --save-dev @types/jest` 即可

不过官方也提到了，这实际上是使用了 babel 来处理 ts，所以 jest 不会做 type check，解决方案就是使用 `ts-jest` 来替代

### via ts-jest

按照 [官方文档](https://kulshekhar.github.io/ts-jest)进行操作:

|                     | using npm                      | using yarn                           |
| ------------------: | ------------------------------ | ------------------------------------ |
|   **Prerequisites** | `npm i -D jest typescript`     | `yarn add --dev jest typescript`     |
|      **Installing** | `npm i -D ts-jest @types/jest` | `yarn add --dev ts-jest @types/jest` |
| **Creating config** | `npx ts-jest config:init`      | `yarn ts-jest config:init`           |
|   **Running tests** | `npm test` or `npx jest`       | `yarn test` or `yarn jest`           |

同样成功，对比一下 ts-node 生成的 jest.config.js ，多了一个 `preset: "ts-jest"`。 这种设计在很多的配置文件中都存在，立个 TODO 日后研究一下

我们这里发现 ts-jest 的 jest.config.js 还多了一个
`/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */`，它起到了智能提示的作用，但是更好的做法是我们直接改成 jest.config.ts。 不过改完以后发现再次执行 npm run test 就会报错：

> Error: Jest: Failed to parse the TypeScript config file /workspace/jest.config.ts
> Error: Jest: 'ts-node' is required for the TypeScript configuration files. Make sure it is installed

`npm i -D ts-node` 之后解决了。
好嘞，又多了一个新坑：TODO ts-node

---

这里我们采用方法 2，更少的配置，可以将依赖 `@babel/preset-typescript` 删除咯

> npm uninstall @babel/preset-typescript
