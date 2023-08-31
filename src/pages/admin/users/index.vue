<template>
  <!-- <div v-html="data">
       
    </div> -->
  <a-card title="Tài khoản" style="width: 100%">
    <div class="row mb-3">
      <div class="col-12 text-end">
        <a-button type="primary">
          <router-link :to="{ name: 'admin-users-create'}">
            <i class="fa-solid fa-plus"></i>
          </router-link>
        </a-button>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <a-table :dataSource="dataSource" :columns="columns" :scroll="{ x: 576 }">
          <template #bodyCell="{ column, index, record }">
            <template v-if="column.key === 'index'">
              <a>
                {{ index + 1 }}
              </a>
            </template>

            <template v-if="column.key === 'age'">
              <span v-if="record.age < 30" class="text-primary">{{ record.age }}</span>
              <span v-else-if="record.age > 30" class="text-danger">{{ record.age }}</span>
            </template>
           
          </template>
        </a-table>
      </div>
    </div>
  </a-card>
  <!--  <a-list bordered style="width: 100%">
          <a-table :dataSource="dataSource" :columns="columns" />
          <template #header>
            <div>DANH SÁCH</div>
          </template>
        </a-list> -->
</template>
<script>
import { defineComponent, ref } from "vue";
import { useMenu } from "../../../store/use-user";
export default defineComponent({
  setup() {
    useMenu().onSelectedKeys(["admin-users"]);
    const dataSource = [
      {
        key: "1",
        name: "Mike",
        age: 29,
        address: "10 Downing Street",
      },
      {
        key: "2",
        name: "John",
        age: 42,
        address: "10 Downing Street",
      },
      {
        key: "1",
        name: "Mike",
        age: 29,
        address: "10 Downing Street",
      },
      {
        key: "2",
        name: "John",
        age: 42,
        address: "10 Downing Street",
      },
      {
        key: "1",
        name: "Mike",
        age: 29,
        address: "10 Downing Street",
      },
      {
        key: "2",
        name: "John",
        age: 42,
        address: "10 Downing Street",
      },
      {
        key: "1",
        name: "Mike",
        age: 29,
        address: "10 Downing Street",
      },
      {
        key: "2",
        name: "John",
        age: 42,
        address: "10 Downing Street",
      },{
        key: "1",
        name: "Mike",
        age: 29,
        address: "10 Downing Street",
      },
      {
        key: "2",
        name: "John",
        age: 42,
        address: "10 Downing Street",
      },{
        key: "1",
        name: "Mike",
        age: 29,
        address: "10 Downing Street",
      },
      {
        key: "2",
        name: "John",
        age: 42,
        address: "10 Downing Street",
      },
    ];
    const columns = [
    {
        title: "#",
        dataIndex: "index",
        key: "index",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        fixed: 'right',
        responsive: ['sm'],
      },
    ];
    const data = ref(null);
    const login = () => {
      /* axios({
            method: 'get',
            url: "http://localhost:5173/api/NewPaper/GetNewsbyID",           
            data: {
                id: 6110
            }
            }) */
      axios
        .get("http://10.16.100.33:7150/api/NewPaper/GetNewsbyID", {
          params: {
            id: 5098,
          },
        })
        .then((response) => {
          data.value = response.data.newPageContent;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    login();
    return {
      dataSource,
      columns,
      data,
    };
  },
});
</script>
