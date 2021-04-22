{
	const config = require("@/grammar/key/config.js");
	const cfg = new config();
}

config = lines
lines = line*
line = comment / block / keyvalue / eol / . (!eol .)*

comment = "#"+ comment_text eol? {
	return {
		type: "comment",
	}
}

comment_text = . (!eol .)*

block = a:(key) " " '{' eol b:(block_keyvalue)* '}' eol? {
	let block = a.join("");
	let values = [];
	b.forEach((element) => {
		values.push({
			key: element.key,
			value: element.value,
			isKeyValid: cfg.check_block_key(block, element.key),
			isValueValid: cfg.check_block_keyvalue(element.value)
		});
	});
	return {
		type: "block",
		key: block,
		value: values,
		location: location(),
		isKeyValid: cfg.check_block(block)
	}
}

block_keyvalue = ([\t ])* a:key " "? match? " "? b:value? eol? {
	return {
    key: a.join(""),
    value: b ? b.join("") : ""
  }
}

keyvalue = a:(key) " "? match? " "? b:(value)? eol? {
	let key = a.join("");
	let value = b ? b.join("") : "";
	return {
		type: "key",
		key: key,
		value: value,
		location: location(),
		isKeyValid: cfg.check_key(key),
		isValueValid: cfg.check_value(key, value)
	}
}

key = [a-z0-9_]i+

value = [a-z0-9.]i+

match = [<>]

eol = '\n' / '\r' '\n'?