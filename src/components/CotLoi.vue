<template>
  <div class="container mb-5 pb-5">
    <div class="row p-5">
      <div class="col-12 text-center" style="position: relative">
        <h1 style="color: #a10707; font-weight: bold">GIÁ TRỊ CỐT LÕI</h1>
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
      <div class="col-12 col-sm-4">
        <div
          class="khunganh nhanluc"
          @mouseover="nhanluc = true"
          @mouseout="nhanluc = false"
        >
          <div class="text">
            <h1 class="title">NHÂN LỰC</h1>
            <p :class="nhanluc ? 'show' : 'hide'">
              Nhân lực là tài sản quý nhất, là sức mạnh của Alphanam Group; đoàn
              kết và cống hiến là giá trị nhân bản của chúng tôi.
            </p>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-4">
        <div
          class="khunganh sanpham"
          @mouseover="sanpham = true"
          @mouseout="sanpham = false"
        >
          <div class="text">
            <h1 class="title">SẢN PHẨM</h1>
            <p :class="sanpham ? 'show' : 'hide'">
              Alphanam Group quyết tâm đem đến cho khách hàng những sản phẩm tốt
              nhất với giá cạnh tranh nhất.
            </p>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-4">
        <div
          class="khunganh loinhuan"
          @mouseover="loinhuan = true"
          @mouseout="loinhuan = false"
        >
          <div class="text">
            <h1 class="title">LỢI NHUẬN</h1>
            <p :class="loinhuan ? 'show' : 'hide'">
              Lợi nhuận là thước đo sự hoàn hảo đối với sản phẩm, là sự đánh giá
              của khách hàng cho những nỗ lực của Alphanam Group.
            </p>
          </div>
        </div>
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
      nhanluc: false,
      sanpham: false,
      loinhuan: false
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
            id: this.urldetail,
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
};
</script>

<style scoped>
.gachchan {
  position: absolute;
  top: 50px;
  left: 44%;
}

.nhanluc {
  background-image: url("https://daotao.alphanam.com/images/nhan-luc.png");
}

.sanpham {
  background-image: url("https://daotao.alphanam.com/images/san-pham.png");
}

.loinhuan {
  background-image: url("https://daotao.alphanam.com/images/loi-nhuan.png");
}
.khunganh {
  background-repeat: no-repeat;
  background-size: cover;
  width: 96%;
  height: 550px;
  background-position: center;
  border-radius: 25px;
  position: relative;
  
}

.khunganh:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(
      0deg,
      rgba(218, 33, 40, 1) 0%,
      rgba(0, 0, 0, 0) 80%
    )
    no-repeat calc(200% - var(--p, 0%)) 100% / 200% var(--p, 0.08em);
  transition: 0.1s var(--t, 0s),
    background-position 0.1s calc(0.1s - var(--t, 0s));
}

.khunganh:hover:before {
  --p: 100%;
  --t: 0.1s;
  color: #fff;
}

.show {
  display: block;
  animation-name: leftToRight;
  animation-duration: 0.1s;
  position: relative;
}
.hide {
  display: none;
}

@keyframes leftToRight {
  0% {
    left: -40px;
  }

  25% {
    left: -30px;
  }

  50% {
    left: -20px;
  }

  75% {
    left: -10px;
  }

  100% {
    left: 0px;
  }
}

.text {
  position: absolute;
  top: 350px;
  left: 0;
  color: white;
  padding: 0 40px;
  z-index: 3;
}

h1 {
  font-weight: bold;
}

@media only screen and (max-width: 576px) {
  .gachchan {
    top: 50px;
    left: 23%;
  }

  .khunganh {
    height: 250px;
    margin-bottom: 10px;
  }

  .title {
    font-size: 22px;
  }

  .text {
    top: 30px;
    left: 0;   
    padding: 0 10px;
  }
}

@media only screen and (min-width: 576px) and (max-width: 835px) {
  .gachchan {
    top: 50px;
    left: 38%;
  }

  .khunganh {
    height: 250px;
  }

  .title {
    font-size: 22px;
  }

  .text {
    top: 30px;
    left: 0;   
    padding: 0 5px;
  }
}
</style>
