<template>
	<v-app id="inspire">
		<v-content>
			<v-container class="fill-height" fluid>
				<v-row align="center" justify="center">
					<v-col cols="12" sm="8" md="6">
						<!-- card of my App -->
						<v-card class="elevation-12 grey lighten-2">
							<!-- notification -->
							<notification />
							<!-- toolbar -->
							<v-toolbar color="primary" dark flat>
								<v-toolbar-title>{{ $t("title") }}</v-toolbar-title>
								<v-spacer></v-spacer>
								<change-locale></change-locale>
								<template v-slot:extension class="py-6 grey lighten-2">
									<!-- tabs -->
									<v-tabs @change="close()" v-model="tab" background-color="primary" dark>
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
								<!-- end tabs -->
							</v-toolbar>
							<!-- end toolbar -->
							<!-- loading -->
							<v-row
								v-if="!heroes.length"
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
							<!-- end loading -->
							<!-- content -->
							<hero-details v-if="selectedHero" :heroId="selectedHero" @deleted="close()" />
							<div v-else class="py-6 grey lighten-2 relative">
								<btn-add-hero @addHero="isAddingHero = true" class="elevation-2" />
								<add-hero-view v-if="isAddingHero" class="py-6 grey lighten-2" />
								<!-- tabs content -->
								<v-tabs-items v-else class="grey lighten-2" v-model="tab">
									<v-tab-item value="favorites">
										<favorites />
									</v-tab-item>
									<v-tab-item value="all">
										<heroes />
									</v-tab-item>
								</v-tabs-items>
								<!-- end tabs content -->
							</div>
							<!-- end content -->
						</v-card>
						<!-- end card of my App -->
					</v-col>
				</v-row>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
import Heroes from "./components/Heroes/index";
import HeroDetails from "./components/HeroDetails/index";
import ChangeLocale from "./components/ChangeLocale";
import BtnAddHero from "./components/BtnAddHero/index";
import AddHeroView from "./components/AddHeroView";
import Favorites from "./components/Favorites/index";
import Notification from "./components/Notification/index";
import { mapState } from "vuex";
import { SET_SELECTED_HERO } from "./store/types/mutations-types";

export default {
	name: "SuperherosApp",
	components: {
		Heroes,
		ChangeLocale,
		BtnAddHero,
		AddHeroView,
		Favorites,
		Notification,
		HeroDetails
	},
	data: () => ({
		tab: null
	}),
	methods: {
		close() {
			this.$store.commit(SET_SELECTED_HERO, null);
		}
	},
	computed: {
		...mapState(["isAddingHero", "notify", "selectedHero", "heroes"])
	}
};
</script>

<style scoped>
.w-full {
	width: 100%;
}
.relative {
	position: relative;
}
</style>