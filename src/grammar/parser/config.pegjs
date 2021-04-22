{
	const config = require("@/grammar/key/config.js");
	const cfg = new config();
}

config = lines
lines = line*
line = comment
	/ block
	/ keyvalue
  / eol
	/ . (!eol .)*

comment = "#"+ comment_text eol? {
	return {
		key: "#",
	}
}

comment_text = . (!eol .)*

block = a:block_key " " '{' eol b:("\t"? keyvalue)* ("\t"? comment)* "}" eol {
	
}

block_key = a:([a-z0-9_]i+)

keyvalue = a:([a-z0-9_]i+) " "? match? ""? b:([a-z0-9.]i+)? eol? {
	let key = a.join("");
	let value = b ? b.join("") : "";
	return {
		"key": key,
		"value": value,
		"location": location(),
		"isKeyValid": cfg.check_key(key),
		"isValueValid": cfg.check_value(key, value)
	}
}

match = [<>]

eol = '\n' / '\r' '\n'?