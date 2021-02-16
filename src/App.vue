<template>
  <v-app>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="10">
          <config-parser></config-parser>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import configParser from "./components/configParser.vue";

// import buildConfig from "./grammar/openkore.js";

export default {
  name: "App",
  components: {
    configParser,
  },
  data() {
    return {
      configSelectedType: null,
      configTypes: [
        "config.txt",
        "mon_control.txt",
        "items_control.txt",
        "arrowcraft.txt",
        "avoid.txt",
        "chat_resp.txt",
      ],
    };
  },
  methods: {},
};
</script>

<style scoped></style>
