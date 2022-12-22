import TodoFilter from "../TodoFilter.vue";

describe("<TodoFilter />", () => {
  it("should have three filters", () => {
    cy.mount(TodoFilter);
    cy.get('[data-cy="filter-item"]').should("have.length", 3);
  });
  it("should have default checked filter 'All'", () => {
    cy.mount(TodoFilter);
    cy.get('[data-cy-data="All"]').should(
      "have.class",
      "ant-radio-wrapper-checked"
    );
    cy.get('[data-cy-data="Active"]').should(
      "not.have.class",
      "ant-radio-wrapper-checked"
    );
    cy.get('[data-cy-data="Done"]').should(
      "not.have.class",
      "ant-radio-wrapper-checked"
    );
  });
});
