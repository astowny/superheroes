<template>
	<div class="grey lighten-2">
		<!-- content -->
		<div>
			<!-- filters and sort -->
			<v-row class="justify-space-around align-end px-2">
				<!-- searchbar and results -->
				<v-col cols="6">
					<div class="overline">{{ $t("RESULTS", { count: filteredHeroes.length }) }}</div>
					<v-text-field
						v-model="localSearch"
						clearable
						:label="$t('SEARCH_LABEL')"
					>
						<template v-slot:append-outer>
							<v-btn @click="doSearch()" text><v-icon small>fas fa-search</v-icon></v-btn>
						</template>
					</v-text-field>
				</v-col>
				<v-col cols="6">
					<!-- sort -->
					<v-select
						v-model="selectedSort"
						:items="sortItems"
						:label="$t('SORT_LABEL')"
						>
						<template v-slot:append-outer>
							<v-btn @click="sortHeroesBy()" text><v-icon small>fas fa-sort</v-icon></v-btn>
						</template>
					</v-select>
				</v-col>
				<v-col cols="6" class="align-">
					<v-switch
						@change="display = display === 'CARDS' ? 'LIST' : 'CARDS'"
						:value="display === 'CARDS'"
						:label="$t('SWITCH_DISPLAY_LABEL')"
					></v-switch>
				</v-col>
				<v-col cols="6">
					<v-select
						:items="[3, 5, 8, 13, 15]"
						v-model="$store.state.pagination.visibleItemsPerPageCount"
						:label="$t('VISIBLE_ITEMS_PER_PAGE_LABEL')"
					>
					</v-select>
				</v-col>
			</v-row>

			<!--	display list	-->
			<div v-if="display === 'LIST'">
				<v-list-item v-for="(hero) in currentPageHeroes" :key="hero.id" @click="selectHero(hero)">
					<v-list-item-avatar>
						<v-img :src="hero.imgUrl" alt="Hero Avatar"></v-img>
					</v-list-item-avatar>

					<v-list-item-content>
						<div class="overline font-weight-light">ID : {{hero.id}}</div>
						<v-list-item-title v-html="hero.name"></v-list-item-title>
						<v-list-item-subtitle v-html="hero.description"></v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</div>
			<!-- display cards -->
			<v-row v-else-if="display === 'CARDS'" class="mx-2 mb-3">
				<v-col v-for="(hero) in currentPageHeroes" :key="hero.id" cols="12" md="6" class="pa-2" >
					<v-hover v-slot:default="{ hover }">
						<v-card
							@click="selectHero(hero)"
							:elevation="hover ? 12 : 2"
							outlined
							height="100%"
						>
							<v-list-item three-line>
								<v-list-item-content>
									<div class="overline mb-4">ID : {{ hero.id }}</div>
									<v-list-item-title class="headline mb-1">{{ hero.name }}</v-list-item-title>
									<v-list-item-subtitle>{{ hero.description }}</v-list-item-subtitle>
								</v-list-item-content>

								<v-list-item-avatar tile size="80" color="grey">
									<v-img :src="hero.imgUrl" alt="Hero Avatar"></v-img>
								</v-list-item-avatar>
							</v-list-item>
						</v-card>
					</v-hover>
				</v-col>
			</v-row>
			<!--  pagination  -->
			<pagination class="mx-2" />
		</div>
		<!-- end content -->
	</div>
</template>

<script>
	import Pagination from "./_subs/Pagination";
	import { mapState } from "vuex";
	import {
		SORT_HEROES_BY_NAME,
		SET_SELECTED_HERO,
		SORT_HEROES_BY_ID,
		SET_SEARCH
	} from "../../store/types/mutations-types";
	import { GET_FILTERED_HEROES } from "../../store/types/getters-types";

	export default {
		name: "Heroes",
		components: {
			Pagination
		},
		data() {
			return {
				display:'LIST',
				selectedSort: "",
				localSearch: ""
			};
		},
		methods: {
			doSearch() {
				this.$store.commit(SET_SEARCH, this.localSearch || '');
			},
			selectHero(hero) {
				this.$router.push({ name: 'heroDetails', params: { heroId: hero.id } })
				this.$store.commit(SET_SELECTED_HERO, hero.id);
			},
			sortHeroesBy() {
				//
				if (this.selectedSort === "name") {
					this.$store.commit(SORT_HEROES_BY_NAME);
					this.selectedSort = "";
					this.$store.dispatch('notification/add', { text: this.$t('NOTIFICATION.SORTED_BY_NAME'), color: 'success' })
				} else if (this.selectedSort === "id") {
					this.$store.commit(SORT_HEROES_BY_ID);
					this.selectedSort = "";
					this.$store.dispatch('notification/add', { text: this.$t('NOTIFICATION.SORTED_BY_ID'), color: 'success' })
				}
			}
		},
		computed: {
			...mapState(["heroes", "pagination"]),
			sortItems() {
				return [
					{ text: this.$t("SORT_ITEM_NAME"), value: "name" },
					{ text: this.$t("SORT_ITEM_ID"), value: "id" }
				]
			},
			filteredHeroes() {
				return this.$store.getters[GET_FILTERED_HEROES];
			},
			currentPageHeroes() {
				// where to slice : currentPage - 1 * nbItemsPerPage
				let startSlice =
					this.pagination.visibleItemsPerPageCount *
					(this.pagination.currentPage - 1);
				// the end of slice : startSilce + nbItemsPerPage except if end of array in this case length + 1
				let endSlice =
					startSlice + this.pagination.visibleItemsPerPageCount <
					this.filteredHeroes.length
						? startSlice + this.pagination.visibleItemsPerPageCount
						: this.filteredHeroes.length + 1;
				// set the current page hero list
				return this.filteredHeroes.slice(startSlice, endSlice);
			}
		}
	};
</script>

<style scoped>
</style>