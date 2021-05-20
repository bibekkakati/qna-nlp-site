const getSanitizedQuery = (text) => {
	let query = "";
	text = text.trim();
	for (let i = 0; i < text.length; i++) {
		if (text[i] !== " ") {
			query += text[i];
		} else if (text[i] === " " && text[i - 1] !== "+") {
			query += "+";
		}
	}
	return query;
};

module.exports = getSanitizedQuery;
