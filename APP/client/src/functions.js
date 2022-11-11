async function postData(url, data){
    let req = await fetch(`/api${url}`, { method: "POST", headers: {'Content-Type': 'application/json'},body:JSON.stringify(data)});
    return req.json();
}

async function getData(url, data){
    let req = await fetch(`/api${url}`, { method: "GET", headers: {'Content-Type': 'application/json'}});
    return req.json();
}

module.exports = {
    postData,
    getData
}