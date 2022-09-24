import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import Element from "element-ui";
const localVue = createLocalVue();
localVue.use(Element);

// REALY CODE
import TodoApp from "../../src/views/TodoApp.vue";

describe("TodosApp", () => {
  it("should correct render", () => {
    const wrapper = mount(TodoApp, {
      localVue,
    });
    const input = wrapper.find("[unit-test='input']");
    expect(input.exists()).toBe(true);
    expect((input.element as HTMLInputElement).value).toBe("Hello");
    const workList = wrapper.find("[unit-test='work-list']");
    expect(workList.exists()).toBe(true);
    expect(workList.element.children.length).toBe(2);
  });
});
