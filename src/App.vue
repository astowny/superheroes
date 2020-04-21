<template>
	<v-app id="inspire">
		<v-content>
			<v-container class="fill-height" fluid>
				<v-row align="center" justify="center">
					<v-col cols="12" sm="8" md="6">
						<v-card class="elevation-12">
							<v-toolbar color="primary" dark flat height="80">
								<v-toolbar-title>{{ $t("title") }}</v-toolbar-title>
								<v-spacer></v-spacer>
								<change-locale></change-locale>
								<btn-add-hero @addHero="isAddingHero = true"/>
							</v-toolbar>
							<div class="py-6 grey lighten-2">
								<add-hero-view v-if="isAddingHero"/>
								<heroes v-else />
							</div>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
import Heroes from "./components/Heroes/index";
import ChangeLocale from "./components/ChangeLocale";
import BtnAddHero from "./components/BtnAddHero/index";
import AddHeroView from "./components/AddHeroView";
import {mapState} from 'vuex'

export default {
	name: "SuperherosApp",
	components: {
		Heroes,
		ChangeLocale,
		BtnAddHero,
		AddHeroView
	},
	data: () => ({}),
	computed: {
		...mapState(['isAddingHero'])
	}
};
</script>

<style scoped>
</style>