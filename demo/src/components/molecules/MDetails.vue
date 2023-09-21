<template>
  <div class="details">
    <div class="summary" @click="doClickSummary">
      <slot name="summary">
        <div v-if="summary" class="summary-label">
          <i class="bi bi-caret-right summary-icon-closed"></i>
          <i class="bi bi-caret-down summary-icon-opened"></i>
          {{ summary }}
        </div>
      </slot>
    </div>
    <div class="details-body">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.details {
  border: 1px solid gray;
  border-radius: 4px;
  padding: 0.5em 0.5em 0;
  &[data-open] {
    padding: 0.5em;
  }
}

.summary {
  font-weight: bold;
  margin: -0.5em -0.5em 0;
  padding: 0.5em;
  cursor: pointer;

  .summary-icon-opened {
    display: inline;
  }
  .summary-icon-closeed {
    display: none;
  }
}

.details-body {
  display: none;
  &[data-open] {
    display: block;
  }
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

const parentElement = (
  elem: HTMLElement,
  opt?: { tag?: string; cls: string }
) => {
  const parent = elem.parentElement;

  if (parent) return parent;

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

export default defineComponent({
  name: "m-details",

  props: {
    summary: {
      type: String,
    },
  },

  setup: () => {
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

      const body = details.querySelector(".details-body");

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
  },
});
</script>
