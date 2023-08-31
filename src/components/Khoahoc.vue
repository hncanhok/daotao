<template>
  <div class="container">
    <div class="row p-5">
      <div class="col-12 text-center" style="position: relative">
        <h1 style="color: #a10707">KHÓA HỌC GỢI Ý</h1>
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
      <div
        class="col-12 col-md-6 col-lg-4 p-0"
        v-for="course in courses"
        :key="course.id"
      >
        <div style="border: 4px solid #a10707; margin: 0 25px 25px 25px">
          <img src="../assets/images/meeting.jpg" alt="" />

          <div
            class="d-flex align-items-center justify-content-center text-center pt-2"
            style="
              background-color: #a10707;
              color: white;
              height: 80px;
              line-height: 1.4;
            "
          >
            <h3>{{ course.catagoryName.toUpperCase() }}</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="row p-5">
      <div class="col text-center">
        <a-button type="primary" shape="round" size="large" style="padding: 6px 60px 0 60px">         
          <h4 style="color: #ffe760">XEM TẤT CẢ</h4>
        </a-button>
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
        method: "post",
        url: "http://10.16.100.33:7150/api/ClassInfo/GetallHome",
        data: {
          userEmail: "hanhnl@alphanam.com",
          UserID: "319",
          ScreptionID: "907c2d777a12b35a0eba85a41a1fd14d",
        },
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
  top: 40px;
  left: 44%;
}

@media only screen and (max-width: 576px) {
  .gachchan {
    left: 23%;
  }
}

@media only screen and (min-width: 576px) and (max-width: 820px) {
  .gachchan {
    left: 38%;
  }
}
</style>
