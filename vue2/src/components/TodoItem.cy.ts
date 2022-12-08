import TodoItem from "./TodoItem.vue";

describe("<TodoItem />", () => {
  it("should render done", () => {
    cy.mount(TodoItem, {
      propsData: {
        label: "吃饭",
        isDone: true,
      },
    });

    cy.get("[test-id='status-toggle']").should("be.checked");
    cy.get("[test-id='todo-label']").should("contain.text", "吃饭");
    cy.get("[test-id='todo-label']").should("have.class", "done");
    cy.get("[test-id='todo-label']").should("not.have.class", "todo");
  });

  it("should render todo", () => {
    cy.mount(TodoItem, {
      propsData: {
        label: "下班",
        isDone: false,
      },
    });

    cy.get("[test-id='status-toggle']").should("not.be.checked");
    cy.get("[test-id='todo-label']").should("contain.text", "下班");
    cy.get("[test-id='todo-label']").should("not.have.class", "done");
    cy.get("[test-id='todo-label']").should("have.class", "todo");
  });
});
