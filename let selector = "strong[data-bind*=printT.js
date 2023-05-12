let selector = "strong[data-bind*=printTimeLeftString]"
function again() {
    setTimeout(try_update_end_time, 1000)
}

function try_update_end_time() {
    let existing = document.querySelector("#end-time");
    if (!existing) {
        let pre = document.querySelector(".progress");
        if (!pre) {
            console.log("no progress element found");
            return again();
        }
        let title = document.createElement("span");
        title.innerText = "Est. End Time";

        pre.parentElement.insertBefore(title, pre);
        let colon = document.createTextNode(" : ");
        pre.parentElement.insertBefore(colon, pre);
        existing = document.createElement("strong");
        existing.setAttribute("id", "end-time");
        pre.parentElement.insertBefore(existing, pre);
        let br = document.createElement("br");
        pre.parentElement.insertBefore(br, pre)
    }
    let timeLeftEle = document.querySelector(selector);
    if (!timeLeftEle) return again();
    let parts = timeLeftEle.innerText.split(":");
    if (parts.length !== 3) return again();
    let [hours, mins, secs] = parts;
    let now = new Date();
    now.setHours(now.getHours() + (+hours));
    now.setMinutes(now.getMinutes() + (+mins));
    now.setSeconds(now.getSeconds() + (+secs));
    let hh = now.getHours();
    let mm = now.getMinutes().toString();
    if (mm.length == 1) {
        mm = "0" + mm;
    }
    let am_pm = "am";
    if (hh > 12) {
        am_pm = "pm";
        hh -= 12
    }
    let end_time = `${hh}:${mm} ${am_pm}`;
    existing.innerText = end_time;
    again();
}

try_update_end_time();
