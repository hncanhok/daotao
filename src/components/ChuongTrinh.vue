<template>
  <div class="container pt-5 pb-5">
    <div class="row">
      <div
        v-for="chuongtrinh in data"
        :key="chuongtrinh.id"
        class="col-12 col-sm-6 p-4"
      >
        <router-link
          style="text-decoration: none; color: inherit"
          :to="{
            name: 'DetailPage',
            params: {
              // title: tieudiem.urlFriendLink,
              urldetail: chuongtrinh.id,
            },
          }"
        >
          <div style="position: relative">
            <div class="chuongtrinh">
              <div
              class="hinhanh"
              :style="{
                backgroundImage: 'url(' + chuongtrinh.imgHienthi + ')',
              }"
            ></div>
            </div>
            
            <div class="title">
              <h3 class="text-white">{{ chuongtrinh.title.toUpperCase() }}</h3>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      axios
        .get(
          "https://daotao.alphanam.com:7150/api/NewPaper/GetNewsCustomerSize?title=chuongtrinhdaotao&pages=0&Pagesize=4"
        )
        .then((response) => {
          this.data = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.title {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border: 1px solid white;
  width: max-content;
  padding: 20px 40px 10px 40px;
  background: rgba(161, 7, 7, 0.5);
}
.chuongtrinh {
  overflow: hidden;
  width: 100%;
}
.hinhanh {
  width: 100%;
  height: 390px;
  background-size: cover;
  background-repeat: no-repeat;
  transition: 1s;
}
.hinhanh:hover {
  transform: scale(1.05);
}

@media screen and (max-width: 576px) {
  .title {
    font-size: 12px;
    padding: 20px 20px 10px 20px;
  }
}
@media screen and (min-width: 576px) and (max-width: 835px) {
  .title {
    font-size: 12px;
    padding: 20px 20px 10px 20px;
  }
}
</style>
