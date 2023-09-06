<template>
  <div class="container-fluid p-1 d-none d-lg-block" style="background-color: #a10707">
    <div class="container">    
      
      <ul>
        <li v-for="menu in menucha" :key="menu.id" style="position: relative;">
          <span @mouseover="menucap2 = loadBoxMenu(2)" v-if="menu.menuParent == 0"> {{ menu.menuName.toUpperCase() }}</span>          
          <div class = "boxmenu"> 
            {{ loadBoxMenu(2) }}
           
<!--                   <div v-if="menucha.menuParent == 2" class="menucap2">
                    <i class="fa-solid fa-caret-right me-2"></i>
                    {{ menucha.menuName }}
                  </div> -->
                  
                                                         
          </div>
        </li>
       
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
export default {
  
  setup() {
    let menucha = ref([]); 
    let menucap2 = ref([]); 
    let active = ref(true);      
    let temp = ref(-1);

    const loadMenuCha = () => {
      axios
        .get("http://10.16.100.33:7150/api/MenuInfo/GetallMenu")
        .then((response) => {
          menucha.value = response.data;    
          
        })
        .catch((error) => {
          console.log(error);
        });
       
    };

    const loadBoxMenu = computed((id) => {
      axios
        .get("http://10.16.100.33:7150/api/MenuInfo/GetallMenu")
        .then((response) => {
          menucha.value = response.data;    
          menucap2 = ref([]);
          for(let i = 0; i < menucha.value.length; i++) {
            if(menucha.value[i].menuParent == id){
              menucap2.value.push(menucha.value[i].menuName);             
            }
          }
          console.log(menucap2.value);
          return menucap2;
        })
        .catch((error) => {
          console.log(error);
        });
       
    });
                
    loadMenuCha();
    // loadBoxMenu(2);

    function showbox(){
      console.log("f");
    }
    
     
    return { menucha, active, temp, showbox, menucap2, loadBoxMenu };
  },

  
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-top: 20px;
}

li {
  display: inline;
  padding-right: 60px;
  color: white;
}
.fa-caret-right {
  color: #a10707;
}

.boxmenu {
  position: absolute;
  top:29px;
  left:0;
  z-index: 1; 
  background-color: white;
  color:black; 
  width: max-content;  
  clip-path: polygon(0 5%, 8% 5%, 10% 0, 12% 5%, 83% 5%, 100% 5%, 100% 85%, 100% 100%, 85% 100%, 15% 100%, 0 100%, 0% 85%);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; 
  /* padding: 20px 30px; */
  
}


.menucap2 {
  border-bottom: 1px solid #bbbbbb;    
  margin: 10px 0;
  padding: 5px 20px 5px 20px;
  
  
}

</style>
