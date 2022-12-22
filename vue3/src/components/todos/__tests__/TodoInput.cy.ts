import TodoInput from "../TodoInput.vue";

describe("<TodoInput />", () => {
  it("renders", () => {
    cy.mount(TodoInput);
    cy.get('[data-cy="todo-input"]').should("exist");
    cy.get('[data-cy="todo-input"]').should(
      "have.attr",
      "placeholder",
      "press enter add todo"
    );
  });
  it("should input", () => {
    cy.mount(TodoInput);
    cy.get('[data-cy="todo-input"]').type("饿了");
    cy.get('[data-cy="todo-input"]').should("have.value", "饿了");
  });
  it("should add a new todo when press enter", () => {
    const onAddSpy = cy.spy().as("onAddSpy");
    cy.mount(TodoInput, {
      props: {
        onAdd: onAddSpy,
      },
    });
    cy.get('[data-cy="todo-input"]').type("饿了{enter}");
    cy.get("@onAddSpy").should("have.been.calledOnce");
  });
  it("should NOT add a empty todo", () => {
    const onAddSpy = cy.spy().as("onAddSpy");
    cy.mount(TodoInput, {
      props: {
        onAdd: onAddSpy,
      },
    });
    cy.get('[data-cy="todo-input"]').type("{enter}");
    cy.get("@onAddSpy").should("not.have.been.called");
  });
  it("should clear input after add new todo", () => {
    cy.mount(TodoInput);
    cy.get('[data-cy="todo-input"]').type("饿了{enter}");
    cy.get('[data-cy="todo-input"]').should("have.value", "");
  });
});
