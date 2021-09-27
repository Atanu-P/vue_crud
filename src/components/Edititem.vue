<template>
	<div v-if="smoothie" class="edit-item container">
		<h2 class="center-align indigo-text">Edit {{ smoothie.title }} Recipe</h2>

		<form @submit.prevent="EditItem">
			<div class="field title">
				<label for="title">Title</label>
				<input type="text" name="title" v-model="smoothie.title">
			</div>
			<!-- displaying the added ingredients -->
			<div v-for="(ing, index) in smoothie.ingredients" :key="index" class="field">
				<label for="add-ingredient">Ingredient added</label>
				<input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
				<i class="material-icons delete" @click="deleteIng(ing)">delete</i>
			</div>
			<div class="field add-ingredient">
				<label for="add-ingredient">Add an ingredient (press ENTER to add):</label>
				<input type="text" name="add-ingredient" @keydown.enter.prevent="addIng"  v-model="another">
			</div>
			<div class="field center-align">
				<p v-if="feedback" class="red-text">{{ feedback }}</p>
				<button class="btn pink" >Update</button>	
			</div>
		</form>
	</div>
</template>

<script>
import db from '@/firebaseconfig'
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
const slugify = require("slugify");

export default {
	name: 'Edititem',
	data(){
		return{
			smoothie: null,
			another:null,
			feedback: null
		}
	},

	methods:{
		async EditItem(){
			//const db = getFirestore(app);
		 	
			if(this.smoothie.title){
				this.feedback = null

				//create a slug
				this.smoothie.slug = slugify(this.smoothie.title , {
					replacement: '-',
					remove: /[*+~.()'"!:@]/g ,
					lower: true
				})

				//add data to firebase
				const docRef = await setDoc(doc(db, "smoothies", this.smoothie.id), {
				  title: this.smoothie.title,
				  ingredients: this.smoothie.ingredients,
				  slug: this.smoothie.slug
				});
				
				this.$router.push({ name: 'Index' })
			
			}else{
				this.feedback = "You must enter a title"
			}

			console.log(this.smoothie.title, this.smoothie.ingredients)
		}, 

		addIng(){
			//add ingredints inside array
			if(this.another){
				this.smoothie.ingredients.push(this.another);
				console.log(this.smoothie.ingredients);
				this.another=null;
				this.feedback=null;
			} else {
				this.feedback = "You must enter an ingredient"
			}
		},

		deleteIng(ing){
			//delete ingredints inside array
			this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
				return ingredient != ing
			})
		}
	},

 	async created(){
 		const slug = this.$route.params.slug;
		//const ref = doc(db, "smoothies", slug);
		const q = query(collection(db, "smoothies"), where("slug", "==", slug));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
		  //inserting data from firebase to smoothie array
		  this.smoothie = doc.data()
		  this.smoothie.id = doc.id
		});
		//console.log(querySnapshot);
	}
}
</script>

<style scoped>
	.edit-item{
		margin-top: 60px;
		padding: 20px;
		max-width: 500px;
	}
	.edit-item h2{
		font-size: 2em;
		margin: 20px auto;
	}
	.edit-item .field{
		margin: 20px auto;
		position: relative;
	}
	.edit-item .delete{
		position: absolute;
		right: 0;
		bottom: 16px;
		color: #aaa;
		font-size: 1.4em;
		cursor: pointer;
	}
</style>