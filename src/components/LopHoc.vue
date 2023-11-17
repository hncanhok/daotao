<template>
  <div class="container">
    <div class="row pt-5">
      <div class="col-12">
        <h3 style="color: #a10707; font-weight: bold" class="pb-4">
          TRANG CHỦ > {{ content.catagoryName }}
        </h3>
        <h3 style="font-weight: bold">{{ content.catagoryDesciption }}</h3>
        <p v-html="content.catagoryContent"></p>
      </div>
    </div>
    <div class="row pb-5">
      <div class="col-12 text-center" style="position: relative">
        <h1 class="khoahoc" style="color: #a10707; font-weight: bold">KHÓA HỌC ĐANG DIỄN RA</h1>
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
        <a-table
          :pagination="{ pageSize: 50 }"
          :columns="columns"
          :data-source="data"
          :scroll="{ x: 1200, y: 600 }"
        >
          <template #bodyCell="{ column, index, record }">
            <template v-if="column.key === 'stt'">
              {{ index + 1 }}
            </template>
            <template
              v-if="
                column.key === 'operation' &&
                record.register.split('/')[2] == 'PC'
              "
            >
              <a-button
                @click="dangky(record.id, index)"
                shape="round"
                :size="size"
                style="color: #a10707; font-weight: bold; border-color: #a10707"
              >
                {{ record.dangky.toUpperCase() }}
              </a-button>
            </template>
            <template v-if="column.key === 'infomationStartdate'">
              {{ onFormatDate(record.infomationStartdate) }}
            </template>
          </template>
        </a-table>
      </div>
    </div>

    <div class="row pb-5">
      <div class="col-12 text-center" style="position: relative">
        <h1 style="color: #a10707; font-weight: bold" class="khoahoc">KHÓA HỌC ĐÃ ĐĂNG KÝ</h1>
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
        <a-table
          :pagination="{ pageSize: 50 }"
          :columns="columns"
          :data-source="data2"
          :scroll="{ x: 1200, y: 600 }"
        >
          <template #bodyCell="{ column, index, record }">
            <template v-if="column.key === 'stt'">
              {{ index + 1 }}
            </template>
            <template
              v-if="
                column.key === 'operation' &&
                record.register.split('/')[2] == 'PC'
              "
            >
              <a-button
                @click="dangky(record.id, index)"
                shape="round"
                :size="size"
                style="color: #a10707; font-weight: bold; border-color: #a10707"
              >
                {{ record.dangky.toUpperCase() }}
              </a-button>
            </template>
            <template v-if="column.key === 'infomationStartdate'">
              {{ onFormatDate(record.infomationStartdate) }}
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, inject } from "vue";
import { useUser } from "../store/use-user";
import moment from "moment";
import { useRoute } from "vue-router";

export default defineComponent({
  mounted() {
    // window.scrollTo(0, 1500);
  },
  setup() {
    const route = useRoute();
    const swal = inject("$swal");
    const store = useUser();
    const { useID, userEmail, screptionID } = store;
    console.log("Setup" + userEmail);
    const columns = [
      {
        title: "STT",
        width: 60,
        dataIndex: "stt",
        key: "stt",
      },
      {
        title: "TÊN LỚP HỌC",
        dataIndex: "infomationName",
        key: "infomationName",
        width: 150,
      },
      {
        title: "MÃ LỚP HỌC",
        width: 120,
        dataIndex: "infomationCode",
        key: "infomationCode",
      },
      {
        title: "NGÀY KHAI GIẢNG",
        dataIndex: "infomationStartdate",
        key: "infomationStartdate",
        width: 150,
      },
      
      {
        title: "TRẠNG THÁI",
        dataIndex: "trangThai",
        key: "trangThai",
        width: 150,
      },
      {
        title: "ĐỊA ĐIỂM TỔ CHỨC",
        dataIndex: "infomationContent",
        key: "infomationContent",
        width: 150,
      },

      {
        title: "LOẠI LỚP",
        dataIndex: "loaiLop",
        key: "loaiLop",
        width: 120,
      },
      
      {
        title: "GIẢNG VIÊN",
        dataIndex: "infomationLeader",
        key: "infomationLeader",
        width: 150,
      },
      {
        title: "ĐĂNG KÝ",
        key: "operation",
        fixed: "right",
        width: 150,
      },
    ];

    let data = ref([]);
    let data2 = ref([]);
    let content = ref([]);
    const id = ref("");
    const action = ref("");
    const status = ref(true);

    const loadData = () => {
      axios({
        method: "post",
        url: "https://daotao.alphanam.com:7150/api/ClassInfo/GetallDangky",
        headers: {},
        data: {
          userEmail: userEmail,
          useID: useID,
          screptionID: screptionID,
          categoryId: route.params.urldetail,
        },
      })
        .then((response) => {
          data.value = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    loadData();

    const loadData2 = () => {
      axios({
        method: "post",
        url: "https://daotao.alphanam.com:7150/api/ClassInfo/GetallHuyDangky",
        headers: {},
        data: {
          userEmail: userEmail,
          useID: useID,
          screptionID: screptionID,
          categoryId: route.params.urldetail,
        },
      })
        .then((response) => {
          data2.value = response.data;
          console.log(data2.value);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    loadData2();

    const getContent = () => {
      axios({
        method: "post",
        url: "https://daotao.alphanam.com:7150/api/ClassInfo/GetClassCategorybyID",
        headers: {},
        data: {
          userEmail: userEmail,
          useID: useID,
          screptionID: screptionID,
          categoryId: route.params.urldetail,
        },
      })
        .then((response) => {
          content.value = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getContent();

    const dangky = (id, index) => {
      id = id;
      axios({
        method: "post",
        url: "https://daotao.alphanam.com:7150/api/ClassInfo/dangkyhoc",
        headers: {},
        data: {
          userEmail: userEmail,
          useID: useID,
          screptionID: screptionID,
          ClassID: id,
        },
      })
        .then((response) => {
          if (response.data.register.split("/")[1] == "null") {
            swal.fire({
              icon: "error",
              title: response.data.notification,
              showConfirmButton: true,
            });
          } else {
            swal.fire({
              icon: "success",
              title: response.data.notification,
              showConfirmButton: true,
            });
          }

          loadData();
          loadData2();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const onFormatDate = (value) => {
      return moment(String(value)).format("h:mm, DD/MM/YYYY");
    };
    return {
      data,
      columns,
      useID,
      userEmail,
      screptionID,
      id,
      action,
      dangky,
      onFormatDate,
      content,
      data2
    };
  },
});
</script>

<style scoped>
.gachchan {
  position: absolute;
  top: 50px;
  left: 44%;
}

@media only screen and (max-width: 576px) {
  .gachchan {
    top: 35px;
    left: 30%;
  }
  .khoahoc {
    font-size: 24px;
  }
}

@media only screen and (min-width: 576px) and (max-width: 835px) {
  .gachchan {
    top: 50px;
    left: 38%;
  }
}
</style>
