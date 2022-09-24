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
  it("should v-model inputStr", async () => {
    await input.setValue("Go home");
    expect((wrapper.vm as any).inputStr).toBe("Go home");
    expect((input.element as HTMLInputElement).value).toBe("Go home");
  });
  it("should add a work to workList after press ENTER", async () => {
    // Looks like vts doesn't support this
    // await input.trigger("keydown.enter");
    await (wrapper.vm as any).onKeyDown({ code: "Enter" });
    expect(workList.element.children.length).toBe(3);
  });
});
