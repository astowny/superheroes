<template>
    <v-col cols="auto">
        <v-select
                :items="items"
                background-color="primary"
                v-model="$root.$i18n.locale"
                class="width"
        ></v-select>
    </v-col>
</template>

<script>
    export default {
        name: "ChangeLocale",
        data() {
            return {
                items: ['fr','en','ja']
            }
        }
    }
</script>

<style scoped>
.width {
    width:50px;
    position: relative;
    top:8px
}
</style>