{
	const config = require("./configKeys.js");

	function key_check(key, value) {
		if(!config.keys.includes(key)) {
			error("Uknown key: "+key);
		}
	}
}

config = lines
lines = line*
line = comment
	/ block
	/ keyvalue
  / eol {
    return ""
  }
	/ . (!eol .)*

comment = "#"+ comment_text eol? {
	return false;
}

comment_text = . (!eol .)*

block = a:block_key " " '{' eol b:("\t"? keyvalue)* ("\t"? comment)* "}" eol {
	let vals = [];
	b.forEach((el) => {
		vals.push(el[1]);
	})
	return {
		type: "block",
		key: a,
		value: vals
	}
}

block_key = a:([a-z0-9_]i+) {
	let key = a.join("")
	key_check(key)
	return key
}

keyvalue = a:([a-z0-9_]i+) " "? match? ""? b:([a-z0-9.]i+)? eol {
	let key = a.join("");
	let value = b ? b.join("") : null;
	key_check(key);
	return {
		key: key,
		value: value
	}
}

match = [<>] {
	return "<>";
}

eol = '\n'
	/ '\r' '\n'?