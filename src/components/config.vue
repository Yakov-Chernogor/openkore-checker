<template>
  <div style="height:100%;">
    <span>Check your config.txt</span>
    <v-card elevation="2">
      <v-card-text>
        <codemirror
          ref="cfgEditor"
          v-model="inputData"
          :options="options"
          style="height:85%;"
        ></codemirror>
        <v-alert elevation="2" :type="isValid ? 'success' : 'error'" dense>
          <div v-if="isValid">
            Your config is valid.
          </div>
          <div v-else>Config is invalid. Errors: {{ lintErrors.length }}</div>
        </v-alert>
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
      inputData: null,
      lintErrors: [],
      keyList: {},
      options: {
        tabSize: 4,
        lineNumbers: true,
        gutters: ["CodeMirror-lint-markers"],
        scrollbarStyle: "simple",
      },
    };
  },
  computed: {
    isValid() {
      if (this.lintErrors.length) return false;
      return true;
    },
  },
  methods: {
    checkConfig() {
      const parser = require("@/grammar/parser/config.pegjs");
      this.keyList = [];
      this.lintErrors = [];
      try {
        let parsedData = parser.parse(this.inputData);
        parsedData.forEach((element) => {
          if (typeof element === "object" && element.type) {
            if (element.type == "key") {
              if (!element.isKeyValid) {
                this.addMsg({
                  location: element.location,
                  type: "warning",
                  message: `Unknown key: ${element.key}`,
                });
              } else if (!element.isValueValid) {
                this.addMsg({
                  location: element.location,
                  message: `Invalid value: ${element.value}`,
                });
              }
              if (element.key in this.keyList) {
                this.addMsg({
                  location: element.location,
                  message: `Duplicated: ${element.key}. Already defined on ${
                    this.keyList[element.key].location.start.line
                  } line`,
                });
              }
              this.keyList[element.key] = {
                location: element.location,
                value: element.value,
              };
            } else if (element.type == "block") {
              if (!element.isKeyValid) {
                this.addMsg({
                  location: element.location,
                  type: "warning",
                  message: `Unknown block key: ${element.key}`,
                });
              } else {
                element.value.forEach((value) => {
                  if (!value.isKeyValid) {
                    this.addMsg({
                      location: element.location,
                      type: "warning",
                      message: `Unknown block key: ${value.key}`,
                    });
                  } else if (!value.isValueValid) {
                    this.addMsg({
                      location: element.location,
                      message: `Invalid ${element.key}_${value.key} value: ${value.value}`,
                    });
                  }
                });
              }
            }
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    addMsg(error) {
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
    inputData() {
      this.lintErrors = [];
      this.checkConfig();
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
