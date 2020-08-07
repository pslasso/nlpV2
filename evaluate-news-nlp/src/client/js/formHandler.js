let baseURL = 'https://api.meaningcloud.com/sentiment-2.1'
let apiKey = '?key=57830cba1561227a17928a4120c4e35b';
let lang = '&lang=en'

let textarea = document.getElementById('name');
textarea.addEventListener("keydown", autosize);

function autosize() {
    var el = this;
    setTimeout(function() {
        el.style.cssText = 'height:auto; padding:0';
        el.style.cssText = 'height:' + el.scrollHeight + 'px';
    }, 0);
}

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value

    /*api call*/
    analyse(`${baseURL}${apiKey}${lang}&txt=${formText}`)
        .then(function(data) {
            console.log(data)
            let score_tag = data.score_tag;
            let confidence = data.confidence;
            let agreement = data.agreement;
            let irony = data.irony;
            let sentiment = (`${score_tag} ${confidence} ${agreement} ${irony}`);
            updateUI(data)
            console.log(sentiment);
            postData('/analyse', { formText: formText })

        })

}

const postData = async(url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await res.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }

}

const analyse = async(url) => {
    const res = await fetch(url)
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log("error", error);
    }

}

const updateUI = async(newData) => {
    console.log("UI=> ", newData)
    document.getElementById('results').innerHTML = `Your imput has:
    Score tag of: ${newData.score_tag} -
    Confidence: ${newData.confidence} -
    Agreement: ${newData.agreement} -
    Irony: ${newData.irony}`;


}

export {
    autosize,
    handleSubmit
}