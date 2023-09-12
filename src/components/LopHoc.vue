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
      <div class="col">
        <a-table
          :columns="columns"
          :data-source="data"
          :scroll="{ x: 1200, y: 600 }"
        >
          <template #bodyCell="{ column, index, record }">
            <template
              v-if="column.key === 'operation' && record.register == 'PC'"
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
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useUser } from "../store/use-user";

const store = useUser();
const { useID, userEmail, screptionID } = store;
const columns = [
  {
    title: "STT",
    width: 50,
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "MÃ LỚP HỌC",
    width: 100,
    dataIndex: "infomationCode",
    key: "age",
  },
  {
    title: "TÊN LỚP HỌC",
    dataIndex: "infomationName",
    key: "1",
    width: 150,
  },
  {
    title: "TRẠNG THÁI",
    dataIndex: "trangThai",
    key: "2",
    width: 150,
  },
  {
    title: "ĐỊA ĐIỂM TỔ CHỨC",
    dataIndex: "infomationContent",
    key: "3",
    width: 150,
  },
  {
    title: "NGÀY KHAI GIẢNG",
    dataIndex: "infomationStartdate",
    key: "4",
    width: 150,
  },
  {
    title: "GIẢNG VIÊN",
    dataIndex: "infomationLeader",
    key: "5",
    width: 150,
  },
  {
    title: "ĐĂNG KÝ",
    key: "operation",
    fixed: "right",
    width: 150,
  },
];
const data = [];
const id = "";
const action = "";
const status = true;

export default defineComponent({
  data() {
    return {
      data,
      columns,
      useID,
      userEmail,
      screptionID,
      id,
      action,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    showAlert() {
      // Use sweetalert2
      this.$swal("Hello Vue world!!!");
    },
    dangky(id, index) {
      this.id = id;
      axios({
        method: "post",
        url: "http://10.16.100.33:7150/api/ClassInfo/dangkyhoc",
        headers: {},
        data: {
          userEmail: this.userEmail,
          useID: this.useID,
          screptionID: this.screptionID,
          ClassID: id,
        },
      })
        .then((response) => {
          if (response.data.register.split("/")[1] == "null") {
            this.$swal.fire({
              icon: "error",
              title: response.data.notification,
              showConfirmButton: true,
            });
          } else {
            this.$swal.fire({
              icon: "success",
              title: response.data.notification,
              showConfirmButton: true,
            });
          }

          this.loadData();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadData() {
      axios({
        method: "post",
        url: "http://10.16.100.33:7150/api/ClassInfo/GetallHome",
        headers: {},
        data: {
          userEmail: this.userEmail,
          useID: this.useID,
          screptionID: this.screptionID,
        },
      })
        .then((response) => {
          this.data = [];
          for (let i = 0; i < response.data.length; i++) {
            this.data.push({
              stt: i + 1,
              id: response.data[i].id,
              infomationCode: response.data[i].infomationCode,
              infomationName: response.data[i].infomationName,
              trangThai: response.data[i].trangThai,
              infomationContent: response.data[i].infomationContent,
              infomationStartdate: response.data[i].infomationStartdate,
              infomationLeader: response.data[i].infomationLeader,
              dangky: response.data[i].dangky,
              register: response.data[i].register.split("/")[2],
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
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
