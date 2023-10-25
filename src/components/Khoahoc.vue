<template>
  <div class="container">
    <div class="row p-5">
      <div class="col-12 text-center" style="position: relative">
        <h1 style="color: #a10707; font-weight: bold">KHÓA HỌC GỢI Ý</h1>
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
        <router-link
          style="text-decoration: none; color: inherit"
          :to="{
            name: 'Page',
            params: {
              title: 'khoa_hoc_goi_y',
              urldetail: course.id,
              id: id,
            },
          }"
        >
          <div style="margin: 0 25px 45px 25px; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
            <div class="khunganh">
              <div
                class="anhtieudiem"
                :style="{ backgroundImage: 'url(' + course.catagoryImg + ')' }"
              ></div>
            </div>

            <div
              class="d-flex align-items-center justify-content-center text-center pt-2"
              style="               
                height: 80px;
                line-height: 1.4;                
              "
            >
              <h3 style="color: #a10707; font-weight: bold;">{{ course.catagoryName.toUpperCase() }}</h3>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="row p-5">
      <div class="col text-center">
        <router-link
          :to="{
            name: 'KhoaHoc',
            params: {
              id: id,
            },
          }"
        >
          <a-button
            type="primary"
            shape="round"
            size="large"
            style="padding: 6px 60px 0 60px"
          >
            <h4 style="color: #ffe760">XEM TẤT CẢ</h4>
          </a-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useUser } from "../store/use-user";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      id: -1,
    };
  },
  setup() {
    const router = useRouter();
    const { useID, userEmail, screptionID } = useUser();
    let courses = ref([]);

    const khoahocgoiy = () => {
      axios({
        method: "post",
        url: "https://daotao.alphanam.com:7150/api/ClassInfo/GetClassCategory",
        headers: {},
        data: {
          userEmail: userEmail,
          useID: useID,
          screptionID: screptionID,
          page: 1,
          pageSize: 6,
        },
      })
        .then((response) => {
          courses.value = response.data;
        })
        .catch((error) => {
          console.log(error);
          router.push({name: 'NotFound'});
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
.anhtieudiem {
  width: 100%;
  height: 230px;
  background-repeat: no-repeat;
  background-size: cover;
  transition: 1s;
}
.anhtieudiem:hover {
  transform: scale(1.05);
}
.khunganh {
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
