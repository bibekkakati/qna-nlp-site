require("@tensorflow/tfjs");
const tf = require("@tensorflow/tfjs-node");
const qna = require("@tensorflow-models/qna");

const getModel = async () => {
	console.info("============================");
	console.info("Preparing the model. Please wait!");
	console.info("============================");
	try {
		const model = await qna.load();
		console.info("Model is ready.");
		console.info("============================");
		return model;
	} catch (error) {
		console.info("============================");
		console.info("Failed to fetch model.");
		console.info("============================");
		console.error(error.message);
		console.info("============================");
		return null;
	}
};

module.exports = getModel;
