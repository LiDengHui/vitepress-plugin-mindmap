<template>
  <svg ref="svg" class="markmap-svg" :data-json="data" :style="style" ></svg>
</template>
<script setup>
import {computed, onMounted, onUnmounted, ref} from 'vue'
import {Markmap} from "markmap-view";
import delay from "@dhlx/delay";

const props = defineProps({
  data: {
    type: String,
    default: "",
  },
  type: {
    required: true,
    type: String,
    default: "fence",
  }
})

const svg = ref(null);
const mp = ref(null);
const aspect = ref(1);
const clientWidth = ref(600);

const resizefn = () => {
  clientWidth.value = svg.value?.clientWidth;
  mp.value?.fit();
};


onMounted(async () => {
  if (props.data) {
    try {
      mp.value = Markmap.create(svg.value, {
        autoFit: true,
        pan: false,
        zoom: false
      }, JSON.parse(props.data));
    } catch (error) {
      console.error(error);
    }

    await delay();
    const rect = mp.value?.state?.rect;
    if (!rect) return;
    const width = rect.x2 - rect.x1;
    const height = rect.y2 - rect.y1;
    aspect.value = height / width;
    clientWidth.value = svg.value?.clientWidth;
    window.addEventListener("resize", resizefn);
  }
})

onUnmounted(() => {
  mp.value?.destroy();
  window.removeEventListener("resize", resizefn);
})


const style = computed(() => {
  const height = clientWidth.value * aspect.value + 30;
  return {
    width: "100%",
    height: height + "px"
  }
})


</script>
<style scoped>

</style>
