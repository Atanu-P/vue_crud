<template>
  <div class="container">
    <h4 class="center-align indigo-text">List of Recipe</h4>
    <div class="index ">
      <div class="card" v-for="s in smoothies" v-bind:key="s.id">
        <div class="card-content">
          <i class="material-icons delete" v-on:click="deleteSmoothie(s.id)">delete</i>
          <h2 class="indigo-text">{{ s.title }}</h2>
          <ul class="ingredients">
            <li v-for="(i, index) in s.ingredients" v-bind:key="index">
              <span class="chip">{{ i }}</span>
            </li>
          </ul> 
        </div>
        <span class="btn-floating btn-large halfway-fab pink">
          <router-link :to="{ name: 'Edititem', params: {slug: s.slug} }">
            <i class="material-icons edit">edit</i>
          </router-link>        
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebaseconfig'
import { collection, getDocs,  deleteDoc, doc } from 'firebase/firestore';

export default {
  name: 'Index',
  data : function(){
    return{
      smoothies: [
        // {title:'Brew', slug:'brew', ingredients:['bananas','coffee','milk'], id:'1'},
        // {title:'Juice', slug:'juice', ingredients:['mango','lime','juice'], id:'2'},
      ]
    }
  },

  methods:{
    async deleteSmoothie(id){
      //delete data in firebase
     // const db = getFirestore(app);
      if (confirm('Are you sure you want to delete this Recipe?')) {
        
          await deleteDoc(doc(db, "smoothies", id));

          //delete data inside array
          this.smoothies = this.smoothies.filter(smoothie => {
            return smoothie.id != id
          })
          console.log(id + "deleted");

      } else {
          // Do nothing!
          console.log('Cancel delete');
      }

      
    }
  },

  async created(){
    //fetch data from firebase
    
    //console.log(app);
   // const db = getFirestore(app);
    var list = collection(db, "smoothies");
    //console.log(list);

    const querySnapshot = await getDocs(collection(db, "smoothies"));
    //console.log(querySnapshot);
    
    querySnapshot.forEach((smoothies) => {
      //store data inside array
      let item = smoothies.data();
      item.id = smoothies.id;
      this.smoothies.push(item)

      //console.log(smoothies.id, " => ", smoothies.data());
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .index{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}

.index h2{
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}

.index .ingredients{
  margin: 30px auto;
}

.index .ingredients li{
  display: inline-block;
}

.index .delete{
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
