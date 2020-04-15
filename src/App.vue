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
                    md="4"
            >
              <v-card class="elevation-12 pb-4">
                <v-toolbar
                        color="primary"
                        dark
                        flat
                >
                  <v-toolbar-title>Supeeeeeeeer Heroes !!!</v-toolbar-title>

                </v-toolbar>
                <hero />
                <heroes/>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
</template>

<script>
import Hero from './components/Hero';
import Heroes from './components/Heroes';

export default {
  name: 'SuperherosApp',

  components: {
    Hero,
    Heroes,
  },

  data: () => ({
    //
  }),
};
</script>
