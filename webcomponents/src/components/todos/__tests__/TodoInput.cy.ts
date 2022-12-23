import { createVNode, defineComponent } from "vue";
import "@/defineCustomElements";

describe("webcomponent <TodoInput />", () => {
  it("renders", () => {
    const Comp = defineComponent({
      setup() {
        return () => createVNode("todo-input");
      },
    });
    cy.mount(Comp);
    cy.get("todo-input").shadow().as("shadowRoot");
    cy.get("@shadowRoot").find('[data-cy="todo-input"]').should("exist");
    cy.get("@shadowRoot")
      .find('[data-cy="todo-input"]')
      .should("have.attr", "placeholder", "press enter add todo");
  });
  it("should input", () => {
    const Comp = defineComponent({
      setup() {
        return () => createVNode("todo-input");
      },
    });
    cy.mount(Comp);
    cy.get("todo-input").shadow().as("shadowRoot");

    cy.get("@shadowRoot").find('[data-cy="todo-input"]').type("饿了");
    cy.get("@shadowRoot")
      .find('[data-cy="todo-input"]')
      .should("have.value", "饿了");
  });
  it("should add a new todo when press enter", () => {
    const onAddSpy = cy.spy().as("onAddSpy");
    const Comp = defineComponent({
      setup() {
        return () =>
          createVNode("todo-input", {
            onAdd: onAddSpy,
          });
      },
    });
    cy.mount(Comp);
    cy.get("todo-input").shadow().as("shadowRoot");
    cy.get("@shadowRoot").find('[data-cy="todo-input"]').type("饿了{enter}");
    cy.get("@onAddSpy").should("have.been.calledOnce");
  });
  it("should NOT add a empty todo", () => {
    const onAddSpy = cy.spy().as("onAddSpy");
    const Comp = defineComponent({
      setup() {
        return () =>
          createVNode("todo-input", {
            onAdd: onAddSpy,
          });
      },
    });
    cy.mount(Comp);
    cy.get("todo-input").shadow().as("shadowRoot");
    cy.get("@shadowRoot").find('[data-cy="todo-input"]').type("{enter}");
    cy.get("@onAddSpy").should("not.have.been.called");
  });
  it("should clear input after add new todo", () => {
    const Comp = defineComponent({
      setup() {
        return () => createVNode("todo-input");
      },
    });
    cy.mount(Comp);
    cy.get("todo-input").shadow().as("shadowRoot");
    cy.get("@shadowRoot").find('[data-cy="todo-input"]').type("饿了{enter}");
    cy.get("@shadowRoot")
      .find('[data-cy="todo-input"]')
      .should("have.value", "");
  });
});
