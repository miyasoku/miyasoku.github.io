// Define the three different personas
const personas = {
	MELCHIOR: {
	  role: "Scientist",
	  decide: function(question) {
		// Melchior focuses on logical and rational analysis
		return {
		  decision: Math.random() > 0.5 ? "承認" : "否定",
		  reason: "科学的根拠と論理的な推論に基づいて判断しました。"
		};
	  }
	},
	BALTHASAR: {
	  role: "Mother",
	  decide: function(question) {
		// Balthasar bases her decision on practical experience and empathy
		return {
		  decision: Math.random() > 0.5 ? "承認" : "否定",
		  reason: "母親としての経験に基づき、家族の幸福と安全を考慮し判断しました。"
		};
	  }
	},
	CASPER: {
	  role: "Unmarried Woman",
	  decide: function(question) {
		// Casper makes decisions based on idealism and youthful optimism
		return {
		  decision: Math.random() > 0.5 ? "承認" : "否定",
		  reason: "理想と希望に基づき、より良い未来を目指して判断しました。"
		};
	  }
	}
  };

  // Function to get decisions from all personas and conclude
  function getConsensus(question) {
	const decisions = [];
	let resultText = "";

	for (let persona in personas) {
	  const result = personas[persona].decide(question);
	  resultText += `${persona} (${personas[persona].role}): ${result.decision} - ${result.reason}
`;
	  decisions.push({ persona, decision: result.decision });
	}

	// Update the decision boxes
	decisions.forEach(d => {
	  const box = document.getElementById(d.persona.toLowerCase());
	  box.innerText = `${d.persona}-${d.persona === "MELCHIOR" ? 1 : d.persona === "BALTHASAR" ? 2 : 3}
${d.decision}`;
	  if (d.decision === "承認") {
		box.classList.add("approved");
	  } else {
		box.classList.remove("approved");
	  }
	});

	// Count the number of approvals and denials
	const approvalCount = decisions.filter(d => d.decision === "承認").length;
	const denialCount = decisions.filter(d => d.decision === "否定").length;

	// Determine the majority decision
	const consensus = approvalCount > denialCount ? "可決" : "否決";
	resultText += `
合議結果: ${approvalCount}対${denialCount}で${consensus}`;

	// Display the result
	document.getElementById("result").innerText = resultText;
  }

  // Function to reset the result
  function resetResult() {
	document.getElementById("result").innerText = "";
	document.getElementById("balthasar").innerText = "BALTHASAR-2";
	document.getElementById("melchior").innerText = "MELCHIOR-1";
	document.getElementById("casper").innerText = "CASPER-3";
	document.querySelectorAll(".decision-box").forEach(box => box.classList.remove("approved"));
  }