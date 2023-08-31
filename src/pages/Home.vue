<template>
  <Slider />
  <Khoahoc />
  <Vinhdanh />
  <Phanhoi />
  <Tieudiem />
</template>

<script>
import Slider from "../components/Slider.vue";
import Khoahoc from "../components/Khoahoc.vue";
import Vinhdanh from '../components/Vinhdanh.vue';
import Phanhoi from "../components/Phanhoi.vue";
import Tieudiem from "../components/Tieudiem.vue"

export default {
  components: {
    Slider,
    Khoahoc,
    Vinhdanh,
    Phanhoi,
    Tieudiem
  },
  setup() {
  
  },
};
</script>
