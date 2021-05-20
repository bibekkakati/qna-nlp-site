const express = require("express");
const cors = require("cors");
const getAnswer = require("./getAnswer");
const getModel = require("./getModel");

const app = express();
const PORT = 3000;

var model;

// Allow all site's request
app.use(cors());

app.use(express.static("public"));

app.get("/ask", (req, res) => {
	if (!model) {
		return res.send({
			success: false,
			error: "Model is not ready! Please try after sometime.",
		});
	}
	const { question } = req.query;
	if (question) {
		return getAnswer(question, res, model);
	}
	res.send({
		success: false,
		error: "Question is missing!",
	});
});

app.listen(PORT, async (err) => {
	console.info("============================");
	console.info(err || `Server is listening at http://localhost:${PORT}`);
	console.info("============================");
	model = await getModel();
});
