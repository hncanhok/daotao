<template>
  <div class="container pt-5 pb-5">
    <div class="row">
      <div
        v-for="chuongtrinh in data"
        :key="chuongtrinh.id"
        class="col-12 col-sm-6 p-4"
      >
        <div style="position: relative">
          <div
            class="vinhdanh"
            :style="{ backgroundImage: 'url(' + chuongtrinh.imgHienthi + ')' }"
          ></div>
          <div class="title">
            <h3 class="text-white">{{ chuongtrinh.title.toUpperCase() }}</h3>
          </div>
        </div>
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
          "http://10.16.100.33:7150/api/NewPaper/GetNewsCustomerSize?title=chuongtrinhdaotao&pages=1&Pagesize=4"
        )
        .then((response) => {
          this.data = response.data;          
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
.vinhdanh {
  width: 100%;
  height: 390px;
  background-size: cover;
  background-repeat: no-repeat;
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
