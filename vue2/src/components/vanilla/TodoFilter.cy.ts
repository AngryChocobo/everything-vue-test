import TodoFilter from "./TodoFilter.vue";

describe("Visual", () => {
  it("should have three filters", () => {
    cy.mount(TodoFilter);
    cy.get('[data-cy="filter-item"]').should("have.length", 3);
  });
});

describe("Behavioral", () => {
  it("should have default checked filter 'All'", () => {
    cy.mount(TodoFilter);
    cy.get('[data-cy="filter-item"][value="All"]').should("be.checked");
    cy.get('[data-cy="filter-item"][value="Active"]').should("not.be.checked");
    cy.get('[data-cy="filter-item"][value="Done"]').should("not.be.checked");
  });
});
