import { defineCustomElement } from "vue";

import TodoItem from "@/components/todos/TodoItem.vue";
import TodoInput from "@/components/todos/TodoInput.vue";
import TodoFilter from "@/components/todos/TodoFilter.vue";
import TodoApp from "@/components/todos/TodoApp.vue";

customElements.define("todo-item", defineCustomElement(TodoItem));
customElements.define("todo-input", defineCustomElement(TodoInput));
customElements.define("todo-filter", defineCustomElement(TodoFilter));
customElements.define("todo-app", defineCustomElement(TodoApp));
