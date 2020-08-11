function updateUI(result) {
    // selecting the result container from DOM
    const results = document.getElementById("results");
    resultContainer.innerHTML = `
    Agreement: ${result.agreement}
    Confidence: ${result.confidence}
    Irony: ${result.irony}
    Score Tag: ${result.score_tag}
    Subjectivity: ${result.subjectivity}`;
}

export {
    updateUI
}