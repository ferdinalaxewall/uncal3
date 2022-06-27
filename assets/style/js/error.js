$(document).ready(function(){
    setInterval(() => {
        $("body").fadeOut();
        setTimeout(() => {
            window.location.href = '/bpmn';
        }, 250);
    }, 5000);
})