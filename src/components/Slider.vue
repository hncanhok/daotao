<template>
  <div class="wrapper text-center">
    <Splide
      aria-labelledby="autoplay-example-heading"
      :options="options"
      :has-track="false"
    >
      <div style="position: relative">
        <SplideTrack>
          <SplideSlide v-for="(slide, index) in slides" :key="index">
            <img :src="slide.urlDetail" :alt="index" />
          </SplideSlide>
        </SplideTrack>
      </div>

      <div class="splide__progress">
        <div class="splide__progress__bar"></div>
      </div>
    </Splide>
  </div>
</template>

<script lang="ts">
import {
  Splide,
  SplideSlide,
  SplideTrack,
  Options,
} from "@splidejs/vue-splide";
import { defineComponent, ref } from "vue";
import "@splidejs/vue-splide/css";

export default defineComponent({
  name: "AutoplayExample",

  components: {
    Splide,
    SplideTrack,
    SplideSlide,
  },

  setup() {
    const slides = ref([]);
    const loadImagesBanner = () => {
      axios
        .get(
          "https://daotao.alphanam.com:7150/api/MenuInfo/GetallMenuByGroup?groupid=3"
        )
        .then((response) => {
          slides.value = response.data;
        
        })
        .catch((error) => {
          console.log(error);
        });
    };
    loadImagesBanner();
    const options: Options = {
      rewind: true,
      gap: "1rem",
      autoplay: true,
      interval: 2000,
      height: "30rem",
      breakpoints: {
        576: {
          height: "8rem",
        },
        820: {
          height: "15rem",
        },
      },
    };

    return {
      slides,
      options,
    };
  },
});
</script>

<style>
hr {
  width: 200px;
  max-width: 50%;
  margin: 4rem auto;
}

button {
  font-family: inherit;
}

.wrapper {
  margin: 0 auto;
}

.splide__slide {
  background: #eee;
}

.splide__slide img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  
}

.splide--nav {
  margin-top: 1rem;
}


</style>
