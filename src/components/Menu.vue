<template>
  <div
    class="container-fluid d-none d-lg-block"
    style="background-color: #a10707"
  >
    <div class="container">
      <ul class="ps-0">
        <li v-for="menu in menucha" :key="menu.id" style="position: relative">
          <span v-if="menu.menuParent == 0">
            <div
              class="d-inline-block"
              @mouseover="
                [(menucap2 = loadBoxMenu(menu.id)), (action = menu.id)]
              "
            >            
              <router-link                
                style="text-decoration: none; color: inherit"
                :to="{
                      name: 'Page',
                      params: {
                        title: menu.urlFriendLink,
                        id: menu.id,
                        urldetail: menu.urlDetail,
                      },
                    }"
                >{{ menu.menuName.toUpperCase() }}</router-link
              >
            </div>
          </span>
          <div class="vitribox" @mouseleave="action = -1">
            <div
              v-for="(m2, index) in menucap2"
              :key="m2.id"
              v-show="action == menu.id"
            >
              <div class="box">
                <div
                  class="menucap2"
                  :class="{ gachchan: index < menucap2.length - 1 }"
                >
                  <i class="fa-solid fa-caret-right me-2"></i>
                  <router-link
                    style="text-decoration: none; color: inherit"
                    :to="{
                      name: 'Page',
                      params: {
                        title: m2.urlFriendLink,
                        id: m2.id,
                        urldetail: m2.urlDetail,
                      },
                    }"
                    >{{ m2.menuName }}</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menucha: [],
      menucap2: [],
      action: 1,
    };
  },
  mounted() {
    this.loadMenuCha();
  },
  methods: {
    loadMenuCha() {
      axios
        .get("http://10.16.100.33:7150/api/MenuInfo/GetallMenu")
        .then((response) => {
          this.menucha = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadBoxMenu(id) {
      this.menucap2 = [];
      for (let i = 0; i < this.menucha.length; i++) {
        if (this.menucha[i].menuParent == id) {
          this.menucap2.push(this.menucha[i]);
        }
      }

      return this.menucap2;
    },
  },

  computed: {},
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-top: 20px;
  margin-bottom: 0;
}

li {
  display: inline;
  padding-right: 60px;
  color: white;
}
.fa-caret-right {
  color: #a10707;
}

.vitribox {
  position: absolute;
  top: 38px;
  left: 0;
  z-index: 1;
  background-color: white;
  color: black;
  width: max-content;
  /* clip-path: polygon(0 5%, 8% 5%, 10% 0, 12% 5%, 83% 5%, 100% 5%, 100% 85%, 100% 100%, 85% 100%, 15% 100%, 0 100%, 0% 85%); */
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.menucap2 {
  margin: 10px 0;
  padding: 5px 0;
}

.gachchan {
  border-bottom: 1px solid #bbbbbb;
}
.box {
  padding: 0 35px 0 35px;
}
</style>
