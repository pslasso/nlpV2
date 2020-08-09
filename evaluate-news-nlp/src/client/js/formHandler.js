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


    const updateUI = (analyse) => {
        console.log("UI=> ", analyse)
        document.getElementById('results').innerHTML = `Your imput has:
    Score tag of: ${analyse.score_tag} -
    Confidence: ${analyse.confidence} -
    Agreement: ${analyse.agreement} -
    Irony: ${analyse.irony}`;
    }

}

export {
    handleSubmit
}