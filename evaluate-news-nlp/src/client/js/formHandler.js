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
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ formText: formText }),
    });


    //Fetch 
    const sentiment = await fetch("http://localhost:8081/all");
    const sentimentJson = await sentiment.json();

    console.log(sentiment);
    console.log(sentimentJson);


    const updateUI = (analyse) => {
        console.log("UI=> ", analyse)
        document.getElementById('results').innerHTML = `Here is the result of the analysis:
    Score tag: ${analyse.score_tag} -
    Confidence: ${analyse.confidence} -
    Agreement: ${analyse.agreement} -
    Irony: ${analyse.irony}`;
    }
}

export {
    handleSubmit
}