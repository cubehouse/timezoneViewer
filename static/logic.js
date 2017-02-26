// https://github.com/yanatan16/nanoajax
!function(t,e){function n(t){return t&&e.XDomainRequest&&!/MSIE 1/.test(navigator.userAgent)?new XDomainRequest:e.XMLHttpRequest?new XMLHttpRequest:void 0}function o(t,e,n){t[e]=t[e]||n}var r=["responseType","withCredentials","timeout","onprogress"];t.ajax=function(t,a){function s(t,e){return function(){c||(a(void 0===f.status?t:f.status,0===f.status?"Error":f.response||f.responseText||e,f),c=!0)}}var u=t.headers||{},i=t.body,d=t.method||(i?"POST":"GET"),c=!1,f=n(t.cors);f.open(d,t.url,!0);var l=f.onload=s(200);f.onreadystatechange=function(){4===f.readyState&&l()},f.onerror=s(null,"Error"),f.ontimeout=s(null,"Timeout"),f.onabort=s(null,"Abort"),i&&(o(u,"X-Requested-With","XMLHttpRequest"),e.FormData&&i instanceof e.FormData||o(u,"Content-Type","application/x-www-form-urlencoded"));for(var p,m=0,v=r.length;v>m;m++)p=r[m],void 0!==t[p]&&(f[p]=t[p]);for(var p in u)f.setRequestHeader(p,u[p]);return f.send(i),f},e.nanoajax=t}({},function(){return this}());

// setup map
var map = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// map's popup object
var popup = L.popup();

// when the map is clicked, show a popup with lat/long, timezone, and current time
map.on('click', function(e) {
    // fetch timezone data from app /tz POST request
    nanoajax.ajax({url: '/tz', method: 'POST', body: 'lat=' + e.latlng.lat + '&lng=' + e.latlng.lng}, function (code, responseText, request) {
        var body;
        try {
            body = JSON.parse(responseText);
        } catch(e) {
            body = {error: "Failed to parse response text"};
        }

        if (body.error) {
            return error(body.error);
        }

        popup
            .setLatLng(e.latlng)
            .setContent(`Latitude: ${body.latitude}<br />Longitude: ${body.longitude}<br />Timezone: ${body.timezone}<br />Current Time: ${body.now}`)
            .openOn(map);
    });
});

// helper function to move and zoon to a spot on the map
function moveMap(lat, lng) {
    map.panTo({lat: lat, lng: lng});
    map.setZoom(16);
}

// search the map for a string
function search(text) {
    nanoajax.ajax({
        url: "https://nominatim.openstreetmap.org/search/" + text + "?format=json"
    }, function(code, responseText) {
        var body;
        try {
            body = JSON.parse(responseText);
        } catch(e) {
            body = {error: "Failed to parse response text"};
        }

        if (body.error) {
            return error(body.error);
        }

        var searchArea = document.getElementById("searchresults");
        searchArea.innerHTML = "<ul>";

        for(var i=0, result; result=body[i++];) {
            searchArea.innerHTML += "<li><a href='#' onclick='moveMap(" + result.lat + ", " + result.lon + "); return false;'>" + result.display_name + "</a></li>";
        }

        searchArea.innerHTML += "</ul>";
    });
}
// when clicking search, send input value to our search function
document.getElementById("search").onclick = function() {
    search(document.getElementById("mapsearch").value);

    // return false to stop form sending to self
    return false;
};

// display an error message if anything goes wrong
function error(errorStr) {
    $("#error").show().text(errorStr);
}
// clear error message when clicked
document.getElementById("error").onclick = function() {
    $("#error").hide().text("");
}