<template>
  <div class="container">
    <div class="row p-5">
      <div class="col-12 text-center" style="position: relative">
        <h1 class="title" style="color: #a10707; font-weight: bold">
          DANH SÁCH BÀI KIỂM TRA CỦA BẠN
        </h1>
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
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <a-button
                v-if="checkTime(record.endChecktime) && record.statustCode != 'ĐÃ XÁC NHẬN'"
                @click="headerSurvey(record.classID, record.numberTest)"
                shape="round"
                :size="size"
                style="color: #faf577; font-weight: bold; background: #a10707"
              >
                LÀM BÀI
              </a-button>
            </template>
            <template v-if="column.key === 'startChecktime'">
              
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
import { useRouter } from "vue-router";

const router = useRouter();
const store = useUser();
const { useID, userEmail, screptionID } = store;
const columns = [
  {
    title: "ID",
    width: 100,
    dataIndex: "classID",
    key: "classID",
    fixed: true,
  },

  {
    title: "MÃ LỚP HỌC",
    dataIndex: "informationCode",
    key: "informationCode",
    width: 150,
  },
  {
    title: "TÊN LỚP HỌC",
    width: 250,
    dataIndex: "informationName",
    key: "informationName",
  },
  {
    title: "GIẢNG VIÊN",
    dataIndex: "informationLeader",
    key: "informationLeader",
    width: 180,
  },
  {
    title: "THỜI GIAN LÀM BÀI",
    dataIndex: "informationDatecount",
    key: "informationDatecount",
    width: 200,
  },
  {
    title: "BẮT ĐẦU",
    dataIndex: "startChecktime",
    key: "startChecktime",
    width: 150,
  },
  {
    title: "KẾT THÚC",
    dataIndex: "endChecktime",
    key: "endChecktime",
    width: 150,
  },
  {
    title: "TRẠNG THÁI",
    dataIndex: "statustCode",
    key: "statustCode",
    width: 200,
  },
  {
    title: "HÀNH ĐỘNG",
    dataIndex: "action",
    key: "action",
    width: 120,
    fixed: "right",
  },
];
const data = [];
const id = "";
const action = "";
const status = 0;
const resposeIdTest = 0;

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
      router,
      resposeIdTest,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    checkTime(endChecktime) {
      const endTime = new Date(endChecktime).getTime();
      const nowTime = new Date().getTime();
      if(endTime <= nowTime) return false;
      return true;
    },
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
        url: "http://10.16.100.33:7150/api/Kiemtra/dskiemtra",
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
    headerSurvey(classID, exambleID) {
      axios({
        method: "post",
        url: "http://10.16.100.33:7150/api/KhaoSat/HeaderSurvey",
        headers: {},
        data: {
          userEmail: this.userEmail,
          useID: this.useID,
          screptionID: this.screptionID,
          classID: classID,
          exambleID: 0,
        },
      })
        .then((response) => {
          if (response.data.resposeId > 0) {
            this.$router.push({
              name: "KhaoSat",
              params: { classID: classID, exambleID: exambleID },
            });
          } else {
            axios({
              method: "post",
              url: "http://10.16.100.33:7150/api/Kiemtra/GetHeadKiemtra",
              headers: {},
              data: {
                userEmail: this.userEmail,
                useID: this.useID,
                screptionID: this.screptionID,
                classID: classID,
                exambleID: exambleID,
              },
            })
              .then((response) => {
                if (response.data.resposeId > 0) {
                  this.$router.push({
                    name: "Test",
                    params: { 
                      classID: classID, 
                      exambleID: exambleID,
                      informationName: response.data.informationName
                     },

                  });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getHeadKiemtra() {
      axios({
        method: "post",
        url: "http://10.16.100.33:7150/api/Kiemtra/GetHeadKiemtra",
        headers: {},
        data: {
          userEmail: this.userEmail,
          useID: this.useID,
          screptionID: this.screptionID,
          classID: 8453,
          exambleID: 2013,
        },
      })
        .then((response) => {
          this.resposeIdTest = response.data.resposeId;
          return this.resposeIdTest;
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
    position: absolute;
    left: 23%;
    top: 65px;
  }
  .title {
    font-size: 20px;
  }
}

@media only screen and (min-width: 576px) and (max-width: 835px) {
  .gachchan {
    position: absolute;
    top: 50px;
    left: 38%;
  }
}
</style>
