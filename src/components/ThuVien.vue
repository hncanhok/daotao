<template>
  <div class="container pt-5 pb-5">
    <div class="row">
      <div
        class="col-12 col-md-6 col-lg-6 p-4 text-center"
        v-for="course in courses"
        :key="course.id"
      >
        <div>
          <div class="thuvien">
            <div
              class="hinhanh"
              :style="{ backgroundImage: 'url(' + course.imgHienthi + ')' }"
            ></div>
          </div>

          <div
            class="d-flex align-items-center justify-content-center text-center pt-2"
            style="
              background-color: #a10707;
              color: white;
              height: 80px;
              line-height: 1.4;
            "
          >
            <h2 style="font-weight: bold">{{ course.title.toUpperCase() }}</h2>
          </div>
          <a-button
            class="mt-4"
            shape="round"
            style="color: #b80000; border: 1px solid #b80000"
          >
            <span style="font-weight: bold">Xem chi tiết</span>

            <i class="fa-solid fa-angles-right fa-2xs ms-1"></i>
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    let courses = ref([]);
    const khoahocgoiy = () => {
      axios({
        method: "get",
        url: "http://10.16.100.33:7150/api/NewPaper/GetNewsCustomerSize?title=khoahocgoiy&pages=1&Pagesize=6",
      })
        .then((response) => {
          courses.value = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    khoahocgoiy();

    return { courses };
  },
};
</script>

<style scoped>
.gachchan {
  position: absolute;
  top: 50px;
  left: 44%;
}

.hinhanh {
  width: 100%;
  height: 390px;
  background-repeat: no-repeat;
  background-size: cover;
  transition: 1s;
}
.hinhanh:hover {
  transform: scale(1.05);
}

.thuvien {  
  overflow: hidden;
  width: 100%;
}

@media only screen and (max-width: 576px) {
  .gachchan {
    top: 50px;
    left: 23%;
  }
}

@media only screen and (min-width: 576px) and (max-width: 835px) {
  .gachchan {
    top: 50px;
    left: 38%;
  }
}
</style>
