<template>
  <v-card style="height:100%;">
    <v-card-text>
      <codemirror
        ref="cfgEditor"
        v-model="inputData"
        :options="options"
        style="height:85%;"
      ></codemirror>
      <v-alert elevation="1" :type="status.valid ? 'success' : 'error'" dense>
        <v-row no-gutters>
          <v-col cols="10">{{ status.hint }}</v-col>
          <v-col cols="2" align="end" v-if="!status.valid">
            <span>
              <v-icon>mdi-alert-circle-outline</v-icon>
              {{ status.count.warnings }}
            </span>
            <span>
              <v-icon>mdi-close-circle-outline</v-icon>
              {{ status.count.errors }}
            </span>
          </v-col>
        </v-row>
      </v-alert>
    </v-card-text>
  </v-card>
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
      inputData: "",
      lintErrors: [],
      keyList: [],
      blockKeyList: [],
      options: {
        tabSize: 4,
        lineNumbers: true,
        gutters: ["CodeMirror-lint-markers"],
        scrollbarStyle: "simple",
      },
    };
  },
  computed: {
    status() {
      if (this.inputData.length && this.lintErrors.length) {
        return {
          valid: false,
          hint: "Invalid",
          count: this.countMsg(),
        };
      } else if (this.inputData.length && !this.lintErrors.length) {
        return {
          valid: true,
          hint: "Valid",
          count: this.countMsg(),
        };
      }
      return {
        valid: true,
        hint: "Ready",
        count: this.countMsg(),
      };
    },
  },
  methods: {
    checkConfig() {
      const parser = require("@/grammar/parser/config.pegjs");
      this.lintErrors = [];
      this.keyList = [];
      try {
        let parsedData = parser.parse(this.inputData);
        parsedData.forEach((element) => {
          if (typeof element === "object" && element.type) {
            if (element.type == "key") {
              if (!element.isKeyValid) {
                this.addMsg({
                  location: element.location,
                  type: "warning",
                  message: `Unknown key: "${element.key}"`,
                });
              } else if (!element.isValueValid) {
                this.addMsg({
                  location: element.location,
                  type: "error",
                  message: `Invalid value: "${element.value}"`,
                });
              }
              if (element.key in this.keyList) {
                this.addMsg({
                  location: element.location,
                  type: "error",
                  message: `Duplicated: "${element.key}". Already defined on ${
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
                  message: `Unknown block key: "${element.key}"`,
                });
              } else {
                if (!element.isNameValid) {
                  this.addMsg({
                    location: element.location,
                    type: "error",
                    message: `Unknown block name: "${element.name}"`,
                  });
                }
                this.blockKeyList = [];
                element.value.forEach((value) => {
                  if (!value.isKeyValid) {
                    this.addMsg({
                      location: element.location,
                      type: "warning",
                      message: `Unknown block key: "${value.key}"`,
                    });
                  } else if (!value.isValueValid) {
                    this.addMsg({
                      location: element.location,
                      type: "error",
                      message: `Invalid ${element.key}_${value.key} value: "${value.value}"`,
                    });
                  }
                  if (value.key in this.blockKeyList) {
                    this.addMsg({
                      location: element.location,
                      type: "error",
                      message: `Duplicated block key: "${
                        value.key
                      }". Already defined on ${
                        this.blockKeyList[value.key].location.start.line
                      } line`,
                    });
                  }
                  this.blockKeyList[value.key] = {
                    location: value.location,
                    value: value.value,
                  };
                });
              }
            } else if (element.type == "junk") {
              this.addMsg({
                location: element.location,
                type: "error",
                message: `Parsing error: "${element.value}"`,
              });
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
    countMsg() {
      let warnings = 0;
      let errors = 0;
      this.lintErrors.forEach((element) => {
        if (element.severity == "warning") warnings += 1;
        else if (element.severity == "error") errors += 1;
      });
      return {
        warnings: warnings,
        errors: errors,
      };
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
