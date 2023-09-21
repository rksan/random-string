<script lang="ts">
import { defineComponent } from "vue";
import type { ComponentOptions } from "vue";

const props: ComponentOptions["props"] = {
  summary: {
    type: String,
  },
};

const parentElement = (
  elem: HTMLElement,
  opt?: { tag?: string; cls: string }
): HTMLElement | null => {
  const parent = elem.parentElement;

  if (!parent) return parent;

  let find = false;

  if (opt) {
    if (!find && opt.tag) {
      find = parent.tagName.toLowerCase() === opt.tag.toLowerCase();
    }
    if (!find && opt.cls) {
      find = parent.classList.contains(opt.cls);
    }
  }

  if (find) {
    return parent;
  } else {
    return parentElement(parent, opt);
  }
};

const setup: ComponentOptions["setup"] = () => {
  const doClickSummary = (event: Event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const target = event.currentTarget as HTMLElement;

    if (!target) return;

    const summary = target;

    const details = parentElement(summary, { cls: "details" });

    if (!details) return;

    const body = details.querySelector<HTMLElement>(".details-body");

    if (!summary || !body) return;

    if (details.dataset.open === "") {
      details.removeAttribute("data-open");
      summary.removeAttribute("data-open");
      body.removeAttribute("data-open");
    } else {
      details.dataset.open = "";
      summary.dataset.open = "";
      body.dataset.open = "";
    }
  };

  return { doClickSummary };
};

export default defineComponent({
  name: "m-details",

  props,
  setup,
});
</script>

<template src="./MDetails.html"></template>
<style lang="scss" scoped src="./MDetails.scss"></style>
