<script lang="ts">
import { defineComponent, reactive } from "vue";
import type { ComponentOptions } from "vue";

import { getOptions } from "@/utils/getOptions";

const props: ComponentOptions["props"] = {
  id: { type: String },

  kind: {
    type: String,
    default: () => "range",
  },

  arg: {
    type: [String, Object],
    defalt: () => {
      return {
        start: "!",
        end: "~",
      };
    },
  },

  options: { type: Array, default: () => undefined },

  require: {
    type: Boolean,
    default: () => false,
  },
};

const emits: ComponentOptions["emits"] = [
  "change-options-arg",
  "change-options-arg-kind",
  "change-options-arg-start",
  "change-options-arg-end",
];

const setup: ComponentOptions["setup"] = (
  $props: ComponentOptions["props"],
  $ctx: ComponentOptions["ctx"]
) => {
  const idx = $ctx.attrs["data-list-index"];
  const kind = $props.kind;
  const index = idx ? parseInt(idx, 10) : 0;
  const start = (() => {
    let val = "";
    if (typeof $props.arg === "object") {
      val = $props.arg.start as string;
    }

    return val || "!";
  })();
  const end = (() => {
    let val = "";
    if (typeof $props.arg === "object") {
      val = $props.arg.end as string;
    }

    return val || "~";
  })();
  const text = (() => {
    let val = "";
    if (typeof $props.arg === "string") {
      val = $props.arg as string;
    }

    return (
      val || "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyx"
    );
  })();
  const options = $props.options || getOptions(start, end);

  const model = reactive({
    index,
    kind,
    start,
    end,
    text,
    options,
  });

  const createResult = () => {
    const result = {
      index: model.index,
      kind: model.kind,
      arg: {},
    };

    if (model.kind === "range") {
      result.arg = {
        start: model.start,
        end: model.end,
      };
    } else {
      result.arg = {
        text: model.text,
      };
    }

    return result;
  };

  const doChangeKind = (event: Event) => {
    if (event) event.preventDefault();

    const result = createResult();

    $ctx.emit("change-options-arg-kind", { model: result });
    $ctx.emit("change-options-arg", { model: result });
  };

  const doChangeStart = (event: Event) => {
    if (event) event.preventDefault();

    const result = createResult();

    $ctx.emit("change-options-arg-start", { model: result });
    $ctx.emit("change-options-arg", { model: result });
  };

  const doChangeEnd = (event: Event) => {
    if (event) event.preventDefault();

    const result = createResult();

    $ctx.emit("change-options-arg-end", { model: result });
    $ctx.emit("change-options-arg", { model: result });
  };

  return {
    model,

    doChangeKind,
    doChangeStart,
    doChangeEnd,
  };
};

export default defineComponent({
  name: "o-options-arg",
  props,
  emits,
  setup,
});
</script>

<template src="./OOptionsArg.html"></template>
<style lang="scss" src="./OOptionsArg.scss" scoped></style>
