<template>
    <div>
        <!--    hero details    -->
        <div class="my-2" v-if="selectedHero">
            <hero-detail :hero="selectedHero"/>
        </div>
        <v-alert v-if="currentPageHeroes < 1">
            Loading...
        </v-alert>
<!--     list items       -->
        <v-list-item
                v-for="(hero) in currentPageHeroes"
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
<!--  pagination  -->
        <pagination :heroes="heroes"  @input="changePage" />
    </div>
</template>

<script>
    import HeroDetail from "./HeroDetail";
    import Pagination from "./Pagination";

    export default {
        name: "Heroes",
        components: {
            HeroDetail,
            Pagination
        },
        data() {
            return {
                selectedHero: null,
            }
        },
        methods: {
            selectHero(hero) {
                this.selectedHero = hero
            },
            changePage: function(){
                // clear selected hero
                this.selectedHero = ''
            }
        },
        computed: {
            heroes() {
                return this.$store.state.heroes
            },
            currentPageHeroes() {
                // where to slice : currentPage - 1 * nbItemsPerPage
                let startSlice = this.$store.state.pagination.visibleItemsPerPageCount * (this.$store.state.pagination.currentPage - 1)
                // the end of slice : startSilce + nbItemsPerPage except if end of array in this case length + 1
                let endSlice = startSlice + this.$store.state.pagination.visibleItemsPerPageCount < this.$store.state.heroes.length ? (startSlice + this.$store.state.pagination.visibleItemsPerPageCount) : this.$store.state.heroes.length + 1
                // set the current page hero list
                return this.$store.state.heroes.slice(startSlice, endSlice)
            }
        },
    }
</script>

<style scoped>
.active {
    background: lightgrey;
}
</style>