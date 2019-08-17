
fetchAsyncArt()
    .then(data => renderResponse(parseResponse(data)))
    .catch(reason => console.log(reason.message))

async function fetchAsyncInstagram(url) {
    let response = await fetch(url);
    return await response.json();
}

async function fetchAsyncArt() {
    let response = await fetch('https://api.sheety.co/97aa7205-340d-4e01-958c-a28a267f3e3b');
    return await response.json();
}

function renderResponse(artPiece) {
    if (artPiece.description.toUpperCase() === "INSTAGRAM") {
        fetchAsyncInstagram('https://api.instagram.com/oembed/?url=' + artPiece.url + "/&amp;omitscript=true")
            .then(data => document.getElementById('art').innerHTML = data["html"])
            .then(() => loadEmbed())
            .catch(reason => console.log(reason.message));
    }
}

function parseResponse(data) {
   // const source = ["INSTAGRAM", "TWITTER"];
    const source = ["INSTAGRAM"];
    const filteredData = data.filter(function (art) {
        return source.includes(art.description.toUpperCase());
    });
    return filteredData[Math.floor(Math.random() * filteredData.length)];
}

function loadEmbed() {
    window.instgrm.Embeds.process();
}