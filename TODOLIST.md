## 记录问题

- cy 中 contain.text 和 include.text 的区别？

- TodoApp 中，当删除一项时，list 中要减少对应项，这个该如何写 case 呢？

- 如何修改 props？ （data 同理）

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

- 如何测试依赖 elemenet2 的组件（vue2）？

```ts
// cypress/support/component.ts
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Cypress.Commands.add("mount", (component, args = {}) => {
  Vue.use(ElementUI);

  return mount(component as any, args);
});
```

- 如何测试依赖 antdv 的组件（vue3）？

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

- 如何测试 pinia ？

```ts
// cypress/support/component.ts
import { createPinia, setActivePinia } from "pinia";
setActivePinia(createPinia());
```
