<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import type { ComponentOptions } from "vue";

import { OOptionsArgVue, OOptionsVue } from "@/components/organisms/";
import { getOptions } from "@/utils/getOptions";

import { randomString } from "@rksan/random-string";

const setup: ComponentOptions["setup"] = () => {
  const classes = reactive({
    form: "",
  });

  const data = reactive({
    sample: randomString(8),
    result: "",
    message: "",
  });

  const model = reactive({
    length: 8,
    src: [],
    exclude: [],
  });

  model.src.push({ start: "!", end: "~" } as never);

  const options = computed(() => {
    return getOptions("!", "~");
  });

  const fireChangeOptionsSrc = (data: { model: { args: [] } }) => {
    const args = data.model.args;

    model.src = args;
    clearValidity();
  };

  const fireChangeOptionsExclude = (data: { model: { args: [] } }) => {
    const args = data.model.args;

    model.exclude = args;

    clearValidity();
  };

  const checkKind = (args: never[]) => {
    for (let i = 0; i < args.length; i++) {
      return typeof args[i];
    }
    return "string";
  };

  const clearValidity = () => {
    classes.form = "";
    data.message = "";
  };

  const checkValidity = (): { name: string; message: string } | undefined => {
    if (model.length <= 0) {
      return { name: "length", message: "Must be 0 < Length" };
    }

    if (model.src.length < 1) {
      return { name: "src", message: "One or more Src must be specified" };
    }

    if (!model.src.every((v, i, a) => typeof v === typeof a[0])) {
      return { name: "src", message: "Kind of Src must be one type" };
    }

    if (
      0 < model.exclude.length &&
      !model.exclude.every((v, i, a) => typeof v === typeof a[0])
    ) {
      return { name: "exclude", message: "Kind of Exclude must be one type" };
    }

    return undefined;
  };

  const doClickRandomString = (event: Event) => {
    if (event) event.preventDefault();

    let check = checkValidity();

    if (check) {
      classes.form += "";
      data.message = check.message;
      return;
    }

    const length = model.length;

    const src =
      checkKind(model.src) === "object"
        ? model.src.filter((v, i, a) => typeof v === typeof a[0])
        : model.src[0];

    const exclude =
      checkKind(model.exclude) === "object"
        ? model.exclude.filter((v, i, a) => typeof v === typeof a[0])
        : model.exclude[0];

    const str = randomString(length, { src, exclude });

    data.result = str;
  };

  const doClickClear = (event: Event) => {
    if (event) {
      event.preventDefault();
    }

    data.result = "";
  };

  return {
    classes,
    data,
    model,
    options,

    fireChangeOptionsSrc,
    fireChangeOptionsExclude,

    doClickRandomString,
    doClickClear,
  };
};

export default defineComponent({
  name: "page-home",
  components: {
    OOptionsArgVue,
    OOptionsVue,
  },
  setup,
});
</script>
<template src="./PHome.html"></template>
<style lang="scss" src="./PHome.scss" scoped></style>
