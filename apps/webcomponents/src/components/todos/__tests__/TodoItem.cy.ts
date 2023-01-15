import { createVNode, defineComponent } from "vue";
import "@/defineCustomElements";

describe("Visual", () => {
  it("should render as webcomponent", () => {
    const Comp = defineComponent({
      setup() {
        return () =>
          createVNode("todo-item", {
            label: "Work Hard",
            isDone: true,
          });
      },
    });
    cy.mount(Comp);
    cy.get("todo-item").should("exist");
  });

  it("should render done", () => {
    const Comp = defineComponent({
      setup() {
        return () =>
          createVNode("todo-item", {
            label: "吃饭",
            isDone: true,
          });
      },
    });
    cy.mount(Comp);
    cy.get("todo-item").shadow().as("shadowRoot");

    cy.get("@shadowRoot")
      .find("[data-cy='status-toggle']")
      .parent()
      .should("have.class", "ant-checkbox-checked");

    cy.get("@shadowRoot")
      .find("[data-cy='todo-label']")
      .should("contain.text", "吃饭");
    cy.get("@shadowRoot")
      .find("[data-cy='todo-label']")
      .should("have.class", "done");
    cy.get("@shadowRoot")
      .find("[data-cy='todo-label']")
      .should("not.have.class", "todo");
  });

  it("should render todo", () => {
    const Comp = defineComponent({
      setup() {
        return () =>
          createVNode("todo-item", {
            label: "下班",
            isDone: false,
          });
      },
    });
    cy.mount(Comp);
    cy.get("todo-item").shadow().as("shadowRoot");

    cy.get("@shadowRoot")
      .find("[data-cy='status-toggle']")
      .parent()
      .should("not.have.class", "ant-checkbox-checked");
    cy.get("@shadowRoot")
      .find("[data-cy='todo-label']")
      .should("contain.text", "下班");
    cy.get("@shadowRoot")
      .find("[data-cy='todo-label']")
      .should("not.have.class", "done");
    cy.get("@shadowRoot")
      .find("[data-cy='todo-label']")
      .should("have.class", "todo");
  });

  it("should have a delete btn with label: delete", () => {
    const Comp = defineComponent({
      setup() {
        return () =>
          createVNode("todo-item", {
            label: "下班",
            isDone: false,
          });
      },
    });
    cy.mount(Comp);
    cy.get("todo-item").shadow().as("shadowRoot");
    cy.get("@shadowRoot").find("[data-cy='delete-btn']").should("exist");
  });
});

describe("Behavioral", () => {
  it("should toggle status when click checkbox", () => {
    const Comp = defineComponent({
      setup() {
        return () =>
          createVNode("todo-item", {
            label: "下班",
            isDone: false,
          });
      },
    });
    cy.mount(Comp).then(({ wrapper }) => {
      return cy.wrap(wrapper).as("vue");
    });
    cy.get("todo-item").shadow().as("shadowRoot");

    cy.get("@shadowRoot")
      .find("[data-cy='status-toggle']")

      .parent()
      .should("not.have.class", "ant-checkbox-checked");
    cy.get("@shadowRoot").find("[data-cy='status-toggle']").click();
    cy.get("@vue").then((current: any) => {
      current.setProps({
        isDone: true,
      });
    });
    cy.get("@shadowRoot")
      .find("[data-cy='status-toggle']")
      .parent()
      .should("have.class", "ant-checkbox-checked");
  });

  it("should emit event when toggle status", () => {
    const onToggleSpy = cy.spy().as("onToggleSpy");
    const Comp = defineComponent({
      setup() {
        return () =>
          createVNode("todo-item", {
            label: "下班",
            isDone: false,
            onToggle: onToggleSpy,
          });
      },
    });
    cy.mount(Comp);
    cy.get("todo-item").shadow().as("shadowRoot");
    cy.get("@shadowRoot").find("[data-cy='status-toggle']").click();
    cy.get("@onToggleSpy").should("have.been.calledOnce");
  });

  it("should emit delete event when click delete btn", () => {
    const onDeleteSpy = cy.spy().as("onDeleteSpy");
    const Comp = defineComponent({
      setup() {
        return () =>
          createVNode("todo-item", {
            onDelete: onDeleteSpy,
            label: "下班",
            isDone: false,
          });
      },
    });
    cy.mount(Comp);
    cy.get("todo-item").shadow().as("shadowRoot");

    cy.get("@shadowRoot").find("[data-cy='delete-btn']").click();
    cy.get("@onDeleteSpy").should("have.been.calledOnce");
  });
});
