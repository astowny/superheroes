<template>
  <div class="d-flex flex-column my-2">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="red"
          dark
          v-on="on"
        >
          <v-icon>
            fas fa-trash
          </v-icon>
        </v-btn>
      </template>

      <v-card >
        <v-card-title
          class="headline grey lighten-2 text-center"
          primary-title
        >
          You will delete the hero. (add translations)
        </v-card-title>

        <v-card-actions>
          <v-btn
            @click="yes()"
            color="red"
            dark
            depressed 
          >
            Yes
          </v-btn>
          <v-btn
            @click="dialog = false"
            color="primary"
            depressed 
            text
          >
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    yes() {
      this.$emit('yes')
      this.dialog = false
    }
  }
}
</script>