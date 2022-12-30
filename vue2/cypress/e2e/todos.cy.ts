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

describe("todos", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "/todos",
      },
      mockData()
    ).as("getUsers");
  });

  it("should display vanilla todo app", () => {
    cy.visit("/");
    cy.contains("Vanilla TodoApp");
  });

  it("should display element2 todo app", () => {
    cy.visit("/#/element2");
    cy.contains("Element2 TodoApp");
  });

  describe("vue-router", () => {
    it("should link to new address", () => {
      cy.visit("/");
      cy.hash().should("eq", "#/");
      cy.get('[data-cy="routerlink-vanilla"]').should(
        "have.class",
        "router-link-active"
      );
      cy.get('[data-cy="routerlink-element2"]').should(
        "not.have.class",
        "router-link-active"
      );
      cy.get('[data-cy="routerlink-element2"]').click();
      cy.hash().should("eq", "#/element2");
    });
  });
});
