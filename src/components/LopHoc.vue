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
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, inject } from "vue";
import { useUser } from "../store/use-user";

export default defineComponent({
  setup() {
    const swal = inject("$swal");
    const store = useUser();
    const { useID, userEmail, screptionID } = store;
    console.log("Setup" + userEmail);
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
        key: "infomationCode",
      },
      {
        title: "TÊN LỚP HỌC",
        dataIndex: "infomationName",
        key: "infomationName",
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
        title: "NGÀY KHAI GIẢNG",
        dataIndex: "infomationStartdate",
        key: "infomationStartdate",
        width: 150,
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
    const id = ref("");
    const action = ref("");
    const status = ref(true);

    const loadData = () => {
      axios({
        method: "post",
        url: "http://10.16.100.33:7150/api/ClassInfo/GetallHome",
        headers: {},
        data: {
          userEmail: userEmail,
          useID: useID,
          screptionID: screptionID,
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

    const dangky = (id, index) => {
      id = id;
      axios({
        method: "post",
        url: "http://10.16.100.33:7150/api/ClassInfo/dangkyhoc",
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
        })
        .catch((error) => {
          console.log(error);
        });
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
    left: 23%;
  }
}

@media only screen and (min-width: 576px) and (max-width: 835px) {
  .gachchan {
    left: 38%;
  }
}
</style>
