<template>
	<v-app id="inspire">
		<v-content>
			<v-container class="fill-height" fluid>
				<v-row align="center" justify="center">
					<v-col cols="12" sm="8" md="6">
						<v-card class="elevation-12">
							<v-toolbar color="primary" dark flat>
								<v-toolbar-title>{{ $t("title") }}</v-toolbar-title>
								<v-spacer></v-spacer>
								<change-locale></change-locale>
								<template v-slot:extension class="py-6 grey lighten-2">
									<v-tabs v-model="tab" background-color="primary" dark>
										<v-tab href="#favorites">
											<v-icon class="mr-2">fas fa-heart</v-icon>
											{{$t('favoritestab')}}
										</v-tab>

										<v-tab href="#all">
											<v-icon class="mr-2">fas fa-user-secret</v-icon>
											{{$t('alltab')}}
										</v-tab>
									</v-tabs>
								</template>
							</v-toolbar>
							<div class="py-6 grey lighten-2 relative">
								<btn-add-hero @addHero="isAddingHero = true" class="elevation-2" />
								<add-hero-view v-if="isAddingHero" class="py-6 grey lighten-2" />
								<v-tabs-items v-else class="grey lighten-2" v-model="tab">
									<v-tab-item value="favorites">
										<favorites />
									</v-tab-item>
									<v-tab-item value="all">
										<heroes />
									</v-tab-item>
								</v-tabs-items>
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
import Favorites from "./components/Favorites/index";
import { mapState } from "vuex";

export default {
	name: "SuperherosApp",
	components: {
		Heroes,
		ChangeLocale,
		BtnAddHero,
		AddHeroView,
		Favorites
	},
	data: () => ({
		tab: null
	}),
	computed: {
		...mapState(["isAddingHero"])
	}
};
</script>

<style scoped>
.w-full {
	width: 100%;
}
.relative{position: relative;}
</style>