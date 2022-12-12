import TodoApp from "./TodoApp.vue";

const mockData = [
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
  it("should render todolist", () => {
    cy.mount(TodoApp, {
      data() {
        return { list: mockData };
      },
    });
    cy.get('[test-id="todo-item"]').should("have.length", 3);
  });

  it("should remove deleted item", () => {
    cy.mount(TodoApp, {
      data() {
        return { list: mockData };
      },
    });
    cy.get('[test-id="delete-btn"]').first().click();
    cy.get('[test-id="todo-item"]').should("have.length", 2);
    cy.get('[test-id="todo-app"]').should("not.contain.text", "Eat breakfast");
  });

  it("should add new one", () => {
    cy.mount(TodoApp, {
      data() {
        return { list: mockData };
      },
    });
    cy.get('[test-id="todo-item"]').should("have.length", 3);
    cy.get('[test-id="todo-input"]').type("Hungry{enter}");
    cy.get('[test-id="todo-item"]').should("have.length", 4);
    cy.get('[test-id="todo-app"]').should("contain.text", "Hungry");
  });

  it("should toggle status", () => {
    cy.mount(TodoApp, {
      data() {
        return { list: mockData };
      },
    });
    cy.get('[test-id="todo-label"]').first().should("have.class", "done");
    cy.get('[test-id="todo-item"] [test-id="status-toggle"]').first().uncheck();
    cy.get('[test-id="todo-label"]').first().should("have.class", "todo");
  });
});
