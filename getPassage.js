const { default: Cheerio } = require("cheerio");
const getPage = require("./getPage");
const getSanitizedQuery = require("./getSanitizedQuery");

const getPassage = async (question) => {
	return new Promise(async (resolve, reject) => {
		if (!question) return resolve(false);
		const query = getSanitizedQuery(question);
		const host = "en.wikipedia.org";
		const path = `/w/index.php?search=${query}%3F&title=Special%3ASearch&go=Go&ns0=1`;
		const page = await getPage(host, path);
		if (page) {
			try {
				const resultPaths = [];
				const $ = Cheerio.load(page);
				const result = $(".mw-search-result-heading").children("a");
				for (let i = 0; i < 2; i++) {
					resultPaths.push(result[i].attribs.href);
				}
				let passage = "";
				const promises = [];
				for (let i = 0; i < resultPaths.length; i++) {
					promises.push(getPage(host, resultPaths[i]));
				}
				Promise.all(promises).then((pages) => {
					for (let i = 0; i < pages.length; i++) {
						if (pages[i]) {
							try {
								const $ = Cheerio.load(pages[i]);
								const pLimit = 7;
								const paras =
									$(".mw-parser-output").children("p");
								for (let i = 0; i < pLimit; i++) {
									passage += $(paras[i]).text();
								}
							} catch (error) {
								console.log(error);
								return resolve(false);
							}
						}
					}

					return resolve(passage);
				});
			} catch (error) {
				console.error(error);
				return resolve(false);
			}
		} else return resolve(false);
	});
};

module.exports = getPassage;
