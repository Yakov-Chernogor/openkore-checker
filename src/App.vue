<template>
  <v-app>
    <v-container fluid fill-height>
      <v-row align="center" justify="center" style="height:100%;">
        <v-col cols="10" style="height:100%;">
          <v-tabs v-model="tab" align-with-title>
            <v-tabs-slider color="green"></v-tabs-slider>
            <v-tab v-for="item in tabs" :key="item">
              {{ item.name }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in tabs" :key="item">
              <v-component :is="item.component"></v-component>
            </v-tab-item>
          </v-tabs-items>
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
      tab: null,
      tabs: [
        {
          name: "config.txt",
          component: config,
        },
        // {
        //   name: "mon_control.txt",
        //   component: mon_control,
        // },
        // {
        //   name: "items_control.txt",
        //   component: items_control,
        // },
        // {
        //   name: "arrowcraft.txt",
        //   component: arrowcraft,
        // },
        // {
        //   name: "avoid.txt",
        //   component: avoid,
        // },
        // {
        //   name: "chat_resp.txt",
        //   component: chat_resp,
        // },
      ],
    };
  },
  methods: {},
};
</script>

<style scoped></style>
