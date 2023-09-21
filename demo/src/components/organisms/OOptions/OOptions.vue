<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import type { ComponentOptions } from "vue";
import { MDetailsVue } from "@/components/molecules";
import { OOptionsArgVue } from "@/components/organisms";

import { getOptions } from "@/utils/getOptions";

import type { RandomStringRange } from "@rksan/random-string/types-defines/types";

const props: ComponentOptions["props"] = {
  id: { type: String },

  title: {
    type: String,
    default: () => "arg-name",
  },

  args: {
    type: [Array, undefined],
    default: () => undefined,
  },
};

const emits: ComponentOptions["emits"] = ["change-options"];

const setup: ComponentOptions["setup"] = (
  $props: ComponentOptions["props"],
  $ctx: ComponentOptions["ctx"]
) => {
  const lists = (length: number): RandomStringRange[] => {
    const ary = new Array<RandomStringRange>(length);
    for (var i = 0; i < length; i++) {
      ary[i] = { start: "!", end: "~" };
    }
    return ary;
  };

  const model = reactive({
    length: $props.length as number,
    args: $props.args || lists(1),
  });

  const options = computed(() => {
    return getOptions("!", "~");
  });

  type DataModel = {
    model: {
      index: number;
      kind: string;
      arg: { start: string; end: string; text: string };
    };
  };

  const setResult = (data: DataModel): void => {
    const index = data.model.index;
    const kind = data.model.kind;
    const arg = data.model.arg;

    if (kind === "range") {
      const range = {
        start: arg.start,
        end: arg.end,
      };
      model.args[index] = range;
    } else {
      const text = arg.text;
      model.args[index] = text;
    }
  };

  const fireChangeOptions = (data: DataModel) => {
    console.log("data", data);

    setResult(data);

    $ctx.emit("change-options", { model });
  };

  const doClickAdd = (event: Event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    model.args.push({ start: "!", end: "~" });

    $ctx.emit("change-options", { model });
  };

  const doClickDel = (event: Event) => {
    if (event) event.preventDefault();

    const target = event.currentTarget;

    if (!target) return;

    const elem: HTMLElement = target as HTMLElement;
    const idx = elem.dataset.listIndex;

    if (idx === undefined) return;

    const i = parseInt(idx, 10);

    model.args = model.args.filter(
      (value: unknown, index: number) => index !== i
    );

    model.length = model.args.length;

    $ctx.emit("change-options", { model });
  };

  return {
    model,

    options,

    fireChangeOptions,

    doClickAdd,
    doClickDel,
  };
};

export default defineComponent({
  name: "o-options",

  components: {
    OOptionsArgVue,
    MDetailsVue,
  },

  props,
  emits,
  setup,
});
</script>

<template src="./OOptions.html"></template>
<style lang="scss" src="./OOptions.scss" scoped></style>
