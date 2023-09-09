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
          :scroll="{ x: 1200, y: 350 }"
        >
          <template #bodyCell="{ column }">
            <template v-if="column.key === 'operation'">
              <a>ĐĂNG KÝ</a>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
const columns = [
  {
    title: "STT",
    width: 50,
    dataIndex: "name",
    key: "name",   
  },
  {
    title: "MÃ LỚP HỌC",
    width: 100,
    dataIndex: "age",
    key: "age",   
  },
  {
    title: "TÊN LỚP HỌC",
    dataIndex: "address",
    key: "1",
    width: 150,   
  },
  {
    title: "TRẠNG THÁI",
    dataIndex: "address",
    key: "2",
    width: 150,
  },
  {
    title: "ĐỊA ĐIỂM TỔ CHỨC",
    dataIndex: "address",
    key: "3",
    width: 150,
  },
  {
    title: "NGÀY KHAI GIẢNG",
    dataIndex: "address",
    key: "4",
    width: 150,
  },
  {
    title: "GIẢNG VIÊN",
    dataIndex: "address",
    key: "5",
    width: 150,
  }, 
  {
    title: "ĐĂNG KÝ",
    key: "operation",
    fixed: "right",
    width: 100,
  },
];
const data = [];
for (let i = 0; i < 26; i++) {
  data.push({
    key: i,
    name: `${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
export default defineComponent({
  data() {
    return {
      data,
      columns,
    };
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
