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
