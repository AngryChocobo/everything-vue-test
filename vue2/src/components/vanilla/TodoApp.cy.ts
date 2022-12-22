import TodoApp from "./TodoApp.vue";

const mockData = () => [
  {
    label: "Eat breakfast",
    isDone: true,
  },
  {
    label: "Go to Work",
    isDone: false,
  },
  {
    label: "Go home",
    isDone: false,
  },
];

describe("<TodoApp />", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "/todos",
      },
      mockData()
    ).as("getUsers");
  });
  it("should render todolist", () => {
    cy.mount(TodoApp);
    cy.get('[data-cy="todo-item"]').should("have.length", 3);
  });

  it("should remove deleted item", () => {
    cy.mount(TodoApp);
    cy.get('[data-cy="delete-btn"]').first().click();
    cy.get('[data-cy="todo-item"]').should("have.length", 2);
    cy.get('[data-cy="todo-app"]').should("not.contain.text", "Eat breakfast");
  });

  it("should add new one", () => {
    cy.mount(TodoApp);
    cy.get('[data-cy="todo-item"]').should("have.length", 3);
    cy.get('[data-cy="todo-input"]').type("Hungry{enter}");
    cy.get('[data-cy="todo-item"]').should("have.length", 4);
    cy.get('[data-cy="todo-app"]').should("contain.text", "Hungry");
  });

  it("should toggle status", () => {
    cy.mount(TodoApp);
    cy.get('[data-cy="todo-label"]').first().should("have.class", "done");
    cy.get('[data-cy="todo-item"] [data-cy="status-toggle"]').first().uncheck();
    cy.get('[data-cy="todo-label"]').first().should("have.class", "todo");
  });

  it("should apply status filter", () => {
    cy.mount(TodoApp, {
      data() {
        return { filter: "All" };
      },
    });
    cy.get('[data-cy="todo-item"]').should("have.length", mockData().length);
    cy.get('[data-cy="filter-item"][value="Active"]').check();
    cy.get('[data-cy="todo-item"]').should("have.length", 2);
    cy.get('[data-cy="filter-item"][value="Done"]').check();
    cy.get('[data-cy="todo-item"]').should("have.length", 1);
  });
});
