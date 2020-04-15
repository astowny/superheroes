<template>
    <v-card
            class="mx-auto"
            max-width="344"
            outlined
    >
        <v-list-item three-line>
            <v-list-item-content>
                <div class="overline mb-4">{{hero.id}}</div>
                <v-list-item-title class="headline mb-1">{{hero.name}} Details</v-list-item-title>
                <v-list-item-subtitle>{{hero.description}}</v-list-item-subtitle>
                <v-text-field
                        label="Name"
                        filled
                        dense
                        v-model="hero.name">
                </v-text-field>
            </v-list-item-content>

            <v-list-item-avatar
                    tile
                    size="80"
                    color="grey"
            >
                <v-img :src="hero.imgUrl"></v-img>
            </v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
            <v-btn @click="hero.superpower()" text>SuperPower</v-btn>
            <v-btn text>Back</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    //

    export default {
        name: "HeroDetail",
        props: {
            hero: {
                type: Object,
                required: true
            }
        },
        created() {
            this.$store.dispatch('getHeroes')
        }
    }
</script>

<style scoped>

</style>