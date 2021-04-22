<template>
  <div style="height:100%;">
    <span>Check your config.txt</span>
    <v-card elevation="4">
      <v-card-text>
        <codemirror
          ref="cfgEditor"
          v-model="configData"
          :options="options"
          style="height:85%;"
        ></codemirror>
        <v-card-actions style="height:15%;">
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
      </v-card-text>
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
  name: "config",
  components: {
    codemirror,
  },
  data() {
    return {
      configData: null,
      configValid: false,
      lintErrors: [],
      options: {
        tabSize: 4,
        lineNumbers: true,
        gutters: ["CodeMirror-lint-markers"],
        scrollbarStyle: "simple",
      },
    };
  },
  methods: {
    checkConfig() {
      const parser = require("@/grammar/parser/config.pegjs");
      this.lintErrors = [];
      try {
        let parsedData = parser.parse(this.configData);
        parsedData.forEach((element) => {
          if (
            typeof element === "object" &&
            element.key &&
            element.key != "#"
          ) {
            if (!element.isKeyValid) {
              this.showError({
                location: element.location,
                type: "warning",
                message: "Unknown key: " + element.key,
              });
            } else if (!element.isValueValid) {
              this.showError({
                location: element.location,
                message: "Invalid value: " + element.value,
              });
            }
          }
        });
      } catch (e) {
        console.log(e);
        this.configValid = false;
      }
      if (this.lintErrors.length) {
        this.configValid = false;
      } else {
        this.configValid = true;
      }
    },
    showError(error) {
      this.lintErrors.push({
        from: CodeMirror.Pos(
          error.location.start.line - 1,
          error.location.start.column - 1
        ),
        to: CodeMirror.Pos(
          error.location.end.line - 1,
          error.location.end.column - 1
        ),
        severity: error.type,
        message: error.message,
      });
    },
  },
  watch: {
    lintErrors() {
      this.$refs.cfgEditor.codemirror.setOption("lint", {
        getAnnotations: () => {
          return this.lintErrors;
        },
      });
    },
    deep: true,
  },
};
</script>

<style>
.CodeMirror {
  border: 1px solid #eee;
  width: 100%;
  height: 650px;
}
</style>
