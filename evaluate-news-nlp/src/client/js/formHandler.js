async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value;

    /*api call*/
    await fetch("http://localhost:8081/analyse", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formText),
    });


    const sentiment = await fetch("http://localhost:8081/all");
    const sentimentJson = await sentiment.json();


    const updateUI = (sentimentJson) => {
        console.log("UI=> ", sentimentJson)
        document.getElementById('results').innerHTML = `Here is the result of the analysis:
    Score tag of: ${sentimentJson.score_tag} -
    Confidence: ${sentimentJson.confidence} -
    Agreement: ${sentimentJson.agreement} -
    Irony: ${sentimentJson.irony}`;
    }
}

export {
    handleSubmit
}