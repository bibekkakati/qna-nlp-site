const getPassage = require("./getPassage");

const getAnswer = async (question, res, model) => {
	// Finding the answers
	const passage = await getPassage(question);
	if (passage) {
		console.log("Processing...");
		const answers = await model.findAnswers(question, passage);
		if (answers && answers.length > 0) {
			return res.send({
				success: true,
				answer: answers[0].text,
			});
		}
	}
	return res.send({
		success: false,
		error: "Couldn't find any answer!",
	});
};

module.exports = getAnswer;
