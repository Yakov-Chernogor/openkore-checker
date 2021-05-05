{
	const mon_control = require("@/grammar/key/mon_control.js");
	const mon = new mon_control();
}

mon_control = lines
lines = line*
line = comment / keyvalue / eol / junk

keyvalue = a:$key whitespace b:$value? eol? {
	let pos = b.search("#.*$")
	if (pos > 0) {
    	b = b.substring(0, pos);
	}
	return {
		type: "key",
		key: a,
		value: b,
		location: location(),
		isKeyValid: null,
		isValueValid: mon.check_value(b)
	}
}

comment = whitespace* "#" a:$comment_text? eol? {
	return {
		type: "comment",
		value: a,
	}
}

comment_text = (!eol .)*

junk = a:$(. (!eol .)*) {
	return {
		type: "junk",
		value: a,
		location: location()
	}
}

key = ([a-z']i+ (' ' [a-z']i+)+)+ / ([a-z']i+) / ([0-9]+)

value = a:$(!eol .)*

whitespace = [' '\t]

eol = '\n' / '\r' '\n'?