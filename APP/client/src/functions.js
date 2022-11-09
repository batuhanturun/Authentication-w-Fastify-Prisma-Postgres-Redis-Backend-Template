export default async function postData(url,data){
    let req = await fetch(`/api${url}`, { method: "POST", headers: {'Content-Type': 'application/json'},body:JSON.stringify(data)});
    return req.json();
}