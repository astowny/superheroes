<template>
    <div>
        <v-list-item
                v-for="(hero) in heroes"
                :key="hero.name"
                @click="selectHero(hero)"
                :class="{active : hero === selectedHero}"
        >
            <v-list-item-avatar>
                <v-img :src="hero.imgUrl"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>

                <v-list-item-title v-html="`${hero.id} - ${hero.name}`"></v-list-item-title>
                <v-list-item-subtitle v-html="hero.description"></v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <div v-if="selectedHero">
            <hero-detail :hero="selectedHero"/>
        </div>
    </div>
</template>

<script>
    import {HEROES} from '../app/mock-heroes'
    import HeroDetail from "./HeroDetail";

    export default {
        name: "Heroes",
        components: {
            HeroDetail
        },
        data() {
            return {
                heroes : HEROES,
                selectedHero: null
            }
        },
        methods: {
            selectHero(hero) {
                this.selectedHero = hero
            }
        }
    }
</script>

<style scoped>
.active {
    background: teal;
}
</style>