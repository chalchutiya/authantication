function myalert(msg = "Default Message!", time = 3000) {
    const alertbox = document.createElement("div");
    alertbox.innerHTML = msg;
    alertbox.className = "alertbox";
    const body = document.querySelector('body')
    body.appendChild(alertbox);
    setTimeout(() => {
        alertbox.remove();
    }, time);
}
