<template>
  <div class="about">
    <PAboutVue />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { PAboutVue } from "@/components/pages";

export default defineComponent({
  name: "about-view",

  components: { PAboutVue },
});
</script>
