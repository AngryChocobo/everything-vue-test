import TodoFilter from "../TodoFilter.vue";

describe("<TodoFilter />", () => {
  it("should have three filters", () => {
    cy.mount(TodoFilter);
    cy.get('[test-id="filter-item"]').should("have.length", 3);
  });
  it("should have default checked filter 'All'", () => {
    cy.mount(TodoFilter);
    cy.contains("All").should("have.class", "is-checked");
    cy.contains("Active").should("not.have.class", "is-checked");
    cy.contains("Done").should("not.have.class", "is-checked");
  });
});
