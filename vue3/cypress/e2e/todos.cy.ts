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

  it("should display vue welcome page", () => {
    cy.visit("/");
    cy.get('[data-cy="welcome-item"]');
  });

  it("should display todo app", () => {
    cy.visit("/#/antdv");
    cy.contains("antdv todos app");
  });

  describe("vue-router", () => {
    it("should link to new address", () => {
      cy.visit("/");
      cy.hash().should("eq", "#/");
      cy.get('[data-cy="routerlink-home"]').should(
        "have.class",
        "router-link-active"
      );
      cy.get('[data-cy="routerlink-antdv"]').should(
        "not.have.class",
        "router-link-active"
      );
      cy.get('[data-cy="routerlink-ag-grid"]').should(
        "not.have.class",
        "router-link-active"
      );
      cy.get('[data-cy="routerlink-ag-grid"]').click();
      cy.hash().should("eq", "#/ag-grid");
    });
  });
});
