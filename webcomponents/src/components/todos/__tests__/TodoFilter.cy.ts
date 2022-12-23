import { createVNode, defineComponent } from "vue";
import "@/defineCustomElements";

describe("webcomponent <TodoFilter />", () => {
  it("should have three filters", () => {
    const Comp = defineComponent({
      setup() {
        return () => createVNode("todo-filter");
      },
    });
    cy.mount(Comp);
    cy.get("todo-filter").shadow().as("shadowRoot");

    cy.get("@shadowRoot")
      .find('[data-cy="filter-item"]')
      .should("have.length", 3);
  });
  it("should have default checked filter 'All'", () => {
    const Comp = defineComponent({
      setup() {
        return () => createVNode("todo-filter");
      },
    });
    cy.mount(Comp);
    cy.get("todo-filter").shadow().as("shadowRoot");
    cy.get("@shadowRoot")
      .find('[data-cy-data="All"]')
      .should("have.class", "ant-radio-wrapper-checked");
    cy.get("@shadowRoot")
      .find('[data-cy-data="Active"]')
      .should("not.have.class", "ant-radio-wrapper-checked");
    cy.get("@shadowRoot")
      .find('[data-cy-data="Done"]')
      .should("not.have.class", "ant-radio-wrapper-checked");
  });
});
