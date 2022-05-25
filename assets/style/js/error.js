$(document).ready(function(){
    setInterval(() => {
        $("body").fadeOut();
        setTimeout(() => {
            window.location.href = '/workspace.html';
        }, 250);
    }, 5000);
})