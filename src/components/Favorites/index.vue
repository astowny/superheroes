<template>
	<div>
		<v-row v-if="favoriteHeroesId.length && heroes.length && myHeroes.length" justify="center">
			<v-hover v-for="(myhero,i) in myHeroes" :key="'myhero-' + i" v-slot:default="{ hover }">
				<v-card
					v-if="myhero !== undefined"
					@click="showDetails(myhero.id)"
					class="ma-3 pa-3 d-flex flex-column align-center favorite-card"
					:elevation="hover ? 12 : 2"
					outlined
					tile
				>
					<v-img :src="myhero.imgUrl" width="80" height="80"></v-img>
					{{ myhero.name }}
				</v-card>
			</v-hover>
		</v-row>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { SET_SELECTED_HERO } from "../../store/types/mutations-types";

export default {
	data() {
		return {};
	},
	methods: {
		showDetails(id) {
			this.$store.commit(SET_SELECTED_HERO, id);
		}
	},
	computed: {
		...mapState(["favoriteHeroesId", "heroes"]),
		myHeroes() {
			let tmpMyHeroes = [];
			this.favoriteHeroesId.forEach(heroId => {
				tmpMyHeroes.push(this.heroes.find(h => h.id === heroId));
			});
			return tmpMyHeroes;
		}
	}
};
</script>

<style scoped>
.favorite-card {
	flex: 0 1 180px;
}
</style>