<template>
	<div>
		<v-row v-if="favoriteHeroes.length && heroes.length && myHeroes.length" justify="center">
			<v-hover v-for="(myhero,i) in myHeroes" :key="'myhero-' + i" v-slot:default="{ hover }">
				<v-card
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
		<v-row v-if="selectedHero">
			<v-col>
				<hero-details :heroId="selectedHero" />
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { mapState } from "vuex";
import HeroDetails from "../HeroDetails/index";
export default {
	components: {
		HeroDetails
	},
	data() {
		return {
			selectedHero: 0
		};
	},
	methods: {
		showDetails(id) {
      this.selectedHero = id;
		}
	},
	computed: {
		...mapState(["favoriteHeroes", "heroes"]),
		myHeroes() {
			let tmpMyHeroes = [];
			this.favoriteHeroes.forEach(heroId => {
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