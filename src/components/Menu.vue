<template>
  <div class="container-fluid p-1 d-none d-lg-block" style="background-color: #a10707">
    <div class="container">
      {{ myVal(5) }}
      <ul>
        <li v-for="menu in menucha" :key="menu.id" style="position: relative;">
          <span v-if="menu.menuParent == 0"> {{ menu.menuName.toUpperCase() }}</span>
          <div v-if="menu.id == 2" class="boxmenu">                                              
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
    let count = ref(0);
        
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
    const myVal = computed(() => id => {
      for(let i=0; i<5;i++){
          
          menucap2.value.push(i);
         
          
        }
        return menucap2;
    } )
    
    const loadMenuCap2 = () => {                  
     /*  axios
        .get("http://10.16.100.33:7150/api/MenuInfo/GetallMenu")
        .then((response) => {
          menucha.value = response.data;    
          console.log(menucha.value.length);
          for(let i=0; i<menucha.value.length;i++){
            if(menucha.value[i].menuParent == id){
              menucap2.value.push(menucha.value[i]);    
              console.log(menucap2.value);    
            }
          }                   
        })
        .catch((error) => {
          console.log(error);
        });    */
        for(let i=0; i<5;i++){
          
          menucap2.value.push(i);
         
          
        }
        console.log(menucap2.value);
        return menucap2;
      
    };
    
    loadMenuCha();
   
  
    return { menucha, menucap2, myVal};
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
  top:31px;
  left:0;
  background-color: white;
  clip-path: polygon(0 5%, 8% 5%, 10% 0, 12% 5%, 83% 5%, 100% 5%, 100% 85%, 100% 100%, 85% 100%, 15% 100%, 0 100%, 0% 85%);
  z-index: 1; 
  width: max-content;  
  color:black; 
  padding: 20px 30px;
  border: 1px solid #878787;
}

.borderbottom {
  border-bottom: 1px solid #bbbbbb;
}

</style>
