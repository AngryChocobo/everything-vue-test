# Everything in Vue Test

everything I should know to test vue

## jest config 相关

> jest --init

创建 jest config 时候，我们希望代码可以测试 dom，但是 jest-environment-jsdom 从 28 版本开始不再默认安装，所以我们需要手动:

> npm install --save-dev jest-environment-jsdom

## 让 jest 支持 ts

### 方法 1

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

### 方法 2 ts-jest

按照 [官方文档](https://kulshekhar.github.io/ts-jest)进行操作:

|                     | using npm                      | using yarn                           |
| ------------------: | ------------------------------ | ------------------------------------ |
|   **Prerequisites** | `npm i -D jest typescript`     | `yarn add --dev jest typescript`     |
|      **Installing** | `npm i -D ts-jest @types/jest` | `yarn add --dev ts-jest @types/jest` |
| **Creating config** | `npx ts-jest config:init`      | `yarn ts-jest config:init`           |
|   **Running tests** | `npm test` or `npx jest`       | `yarn test` or `yarn jest`           |

同样成功，对比一下 ts-node 生成的 jest.config.js ，多了一个 `preset: "ts-jest"`。 这种设计在很多的配置文件中都存在，立个 TODO 日后研究一下

---

这里我们采用方法 2，更少的配置，可以将依赖 `@babel/preset-typescript` 删除咯

> npm uninstall @babel/preset-typescript
