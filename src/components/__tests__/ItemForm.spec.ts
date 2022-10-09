import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import ItemForm from "../ItemForm.vue";

describe("HelloWorld", () => {
  it("renders properly", () => {
    const wrapper = mount(ItemForm, { props: { msg: "Hello Vitest" } });
    expect(wrapper.text()).toContain("Hello Vitest");
  });
});
