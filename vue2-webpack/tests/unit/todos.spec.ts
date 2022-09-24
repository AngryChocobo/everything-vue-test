import { shallowMount, createLocalVue, mount, Wrapper } from "@vue/test-utils";
import Element from "element-ui";
const localVue = createLocalVue();
localVue.use(Element);

// REALY CODE
import TodoApp from "../../src/views/TodoApp.vue";

describe("TodosApp", () => {
  let wrapper: Wrapper<Vue>,
    input: Wrapper<Vue, Element>,
    workList: Wrapper<Vue, Element>;
  beforeEach(() => {
    wrapper = mount(TodoApp, {
      localVue,
    });
    input = wrapper.find("[unit-test='input']");
    workList = wrapper.find("[unit-test='work-list']");
  });
  afterEach(() => {
    wrapper.destroy();
  });
  it("should correct render", () => {
    expect(input.exists()).toBe(true);
    expect((input.element as HTMLInputElement).value).toBe("Hello");
    expect(workList.exists()).toBe(true);
    expect(workList.element.children.length).toBe(2);
  });
});
