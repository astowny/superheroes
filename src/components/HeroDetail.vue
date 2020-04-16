<template>
    <v-card
            class="mx-auto"
            max-width="344"
            outlined
    >
        <v-list-item three-line>
            <v-list-item-content>
                <div class="overline mb-4">{{hero.id}}</div>
                <v-list-item-title class="headline mb-1">{{ $t('details', {name: hero.name})}}</v-list-item-title>
                <v-text-field
                        label="Name"
                        filled
                        dense
                        v-model="hero.name">
                </v-text-field>
                <p>{{hero.description}}</p>
            </v-list-item-content>

            <v-list-item-avatar
                    tile
                    size="80"
                    color="grey"
            >
                <v-img :src="hero.thumbnail.path + '/portrait_medium.' + hero.thumbnail.extension"></v-img>
            </v-list-item-avatar>
        </v-list-item>

    </v-card>
</template>

<script>
    export default {
        name: "HeroDetail",
        props: {
            hero: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>