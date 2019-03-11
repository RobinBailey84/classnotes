<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify Demo</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-spacer></v-spacer>

      <v-btn v-on:click="showAlert = !showAlert">Hello</v-btn>

      <v-alert
        :value="showAlert"
        type="success"
      >
        You clicked a button! Way to go!
      </v-alert>

      <v-sheet height="300" width="500">
        <v-calendar
          ref="calendar"
          v-model="start"
          :type="type"
          color="primary"
        ></v-calendar>
      </v-sheet>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  data () {
    return {
      showAlert: false,
      type: 'month',
      start: '2019-02-22',
      typeOptions: [
        { text: 'Day', value: 'day' },
        { text: '4 Day', value: '4day' },
        { text: 'Week', value: 'week' },
        { text: 'Month', value: 'month' },
        { text: 'Custom Daily', value: 'custom-daily' },
        { text: 'Custom Weekly', value: 'custom-weekly' }
      ]
    }
  }
}
</script>
