export default function(input) {
  const endline = "\n";
  let result = "";
  input.forEach((element) => {
    switch (element.type) {
      case "empty":
        result += endline;
        break;
      case "comment":
        result += element.value;
        result += endline;
        break;
      case "parameter":
        if (element.value) {
          result += element.key + " " + element.value;
        } else {
          result += element.key;
        }
        result += endline;
        break;
    }
  });
  return result;
}

// export default function(input) {
//   const parser = require("./parser/config.pegjs");
//   let parsed;
//   try {
//     parsed = parser.parse(input);
//   } catch (e) {
//     console.log(e);
//   }
//   console.log(parsed);
//   return buildResult(parsed);
// }
