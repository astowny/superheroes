<template>
    <v-app id="inspire">
      <v-content>
        <v-container
                class="fill-height"
                fluid
        >
          <v-row
                  align="center"
                  justify="center"
          >
            <v-col
                    cols="12"
                    sm="8"
                    md="6"
            >
              <v-card class="elevation-12 pb-4">
                <v-toolbar
                        color="primary"
                        dark
                        flat
                        height="80"
                >
                    <v-toolbar-title>{{ $t("title") }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <change-locale></change-locale>
                </v-toolbar>
                <heroes/>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
</template>

<script>
import Heroes from './components/Heroes';
import ChangeLocale from './components/ChangeLocale';

export default {
  name: 'SuperherosApp',
  components: {
    Heroes,
    ChangeLocale
  },
  data: () => ({
  })
};
</script>

<style scoped>
</style>