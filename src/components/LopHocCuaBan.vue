<template>
  <div class="container">
    <div class="row p-5">
      <div class="col-12 text-center" style="position: relative">
        <h1 style="color: #a10707; font-weight: bold;" class="thongdiep">LỚP HỌC CỦA BẠN</h1>
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
          :pagination="{ pageSize: 50 }"
          :scroll="{ x: 1200, y: 600 }"
        >
          <template #bodyCell="{ index, column, record }">
            <template v-if="column.key === 'stt'">
              {{ index + 1 }}
            </template>
            <template v-if="column.key === 'diemdanh1'">
              <a-checkbox
                v-if="record.diemdanh1 == 'False'"
                disabled
              ></a-checkbox>
              <a-checkbox v-else checked></a-checkbox>
            </template>

            <template v-if="column.key === 'diemdanh2'">
              <a-checkbox
                v-if="record.diemdanh2 == 'False'"
                disabled
              ></a-checkbox>
              <a-checkbox v-else checked></a-checkbox>
            </template>

            <template v-if="column.key === 'nghicophep'">
              <a-checkbox
                v-if="record.nghicophep == 'False'"
                disabled
              ></a-checkbox>
              <a-checkbox v-else checked></a-checkbox>
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
    width: 60,
    dataIndex: "stt",
    key: "stt",
    fixed: true,
  },
  {
    title: "TÊN LỚP HỌC",
    dataIndex: "infomationName",
    key: "infomationName",
    width: 150,
    fixed: true,
  },
  {
    title: "MÃ LỚP HỌC",
    width: 100,
    dataIndex: "infomationCode",
    key: "infomationCode",
  },
  {
    title: "NGÀY KHAI GIẢNG",
    dataIndex: "infomationStartdate",
    key: "infomationStartdate",
    width: 120,
  },
  {
    title: "ĐIỂM SỐ",
    dataIndex: "pointIndex",
    key: "pointIndex",
    width: 90,
  },
  {
    title: "KẾT QUẢ",
    dataIndex: "ketqua",
    key: "ketqua",
    width: 100,
  },
  {
    title: "GIẢNG VIÊN",
    dataIndex: "infomationLeader",
    key: "infomationLeader",
    width: 150,
  },
  {
    title: "ĐĂNG KÝ",
    dataIndex: "register",
    key: "register",
    width: 120,
  },
  {
    title: "ĐIỂM DANH LẦN 1",
    dataIndex: "diemdanh1",
    key: "diemdanh1",
    width: 120,
    align: "center",
  },
  {
    title: "ĐIỂM DANH LẦN 2",
    dataIndex: "diemdanh2",
    key: "diemdanh2",
    width: 120,
    align: "center",
  },
  {
    title: "NGHỈ CÓ PHÉP",
    dataIndex: "nghicophep",
    key: "nghicophep",
    width: 120,
    align: "center",
  },
  {
    title: "LÝ DO NGHỈ PHÉP",
    dataIndex: "lydonghiphep",
    key: "lydonghiphep",
    width: 120,
  },
  {
    title: "LÝ DO CỘNG ĐIỂM",
    dataIndex: "lydocongdiem",
    key: "lydocongdiem",
    width: 120,
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
        url: "https://daotao.alphanam.com:7150/api/ClassInfo/dangkyhoc",
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
        url: "https://daotao.alphanam.com:7150/api/YourClass/GetYourClass",
        headers: {},
        data: {
          userEmail: this.userEmail,
          useID: this.useID,
          screptionID: this.screptionID,
        },
      })
        .then((response) => {
          this.data = response.data;
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
  top: 50px;
  left: 44%;
}

@media only screen and (max-width: 576px) {
  .gachchan {
    top: 38px;
    left: 23%;
  }
  .thongdiep {
    font-size: 26px;
  }
}

@media only screen and (min-width: 576px) and (max-width: 835px) {
  .gachchan {
    top: 50px;
    left: 38%;
  }
}
</style>
