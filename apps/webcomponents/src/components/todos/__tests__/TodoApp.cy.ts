import { createVNode, defineComponent } from "vue";
import "@/defineCustomElements";

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

beforeEach(() => {
  cy.intercept(
    {
      method: "GET",
      url: "/todos",
    },
    mockData()
  ).as("getUsers");
});
describe("Visual", () => {
  it("should render todolist", () => {
    const Comp = defineComponent({
      setup() {
        return () => createVNode("todo-app");
      },
    });
    cy.mount(Comp);
    cy.get("todo-app").shadow().as("shadowRoot");

    cy.get("@shadowRoot")
      .find('[data-cy="todo-item"]')
      .should("have.length", 3);
  });
});

describe("Behavioral", () => {
  it("should remove deleted item", () => {
    const Comp = defineComponent({
      setup() {
        return () => createVNode("todo-app");
      },
    });
    cy.mount(Comp);
    cy.get("todo-app").shadow().as("shadowRoot");
    cy.get("@shadowRoot").find('[data-cy="delete-btn"]').first().click();
    cy.get("@shadowRoot")
      .find('[data-cy="todo-item"]')
      .should("have.length", 2);
    cy.get("@shadowRoot")
      .find('[data-cy="todo-app"]')
      .should("not.contain.text", "Eat breakfast");
  });

  it("should add new one", () => {
    const Comp = defineComponent({
      setup() {
        return () => createVNode("todo-app");
      },
    });
    cy.mount(Comp);
    cy.get("todo-app").shadow().as("shadowRoot");
    cy.get("@shadowRoot")
      .find('[data-cy="todo-item"]')
      .should("have.length", 3);
    cy.get("@shadowRoot").find('[data-cy="todo-input"]').type("Hungry{enter}");
    cy.get("@shadowRoot")
      .find('[data-cy="todo-item"]')
      .should("have.length", 4);
    cy.get("@shadowRoot")
      .find('[data-cy="todo-app"]')
      .should("contain.text", "Hungry");
  });

  it("should toggle status", () => {
    const Comp = defineComponent({
      setup() {
        return () => createVNode("todo-app");
      },
    });
    cy.mount(Comp);
    cy.get("todo-app").shadow().as("shadowRoot");
    cy.get("@shadowRoot")
      .find('[data-cy="todo-label"]')
      .first()
      .should("have.class", "done");
    cy.get("@shadowRoot").find('[data-cy="status-toggle"]').first().click();
    cy.get("@shadowRoot")
      .find('[data-cy="todo-label"]')
      .first()
      .should("have.class", "todo");
  });

  it("should apply status filter", () => {
    const Comp = defineComponent({
      setup() {
        return () => createVNode("todo-app", {});
      },
    });
    cy.mount(Comp);
    cy.get("todo-app").shadow().as("shadowRoot");
    cy.get("@shadowRoot")
      .find('[data-cy="todo-item"]')
      .should("have.length", mockData().length);
    cy.get("@shadowRoot")
      .find('[data-cy="filter-item"] input[value="Active"]')
      .check();
    cy.get("@shadowRoot")
      .find('[data-cy="todo-item"]')
      .should("have.length", 2);
    cy.get("@shadowRoot")
      .find('[data-cy="filter-item"]')
      .contains("Done")
      .click();
    cy.get("@shadowRoot")
      .find('[data-cy="todo-item"]')
      .should("have.length", 1);
  });
});
