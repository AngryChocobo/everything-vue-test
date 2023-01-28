# Everything in Vue Test

> Everything I should know to test vue components.I will use vue2, vue3, elementUI and ant-design-vue to build some TodoApp.Then use cypress and vue test utils to test them.

---

## Project Architecture Works

- [x] monorepo
- [x] shared ts type, hooks and logic
- [x] CI/CD
- [ ] define custom cyress command to help query dom and select them
- [x] turbo task chain

## Components Test Works

- [x] vue2 vanilla TodoApp
- [x] vue2 + elementUI TodoApp
- [x] vue3 + ant-design-vue TodoApp
- [x] mock API
- [x] web components
- [x] pinia for vue3
- [ ] vuex for vue2
- [x] $t i18n

## E2E Test Works

- [x] vue2 vanilla TodoApp
- [x] vue2 + elementUI TodoApp
- [x] vue3 + ant-design-vue TodoApp
- [x] vue-router for vue2
- [x] vue-router for vue3

## Test Case Refactor

- [x] test case should category `Visual` and `Behavioral`

---

## Questions Record

<details>
  <summary> how to modify vue props and data </summary>

```ts
cy.mount(TodoItem, {
  propsData: {
    label: "下班",
    isDone: false,
  },
}).then(({ wrapper }) => {
  return cy.wrap(wrapper).as("vue");
});

cy.get("@vue").then((current: any) => {
  current.setProps({
    isDone: true,
  });
});
```

</details>

<details>
  <summary> 如何测试依赖 elemenet2 的组件（vue2） </summary>

```ts
// cypress/support/component.ts
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Cypress.Commands.add("mount", (component, args = {}) => {
  Vue.use(ElementUI);

  return mount(component as any, args);
});
```

</details>

<details>
  <summary> 如何测试依赖 antdv 的组件（vue3） </summary>

分两种情况

1. 配置了 unplugin-vue-components 的话，cypress 无需特别配置
2. 否则，需要如下配置

```ts
// cypress/support/component.ts
import Antdv from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

Cypress.Commands.add("mount", (component, args = {}) => {
  args.global = args.global || {};
  args.global.plugins = args.global.plugins || [];
  args.global.plugins.push(Antdv);
  return mount(component as any, args);
});
```

</details>

<details>
  <summary> 如何测试 pinia </summary>

```ts
// cypress/support/component.ts
import { createPinia, setActivePinia } from "pinia";
setActivePinia(createPinia());
```

</details>

<details>
  <summary> 如何使用全局函数，如$t </summary>

```ts
// cypress/support/component.ts
Cypress.Commands.add("mount", (component: any, args: any = {}) => {
  args.global.mocks = args.global.mocks || {};
  args.global.mocks.$xss = xss;
});
```

</details>
