const http = require("https");

const getPage = (host, path) => {
	return new Promise(async (resolve, reject) => {
		if (host && path) {
			http.request(
				{
					host,
					path,
				},
				(response) => {
					var str = "";

					//another chunk of data has been received, so append it to `str`
					response.on("data", function (chunk) {
						str += chunk;
					});

					//the whole response has been received, so we just print it out here
					response.on("end", function () {
						return resolve(str);
					});
				}
			).end();
		} else return resolve(false);
	});
};

module.exports = getPage;
