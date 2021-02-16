<template>
  <div>
    <v-card elevation="4">
      <v-card-title>
        Check your config
      </v-card-title>
      <codemirror
        ref="cfgEditor"
        v-model="configData"
        :options="options"
      ></codemirror>
      <v-card-actions class="ma-2">
        <v-btn color="primary" @click="checkConfig">
          Check
        </v-btn>
        <v-chip
          v-if="configValid"
          class="ml-5 pl-5 pr-5 body-1"
          color="green"
          outlined
        >
          <v-icon left>mdi-check</v-icon>
          Valid
        </v-chip>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import CodeMirror from "codemirror";
import "codemirror/addon/scroll/simplescrollbars.js";
import "codemirror/addon/lint/lint.js";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/scroll/simplescrollbars.css";
import "codemirror/addon/lint/lint.css";
import { codemirror } from "vue-codemirror";

export default {
  name: "configParser",
  components: {
    codemirror,
  },
  data() {
    return {
      configData: null,
      configValid: false,
      lintError: null,
      options: {
        tabSize: 4,
        lineNumbers: true,
        gutters: ["CodeMirror-lint-markers"],
        scrollbarStyle: "simple",
        lint: false,
      },
    };
  },
  methods: {
    checkConfig() {
      const parser = require("@/grammar/parser/config.pegjs");
      try {
        parser.parse(this.configData);
        // let parsed = parser.parse(this.configData);
        // console.log(parsed)
        this.configValid = true;
      } catch (e) {
        console.log(e);
        this.lintError = {
          from: CodeMirror.Pos(
            e.location.start.line - 1,
            e.location.start.column - 1
          ),
          to: CodeMirror.Pos(
            e.location.end.line - 1,
            e.location.end.column - 1
          ),
          message: e.message,
        };
        this.$refs.cfgEditor.codemirror.setOption("lint", {
          getAnnotations: () => {
            return [this.lintError];
          },
        });
        this.$refs.cfgEditor.codemirror.scrollIntoView(this.lintError.from, 30);
        this.configValid = false;
      }
    },
  },
  mounted() {
    this.$refs.cfgEditor.codemirror.setSize("100%", "400");
  },
};
</script>

<style scoped></style>
