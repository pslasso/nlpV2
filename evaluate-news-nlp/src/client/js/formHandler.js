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


    //Fetch data
    const sentiment = await fetch("http://localhost:8081/all");
    const sentimentJson = await sentiment.json();

    console.log(sentiment);
    console.log(sentimentJson);



    //Update UI
    const updateUI = async(analyse) => {
        console.log("UI=> ", analyse)
        document.getElementById('results').innerHTML = `Your imput has:
        Score tag of: ${analyse.score_tag} -
        Confidence: ${analyse.confidence} -
        Agreement: ${analyse.agreement} -
        Irony: ${analyse.irony}`;
    }
    updateUI(data);
}

export {
    handleSubmit
}