import TodoItem from "./TodoItem.vue";

describe("Visual", () => {
  it("should render done", () => {
    cy.mount(TodoItem, {
      propsData: {
        label: "吃饭",
        isDone: true,
      },
    });

    cy.get("[data-cy='status-toggle']").should("have.class", "is-checked");
    cy.get("[data-cy='todo-label']").should("contain.text", "吃饭");
    cy.get("[data-cy='todo-label']").should("have.class", "done");
    cy.get("[data-cy='todo-label']").should("not.have.class", "todo");
  });

  it("should render todo", () => {
    cy.mount(TodoItem, {
      propsData: {
        label: "下班",
        isDone: false,
      },
    });

    cy.get("[data-cy='status-toggle']").should("not.have.class", "is-checked");
    cy.get("[data-cy='todo-label']").should("contain.text", "下班");
    cy.get("[data-cy='todo-label']").should("not.have.class", "done");
    cy.get("[data-cy='todo-label']").should("have.class", "todo");
  });

  it("should have a delete btn with label: delete", () => {
    cy.mount(TodoItem, {
      propsData: {
        label: "下班",
        isDone: false,
      },
    });
    cy.get("[data-cy='delete-btn']").should("exist");
  });
});

describe("Behavioral", () => {
  it("should toggle status when click checkbox", () => {
    cy.mount(TodoItem, {
      propsData: {
        label: "下班",
        isDone: false,
      },
    }).then(({ wrapper }) => {
      return cy.wrap(wrapper).as("vue");
    });

    cy.get("[data-cy='status-toggle']").should("not.have.class", "is-checked");
    cy.get("[data-cy='status-toggle']").click();
    cy.get("@vue").then((current: any) => {
      current.setProps({
        isDone: true,
      });
    });
    cy.get("[data-cy='status-toggle']").should("have.class", "is-checked");
  });

  it("should emit event when toggle status", () => {
    const onToggleSpy = cy.spy().as("onToggleSpy");
    cy.mount(TodoItem, {
      propsData: {
        label: "下班",
        isDone: false,
      },
      listeners: {
        toggle: onToggleSpy,
      },
    });

    cy.get("[data-cy='status-toggle']").click();
    cy.get("@onToggleSpy").should("have.been.calledOnce");
  });

  it("should emit delete event when click delete btn", () => {
    const onDeleteSpy = cy.spy().as("onDeleteSpy");
    cy.mount(TodoItem, {
      propsData: {
        label: "下班",
        isDone: false,
      },
      listeners: {
        delete: onDeleteSpy,
      },
    });
    cy.get("[data-cy='delete-btn']").click();
    cy.get("@onDeleteSpy").should("have.been.calledOnce");
  });
});
