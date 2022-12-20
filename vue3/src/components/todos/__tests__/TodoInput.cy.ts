import TodoInput from "../TodoInput.vue";

describe("<TodoInput />", () => {
  it("renders", () => {
    cy.mount(TodoInput);
    cy.get('[test-id="todo-input"]').should("exist");
    cy.get('[test-id="todo-input"]').should(
      "have.attr",
      "placeholder",
      "press enter add todo"
    );
  });
  it("should input", () => {
    cy.mount(TodoInput);
    cy.get('[test-id="todo-input"]').type("饿了");
    cy.get('[test-id="todo-input"]').should("have.value", "饿了");
  });
  it("should add a new todo when press enter", () => {
    const onAddSpy = cy.spy().as("onAddSpy");
    cy.mount(TodoInput, {
      listeners: {
        add: onAddSpy,
      },
    });
    cy.get('[test-id="todo-input"]').type("饿了{enter}");
    cy.get("@onAddSpy").should("have.been.calledOnce");
  });
  it("should NOT add a empty todo", () => {
    const onAddSpy = cy.spy().as("onAddSpy");
    cy.mount(TodoInput, {
      listeners: {
        add: onAddSpy,
      },
    });
    cy.get('[test-id="todo-input"]').type("{enter}");
    cy.get("@onAddSpy").should("not.have.been.called");
  });
  it("should clear input after add new todo", () => {
    cy.mount(TodoInput);
    cy.get('[test-id="todo-input"]').type("饿了{enter}");
    cy.get('[test-id="todo-input"]').should("have.value", "");
  });
});
