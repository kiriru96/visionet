<template>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">{{ title }}</v-card-title>

        <v-card-text>
          {{ text }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            text
            @click="$emit('no')"
          >
            No
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="$emit('ok')"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
  export default {
    props: {
        dialog: Boolean,
        title: String,
        text: String
    }
  }
</script>