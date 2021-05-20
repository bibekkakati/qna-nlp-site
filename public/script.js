function main() {
	const question = document.getElementById("question");
	const askBtn = document.getElementById("askBtn");
	const answerDiv = document.getElementById("answerDiv");
	const answer = document.getElementById("answer");
	const error = document.getElementById("error");
	const wait = document.getElementById("wait");
	const url = window.location.href;

	askBtn.onclick = function (e) {
		reset();
		askQuestion();
	};

	function writeAnswer(text) {
		reset();
		if (text) {
			answer.innerHTML = text;
			answerDiv.style.display = "block";
		}
	}

	function askQuestion() {
		const text = question.value;
		if (text) {
			wait.style.display = "block";
			// Ask backend
			fetch(`${url}ask?question=${text}`)
				.then((response) => response.json())
				.then((data) => {
					if (data.success) {
						writeAnswer(data.answer);
					} else {
						showError(data.error);
					}
				})
				.catch((e) => {
					showError(e.message);
				});
		} else {
			showError("Question is required!");
		}
	}

	function showError(msg = "Something went wrong!") {
		reset();
		error.innerHTML = msg;
		error.style.display = "block";
		setTimeout(() => {
			error.style.display = "none";
			error.innerHTML = "";
		}, 10000);
	}

	function reset() {
		wait.style.display = "none";
		error.style.display = "none";
		error.innerHTML = "";
		answerDiv.style.display = "none";
		answer.innerHTML = "";
	}
}
