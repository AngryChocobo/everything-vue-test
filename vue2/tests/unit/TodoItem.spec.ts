import { shallowMount } from "@vue/test-utils";
import TodoItem from "@/components/TodoItem.vue";

describe("TodoItem", () => {
  it("should render base content", () => {
    const wrapper = shallowMount(TodoItem, {
      propsData: {
        label: "吃饭",
        isDone: true,
      },
    });
    const checkbox = wrapper.find("[test-id='status-toggle']");
    expect((checkbox.element as HTMLInputElement).checked).toBeTruthy();

    const label = wrapper.find("[test-id='todo-label']");
    expect(label.exists()).toBeTruthy();
    expect(label.text()).toBe("吃饭");
  });
});
