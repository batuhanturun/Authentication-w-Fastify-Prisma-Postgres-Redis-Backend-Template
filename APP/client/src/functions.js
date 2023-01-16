async function getData(url) {
    let req = await fetch(`/api${url}`, { method: "GET", headers: { 'Content-Type': 'application/json' } });
    return req.json();
}

async function postData(url, data) {
    let req = await fetch(`/api${url}`, { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    return req.json();
}

async function patchData(url, data) {
    let req = await fetch(`/api${url}`, { method: "PATCH", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    return req.json();
}

async function deleteData(url) {
    let req = await fetch(`/api${url}`, { method: "DELETE", headers: { 'Content-Type': 'application/json' } });
    return req.json();
}

module.exports = {
    postData,
    getData,
    patchData,
    deleteData
}