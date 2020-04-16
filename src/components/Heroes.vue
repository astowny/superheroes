<template>
    <div>
        <v-list-item
                v-for="(hero) in heroes"
                :key="hero.name"
                @click="selectHero(hero)"
                :class="{active : hero === selectedHero}"
        >
            <v-list-item-avatar>
                <v-img :src="hero.thumbnail.path + '/portrait_medium.' + hero.thumbnail.extension"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title v-html="`${hero.id} - ${hero.name}`"></v-list-item-title>
                <v-list-item-subtitle v-html="hero.description"></v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <div class="my-2" v-if="selectedHero">
            <hero-detail :hero="selectedHero"/>
        </div>
    </div>
</template>

<script>
    import HeroDetail from "./HeroDetail";

    export default {
        name: "Heroes",
        components: {
            HeroDetail
        },
        data() {
            return {
                selectedHero: null
            }
        },
        methods: {
            selectHero(hero) {
                this.selectedHero = hero
            }
        },
        computed: {
            heroes() {
                return this.$store.state.heroes
            }
        }
    }
</script>

<style scoped>
.active {
    background: lightgrey;
}
</style>