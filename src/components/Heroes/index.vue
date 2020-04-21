<template>
	<div class="py-3 grey lighten-2">
		<!-- hero details -->
		<div v-if="selectedHero">
			<hero-detail
				:heroId="selectedHero.id"
				@deleted="selectedHero = null"
				@editing="handleEditing"
				class="mb-2"
			/>
			<v-divider></v-divider>
		</div>
		<!-- loading -->
		<v-row
			v-if="!currentPageHeroes.length"
			class="fill-height mt-2"
			align-content="center"
			justify="center"
		>
			<v-col class="text-center" cols="6">
				{{$t('loading')}}
				<v-progress-linear
					class="mx-auto"
					color="deep-purple accent-4"
					indeterminate
					height="6"
					rounded
				></v-progress-linear>
			</v-col>
		</v-row>
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
			<pagination :heroes="heroes" @input="changePage" />
			<!-- btn moreheroes -->
		</div>
	</div>
</template>

<script>
import HeroDetail from "../HeroDetails/index";
import Pagination from "./_subs/Pagination";
import { mapState, mapMutations } from "vuex";
import { SORT_HEROES_BY_NAME } from "../../store/types/mutations-types";

export default {
	name: "Heroes",
	components: {
		HeroDetail,
		Pagination
	},
	data() {
		return {
			selectedHero: null,
			editing: false
		};
	},
	methods: {
		handleEditing(isEditing) {
			this.editing = isEditing;
		},
		selectHero(hero) {
			if (!this.editing) {
				this.selectedHero = hero;
			}
		},
		changePage: function() {
			// clear selected hero
			this.selectedHero = "";
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