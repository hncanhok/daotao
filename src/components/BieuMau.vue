<template>
  <div class="container-fluid pb-5" style="background-color: #ffffff">
    <div class="container pb-5">
      <div class="row p-5">
        <div class="col-12 text-center" style="position: relative">
          <h1 style="color: #b80000; font-weight: bold">BIỂU MẪU</h1>
          <div class="gachchan">
            <img
              src="../assets/logo/Icon-Web-dao-tao-02.png"
              alt="khoa hoc goi y"
              width="150"
            />
          </div>
        </div>
      </div>
      <div class="row mb-5">
        <div class="col">
          <a-table
            :pagination="{ pageSize: 50, hideOnSinglePage: true }"
            :columns="columns"
            :data-source="data"
            :scroll="{ x: 1200, y: 600 }"
            :locale="{ emptyText: 'KHÔNG CÓ BIỂU MẪU' }"
            size="middle"
            style="font-size: 24px;"
          >
            <template #bodyCell="{ column, index, record }">
              <template v-if="column.key === 'stt'">
                <span style="font-size: 24px;">{{ index + 1 }}</span>
              </template>
              <template v-if="column.key === 'title'">
                <a :href="record.taiLieuURL" download style="text-decoration: none; color: inherit">
                  <span style="font-weight: bold;font-size: 24px;" @click="onClickTitle()">
                    <i class="fa-solid fa-download pe-2 text-danger fa-xs"></i>{{ record.title }}
                  </span>
                </a>                                 
              </template>
              <template v-if="column.key === 'newPageDescription'">
                <span style="font-size: 24px;">{{ record.newPageDescription }}</span>
              </template>
            </template>
          </a-table>
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
      columns: [
        {
          title: "STT",
          width: 60,
          dataIndex: "stt",
          key: "stt",
        },
        {
          title: "TÊN BIỂU MẪU",         
          dataIndex: "title",
          key: "title",
          width: 400,
        },
        {
          title: "NỘI DUNG",         
          dataIndex: "newPageDescription",
          key: "newPageDescription",
        },
      ],
      current: 1,
      pageSize: 100,
      pageSizeOptions: ["6", "12", "18", "24"],
      total: 0,
      title: "",
    };
  },
  watch: {
    current() {
      window.scrollTo(0, 800);
      this.loadData();
    },
    pageSize() {
      this.loadData();
    },
  },
  mounted() {
    this.loadData();
  },
  methods: {
    onClickTitle() {},
    loadData() {
      console.log("TINTUC " + this.$route.params.id);
      this.title = "danhmucbieumau";

      axios
        .get(
          "https://daotao.alphanam.com:7150/api/NewPaper/GetNewsCustomerSize",
          {
            params: {
              title: this.title,
              pages: this.current,
              pagesize: this.pageSize,
            },
          }
        )
        .then((response) => {
          this.data = response.data;
          this.total = this.data[0].totalPage;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.anhtieudiem {
  width: 100%;
  height: 230px;
  background-repeat: no-repeat;
  background-size: cover;
  transition: 1s;
}
.gachchan {
  position: absolute;
  top: 50px;
  left: 44%;
}

.anhtieudiem:hover {
  transform: scale(1.05);
}
.tieudiem {
  overflow: hidden;
}

@media screen and (max-width: 576px) {
  /* .phanhoi {
        margin-left: 2rem;
      } */
  .gachchan {
    top: 50px;
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
  .tieudiem {
    margin: 0 0 0 20px;
  }
}
</style>
