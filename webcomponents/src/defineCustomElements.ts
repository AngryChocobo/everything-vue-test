import { defineCustomElement } from "vue";

import TodoItem from "@/components/todos/TodoItem.vue";

customElements.define("todo-item", defineCustomElement(TodoItem));
