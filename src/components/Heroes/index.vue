<template>
	<div class="py-3 grey lighten-2">
		<!-- content -->
		<div>
			<!-- btn sort -->
			<div class="d-flex justify-center">
				<v-btn @click="() => {SORT_HEROES_BY_NAME}">
					<v-icon>fas fa-sort-alpha-down</v-icon>
				</v-btn>
			</div>
			<!-- list items -->
			<v-list-item
				v-for="(hero) in currentPageHeroes"
				:class="{secondary : hero === selectedHero}"
				:key="hero.name"
				@click="selectHero(hero)"
			>
				<v-list-item-avatar>
					<v-img :src="hero.imgUrl"></v-img>
				</v-list-item-avatar>

				<v-list-item-content :class="hero === selectedHero ? 'white--text' :''">
					<v-list-item-title v-html="`${hero.id} - ${hero.name}`"></v-list-item-title>
					<v-list-item-subtitle
						v-html="hero.description"
						:class="hero === selectedHero ? 'white--text' :''"
					></v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<!--  pagination  -->
			<pagination :heroes="heroes"/>
			<!-- btn moreheroes -->
		</div>
		<!-- end content -->
	</div>
</template>

<script>
import Pagination from "./_subs/Pagination";
import { mapState, mapMutations } from "vuex";
import { SORT_HEROES_BY_NAME, SET_SELECTED_HERO } from "../../store/types/mutations-types";

export default {
	name: "Heroes",
	components: {
		Pagination
	},
	methods: {
		selectHero(hero) {
				this.$store.commit(SET_SELECTED_HERO, hero.id)
		}
	},
	computed: {
		...mapState(["heroes", "pagination"]),
		...mapMutations([SORT_HEROES_BY_NAME]),
		currentPageHeroes() {
			// where to slice : currentPage - 1 * nbItemsPerPage
			let startSlice =
				this.pagination.visibleItemsPerPageCount *
				(this.pagination.currentPage - 1);
			// the end of slice : startSilce + nbItemsPerPage except if end of array in this case length + 1
			let endSlice =
				startSlice + this.pagination.visibleItemsPerPageCount <
				this.heroes.length
					? startSlice + this.pagination.visibleItemsPerPageCount
					: this.heroes.length + 1;
			// set the current page hero list
			return this.heroes.slice(startSlice, endSlice);
		}
	}
};
</script>

<style scoped>
.active {
	background: lightgrey;
}
</style>