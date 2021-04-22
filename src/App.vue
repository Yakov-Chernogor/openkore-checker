<template>
  <v-app>
    <v-container fluid fill-height>
      <v-row align="center" justify="center" style="height:100%;">
        <v-col cols="10" style="height:100%;">
          <config></config>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import config from "@/components/config.vue";

export default {
  name: "App",
  components: {
    config,
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
