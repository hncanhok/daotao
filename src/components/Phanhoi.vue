<template>
  <div class="container-fluid pb-5" style="background-color: white">
    <div class="container pb-5">
      <div class="row p-5">
        <div class="col-12 text-center" style="position: relative">
          <h1 style="color: #b80000">PHẢN HỒI CỦA HỌC VIÊN</h1>
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
            :autoplay="2000"
            v-bind="settings"
            :breakpoints="breakpoints"           
          >
            <Slide v-for="slide in 10" :key="slide">
              <div class="carousel__item">
                <div class="phanhoi">
                  <a class="facebook" href="https://www.facebook.com/"></a>
                </div>

                <h3 class="pt-4" style="color: #b80000">
                  MS. NGUYỄN NGỌC HUYỀN
                </h3>
                <p>Chuyên viên Chất lượng</p>
                <p
                  class="p-4 rounded m-lg-4"
                  style="
                    background-color: #9b1a1e;
                    color: white;
                    line-height: 1.6;
                  "
                >
                  Các lớp đào tạo rất bổ ích, mang lại nhiều kiến thức mới cho
                  CBNV nâng cao kỹ năng mềm, các kỹ năng cơ bản để áp dụng vào
                  thực tế một cách hiệu quả. Giảng viên có chuyên môn và cách
                  truyền đạt dễ hiểu, thu hút giúp CBNV tham gia lớp học cảm
                  thấy vui vẻ và tinh thần tích cực
                </p>
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
  data: () => ({
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

<style>
.phanhoi {
  height: 250px;
  width: 250px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
 
  
}
.facebook {
  display: inline-block;
  width: 100%;
  height: 100%;
  background: url(https://alphanamec.com.vn/images/banner/1alphaname&c.jpg);
  background-position: 50% 50%;
  background-size: cover;
  border-radius: 50%;
  
}

.carousel__slide {
  padding: 10px;
}


@media screen and (max-width: 576px) {
    .phanhoi { margin-left: 2rem;}
}
@media screen and (min-width: 576px) and (max-width: 820px) {
    .phanhoi { margin-left: 2rem;}
}
@media screen and (min-width: 1080px) {
    .phanhoi { margin-left: 5rem;}
}
</style>
