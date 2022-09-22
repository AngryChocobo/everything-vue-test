# Everything in Vue Test

everything I should know to test vue

## jest config 相关

> jest --init

创建 jest config 时候，我们希望代码可以测试 dom，但是 jest-environment-jsdom 从 28 版本开始不再默认安装，所以我们需要手动:

> npm install --save-dev jest-environment-jsdom
