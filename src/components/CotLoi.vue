<template>
    <div class="container">
      <div class="row p-5">
        <div class="col-12 text-center" style="position: relative">
          <h1 class="cotloi" style="color: #a10707; font-weight: bold;">GIÁ TRỊ CỐT LÕI</h1>
          <div class="gachchan">
            <img
              src="../assets/logo/Icon-Web-dao-tao-02.png"
              alt="thong diep"
              width="150"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p v-html="content"></p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    props: ["urldetail"],
    data() {
    return {
      content: "",
    };
  },
  mounted() {
    this.loadContent();
  },
  methods: {
    loadContent() {
      axios
        .get("https://daotao.alphanam.com:7150/api/NewPaper/GetNewsbyID", {
          params: { 
            id: this.urldetail
          },
        })
        .then((response) => {         
          this.content = response.data.newPageContent;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
}
</script>

<style scoped>
.gachchan {
  position: absolute;
  top: 50px;
  left: 44%;
}

@media only screen and (max-width: 576px) {
  .gachchan {
    top: 50px;
    left: 23%;
  }
  .cotloi {
    /* font-size: 16px; */
  }
}

@media only screen and (min-width: 576px) and (max-width: 835px) {
  .gachchan {
    top: 50px;
    left: 38%;
  }
}
</style>