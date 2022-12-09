# TODOLIST

- [ ] 用 vue2 tdd 形式 实现
- [ ] 用 element+vue2 的形式 重构
- [ ] 用 element3 重构
- [ ] 封装为 webcomponent

## 需求分析

### TodoItem

- [x] 是 checkbox + label
- [x] 当 state 为 todo 时候，label 正常显示
- [ ] 当 state 为 done 时候，label text-decoration: line-through; (css 问题)
- [x] 当 state 为 todo 时候，checkbox 显示未勾选
- [x] 当 state 为 done 时候，checkbox 显示已勾选
- [ ] todo item 后边有删除按钮，按钮文字为 delete

### TODOList

- [ ] 展示 TodoItem 的列表
- [ ] 展示 TodoInput 的 input
- [ ] 点击 TodoItem 的 删除按钮时候，todolist 减少对应项

### TodoInput

- [ ] 是一个 input
- [ ] 当键入 enter 时候，发出事件 enter 并清空 input

## 记录问题

- cy 中 contain.text 和 include.text 的区别？
