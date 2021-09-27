<template>
	<div class="add-item container">
		<h2 class="center-align indigo-text">Add New Recipe</h2>
		<form @submit.prevent="AddItem">
			<div class="field title">
				<label for="title">Title</label>
				<input type="text" name="title" v-model="title">
			</div>
			<!-- displaying the added ingredients -->
			<div v-for="(ing, index) in ingredients" :key="index" class="field">
				<label for="add-ingredient">Ingredient added</label>
				<input type="text" name="ingredient" v-model="ingredients[index]">
				<i class="material-icons delete" @click="deleteIng(ing)">delete</i>
			</div>
			<div class="field add-ingredient">
				<label for="add-ingredient">Add an ingredient (press ENTER to add):</label>
				<input type="text" name="add-ingredient" @keydown.enter.prevent="addIng"  v-model="another">
			</div>
			<div class="field center-align">
				<p v-if="feedback" class="red-text">{{ feedback }}</p>
				<button class="btn pink" >Add</button>	
			</div>
		</form>
	</div>
</template>

<script>
import db from '@/firebaseconfig'
import { collection, addDoc } from 'firebase/firestore';
const slugify = require("slugify");

export default {
	name: 'Additem',
	data(){
		return{
			title: null,
			another: null,
			ingredients: [],
			feedback: null,
			slug: null
		}
	},
	methods: {
		async AddItem(){
			//add data to firebase
		 	//const db = getFirestore(app);
		 	
			//console.log(this.title, this.ingredients);
			if(this.title){
				this.feedback = null

				//create a slug
				this.slug = slugify(this.title , {
					replacement: '-',
					remove: /[*+~.()'"!:@]/g ,
					lower: true
				})

				//add data to firebase
				const docRef = await addDoc(collection(db, "smoothies"), {
				  title: this.title,
				  ingredients: this.ingredients,
				  slug: this.slug
				});
				
				console.log("Document written with ID added: ", docRef.id);
				this.$router.push({ name: 'Index' })

			}else{
				this.feedback = "You must enter a title"
			}
		},
		addIng(){
			//add ingredints inside array
			if(this.another){
				this.ingredients.push(this.another);
				console.log(this.ingredients);
				this.another=null;
				this.feedback=null;
			} else {
				this.feedback = "You must enter an ingredient"
			}
		},
		deleteIng(ing){
			this.ingredients = this.ingredients.filter(ingredient => {
				return ingredient != ing
			})
		}
	}
}
</script>

<style scoped>
	.add-item{
		margin-top: 60px;
		padding: 20px;
		max-width: 500px;
	}
	.add-item h2{
		font-size: 2em;
		margin: 20px auto;
	}
	.add-item .field{
		margin: 20px auto;
		position: relative;
	}
	.add-item .delete{
		position: absolute;
		right: 0;
		bottom: 16px;
		color: #aaa;
		font-size: 1.4em;
		cursor: pointer;
	}
</style>