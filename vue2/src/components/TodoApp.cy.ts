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

  it.skip("can add new one", () => {
    cy.mount(TodoApp, {
      data() {
        return { list: mockData };
      },
    });
    cy.get('[test-id="delete-btn"]').first().click();
    cy.get('[test-id="todo-item"]').should("have.length", 2);
    cy.get('[test-id="todo-app"]').should("not.contain.text", "Eat breakfast");
  });
});
