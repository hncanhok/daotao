<template>
  <div class="container-fluid pb-5" style="background-color: #a10707">
    <div class="container pb-5">
      <div class="row p-5">
        <div class="col-12 text-center text-white" style="position: relative">
          <h1 style="font-weight: bold;">VINH DANH - KHEN THƯỞNG</h1>
          <div class="gachchan2">
            <img
              src="../assets/logo/Icon-Web-dao-tao-02-Trang.png"
              alt="khoa hoc goi y"
              width="150"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <Carousel
            :autoplay="2000"
            v-bind="settings"
            :breakpoints="breakpoints"
          >
            <Slide v-for="slide in data" :key="slide.id">
              <div class="carousel__item">
                <div
                  class="vinhdanh"
                  :style="{ backgroundImage: 'url(' + slide.imgHienthi + ')' }"
                ></div>
                <div>
                  <div class="pt-4">
                    <i
                      class="fa-solid fa-star fa-xl p-1"
                      style="color: #d1ad68"
                    ></i>
                    <i
                      class="fa-solid fa-star fa-xl p-1"
                      style="color: #d1ad68"
                    ></i>
                    <i
                      class="fa-solid fa-star fa-xl p-1"
                      style="color: #d1ad68"
                    ></i>
                    <i
                      class="fa-solid fa-star fa-xl p-1"
                      style="color: #d1ad68"
                    ></i>
                    <i
                      class="fa-solid fa-star fa-xl p-1"
                      style="color: #d1ad68"
                    ></i>
                  </div>
                  <h3 class="pt-4" style="color: #fff44b;height: 82px; overflow: hidden;" >
                    {{ slide.newPageDescription.toUpperCase() }}
                  </h3>
                  <h3 class="text-white" style="height: 39px; overflow: hidden;">
                    <span class="underline">
                      {{ slide.title.toUpperCase() }}</span
                    >
                  </h3>
                  <p
                    class="pt-3 text-white"
                    style="line-height: 1.6; height: 60px; overflow: hidden;"
                  >
                    {{ slide.newPageContent }}
                  </p>
                </div>
              </div>
            </Slide>

            <template #addons>
              <Navigation />
            </template>
          </Carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  name: "Breakpoints",
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      axios({
        method: "get",
        url: "http://10.16.100.33:7150/api/NewPaper/GetNewsbyCate?title=vinhdanh&pages=1",
      })
        .then((response) => {
          this.data = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  data: () => ({
    data: [],
    // carousel settings
    settings: {
      itemsToShow: 1,
      snapAlign: "center",
    },
    // breakpoints are mobile first
    // any settings not specified will fallback to the carousel settings
    breakpoints: {
      // 700px and up
      576: {
        itemsToShow: 1,
        snapAlign: "center",
      },
      768: {
        itemsToShow: 2,
        snapAlign: "center",
      },
      // 1024 and up
      1024: {
        itemsToShow: 5,
        snapAlign: "start",
      },
    },
  }),
});
</script>

<style>
.vinhdanh {
  border: 4px solid white;
  width: 240px;
  height: 240px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin: auto;
}

.carousel__slide {
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  color: white;
  border: 1px solid white;
  border-radius: 50%;
}
.gachchan2 {
  position: absolute;
  top: 50px;
  left: 44%;
}

@media screen and (max-width: 576px) {
  .carousel__prev {
    position: absolute;
    left: 37%;
    top: 100%;
  }
  .carousel__next {
    position: absolute;
    right: 37%;
    top: 100%;
  }
  .gachchan2 {
    position: absolute;
    top: 110px;
    left: 23%;
  }
}

@media screen and (min-width: 576px) and (max-width: 835px) {
  .carousel__prev {
    position: absolute;
    left: 43%;
    top: 100%;
  }
  .carousel__next {
    position: absolute;
    right: 43%;
    top: 100%;
  }
  .gachchan2 {
    position: absolute;
    top: 50px;
    left: 38%;
  }
}

@media screen and (min-width: 1080px) {
  .carousel__prev {
    position: absolute;
    left: 47%;
    top: 100%;
  }
  .carousel__next {
    position: absolute;
    right: 46%;
    top: 100%;
  }
}

.underline {
  border-bottom: 1px solid white;
  padding-bottom: 10px;
}
</style>
