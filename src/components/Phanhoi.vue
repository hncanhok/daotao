<template>
  <div class="container-fluid pb-5" style="background-color: white">
    <div class="container pb-5">
      <div class="row p-5">
        <div class="col-12 text-center" style="position: relative">
          <h1 style="color: #b80000;font-weight: bold;">PHẢN HỒI CỦA HỌC VIÊN</h1>
          <div class="gachchan">
            <img
              src="../assets/logo/Icon-Web-dao-tao-02.png"
              alt="khoa hoc goi y"
              width="150"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <Carousel
            :wrap-around="true"
            :autoplay="2000"
            v-bind="settings"
            :breakpoints="breakpoints"
                  
          >
            <Slide v-for="slide in data" :key="slide.id">
              <div class="carousel__item">
                <div class="phanhoi">
                  <a class="anhphanhoi" :style="{ backgroundImage: 'url(' + slide.imgHienthi + ')' }"></a>
                </div>

                <h3 class="pt-4" style="color: #b80000;font-weight: bold;height: 50px;">
                  {{ slide.newPageDescription.toUpperCase() }}
                </h3>
                <p style="font-weight: 500; height: 50px;">
                  {{ slide.title }}
                </p>
                <p
                  v-html="slide.newPageContent"
                  class="p-4 rounded m-lg-4"
                  style="
                    background-color: #9b1a1e;
                    color: white;
                    line-height: 1.6;
                    height: 180px; 
                  
                  "
                ></p>
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
        url: "https://daotao.alphanam.com:7150/api/NewPaper/GetNewsbyCate?title=phanhoi&pages=1",
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
        itemsToShow: 3,
        snapAlign: "center",
      },
    },
  }),
});
</script>

<style scoped>
.phanhoi {
  height: 250px;
  width: 250px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.anhphanhoi {
  display: inline-block;
  width: 100%;
  height: 100%; 
  background-position: 50% 50%;
  background-size: cover;
  border-radius: 50%;
}

.carousel__slide {
  padding: 10px;
}
.carousel__item {
  
}
.gachchan {
  position: absolute;
  top: 50px;
  left: 44%;
}

@media screen and (max-width: 576px) {
  /* .phanhoi {
    margin-left: 2rem;
  } */
  .gachchan {
    top: 110px;
    left: 23%;
  }
}
@media screen and (min-width: 576px) and (max-width: 835px) {
  /* .phanhoi {
    margin-left: 2rem;
  } */
  .gachchan {
    top: 50px;
    left: 38%;
  }
}
@media screen and (min-width: 1080px) {
  /* .phanhoi {
    margin-left: 5rem;
  } */
}


</style>
