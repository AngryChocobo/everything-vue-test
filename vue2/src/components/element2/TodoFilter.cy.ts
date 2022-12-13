import TodoFilter from "./TodoFilter.vue";

describe("<TodoFilter />", () => {
  it("should have three filters", () => {
    cy.mount(TodoFilter);
    cy.get('[test-id="filter-item"]').should("have.length", 3);
  });
  it("should have default checked filter 'All'", () => {
    cy.mount(TodoFilter);
    cy.get('[test-id="filter-item"][value="All"]').should("be.checked");
    cy.get('[test-id="filter-item"][value="Active"]').should("not.be.checked");
    cy.get('[test-id="filter-item"][value="Done"]').should("not.be.checked");
  });
});
