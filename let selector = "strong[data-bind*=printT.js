let selector = "strong[data-bind*=printTimeLeftString]"
function again() {
    setTimeout(try_update_end_time, 1000)
}

function try_update_end_time() {
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
    let container = document.getElementById("sidebar");
    if (!container) {
        console.log(end_time);
        return again()
    };
    container.setAttribute("title", end_time);
    again();
}

try_update_end_time();
