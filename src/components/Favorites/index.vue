<template>
	<div>
		<v-row v-if="favoriteHeroes.length && heroes.length && myHeroes.length" justify="center">
			<v-card v-for="(myhero,i) in myHeroes" :key="'myhero-' + i" class="ma-3 pa-6 d-flex flex-column align-center favorite-card" outlined tile>
				<v-img :src="myhero.imgUrl" width="80" height="80"></v-img>
				{{ myhero.name }}
			</v-card>
		</v-row>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	data() {
		return {};
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
  flex: 0 1 180px
}
</style>