import { createTestingPinia } from "@pinia/testing";
import { useTodoList } from "@/stores/todos";
import { createVNode, defineComponent } from "vue";

describe("store", () => {
  const piniaSpy = cy.spy().as("piniaSpy");

  const Comp = defineComponent({
    setup() {
      return () => createVNode("div");
    },
  });

  cy.mount(Comp, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: piniaSpy,
        }),
      ],
    },
  });
  const store = useTodoList();
});

export {};
