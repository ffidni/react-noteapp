import { Callbacks } from "jquery";

export function generateParams(data){
    var params = new Object();

    Object.keys(data).map((key) => {
        params[key] = data[key];
    });


    let urlEncodedDataPairs = [];
    Object.keys(params).map((param) => {
        urlEncodedDataPairs.push(encodeURIComponent(param)+'='+encodeURIComponent(params[param]));
    });

    return urlEncodedDataPairs.join("&");
    
}

export default function request({url, type, data, getStatus}) {
    data = generateParams(data);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                getStatus(this.responseText);
            } else {
                getStatus('{"status": "failed"}');
            }
        }
    });
    
    xhr.open(type, url);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "5d272f8d-621f-1762-dac3-3d7ea8cd885d");
    xhr.send(data);
}

