import TodoFilter from "../TodoFilter.vue";

describe("<TodoFilter />", () => {
  it("should have three filters", () => {
    cy.mount(TodoFilter);
    cy.get('[test-id="filter-item"]').should("have.length", 3);
  });
  it("should have default checked filter 'All'", () => {
    cy.mount(TodoFilter);
    cy.get('[test-data="All"]').should(
      "have.class",
      "ant-radio-wrapper-checked"
    );
    cy.get('[test-data="Active"]').should(
      "not.have.class",
      "ant-radio-wrapper-checked"
    );
    cy.get('[test-data="Done"]').should(
      "not.have.class",
      "ant-radio-wrapper-checked"
    );
  });
});
