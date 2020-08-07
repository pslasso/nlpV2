let baseURL = 'https://api.meaningcloud.com/sentiment-2.1'
let apiKey = '?key=57830cba1561227a17928a4120c4e35b';
let lang = '&lang=en'

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
            console.log(sentiment);
            postData('/analyse', { formText: formText })
            updateUI()
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

const updateUI = async() => {
    const req = await fetch('/all')
    try {
        const allData = await req.json()
        let i = 0;
        document.getElementById('results').innerHTML = allData.score_tag;
        console.log(allData);
    } catch (error) {
        console.log('error', error)
    }
}

export { handleSubmit }