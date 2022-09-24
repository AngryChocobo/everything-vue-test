import { shallowMount, createLocalVue } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import Element from "element-ui";
const localVue = createLocalVue();
localVue.use(Element);

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
      localVue,
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
