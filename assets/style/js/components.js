$(document).ready(function(){
    // componen
    $("#allElements").load("allElements.html");

    $("#close-properties").click(function(e){
        $(".properties-content").empty();
        $("#properties-tab .tab-name").has($(this)).toggle();
        $("#properties-tab .tab-name").has($(this)).removeClass("displayed");
        setTimeout(function(){
            $("#properties-tab .displayed").first().addClass("active")
        },100);
    });

    $("#close-outline").click(function(e){
        $(".outline-content").empty();
        $("#flow-map-tab .tab-name").has($(this)).toggle();
        $("#flow-map-tab .tab-name").has($(this)).removeClass("displayed");
        setTimeout(function(){
            $("#flow-map-tab .displayed").first().addClass("active")
        },100);
    });

    $("#flow-tab .close-tab").click(function(){
        $(this).parent().remove();
    });

    $(".category-button").click(function(){
        $(".elements-list .element-item").hide();

        if ($(this).prop("id") == 'all-category') {
            $(".elements-list .element-item").show();
        }
        else if ($(this).prop("id") == 'sender-category') {
            $(".elements-list .element-item#sender").show();
        }
        else if ($(this).prop("id") == 'receiver-category') {
            $(".elements-list .element-item#receiver").show();
        }
        else if ($(this).prop("id") == 'statement-category') {
            $(".elements-list .element-item#statement").show();
        }
        else{
            $(".elements-list .element-item").hide();
        }
    });

    $(".elements-list .element-item").click(function(e){
        if($(this).children().prop("id") === "sender-tcp"){
                console.log("sender-tcp");
                $("#properties").empty();
                $("#properties").load("components/sender-tcp.html");
        }
        else if($(this).children().prop("id") === "receiver-tcp"){
                console.log("receiver-tcp");
                $("#properties").empty();
                $("#properties").load("components/receiver-tcp.html");
        }
        else if($(this).children().prop("id") === "sender-rest"){
                console.log("sender-rest");
                $("#properties").empty();
                $("#properties").load("components/sender-rest.html");
        }
        else if($(this).children().prop("id") === "receiver-rest"){
                console.log("receiver-rest");
                $("#properties").empty();
                $("#properties").load("components/receiver-rest.html");
        }
        else if($(this).children().prop("id") === "sender-nfs"){
                console.log("sender-nfs");
                $("#properties").empty();
                $("#properties").load("components/sender-nfs.html");
        }
        else if($(this).children().prop("id") === "receiver-nfs"){
                console.log("receiver-nfs");
                $("#properties").empty();
                $("#properties").load("components/receiver-nfs.html");
        }
        else if($(this).children().prop("id") === "sender-ftp"){
                console.log("sender-ftp");
                $("#properties").empty();
                $("#properties").load("components/sender-ftp.html");
        }
        else if($(this).children().prop("id") === "receiver-ftp"){
                console.log("receiver-ftp");
                $("#properties").empty();
                $("#properties").load("components/receiver-ftp.html");
        }
        else if($(this).children().prop("id") === "sender-sftp"){
                console.log("sender-sftp");
                $("#properties").empty();
                $("#properties").load("components/sender-sftp.html");
        }
        else if($(this).children().prop("id") === "receiver-sftp"){
                console.log("receiver-sftp");
                $("#properties").empty();
                $("#properties").load("components/receiver-sftp.html");
        }
        else if($(this).children().prop("id") === "sender-imap"){
                console.log("sender-imap");
                $("#properties").empty();
                $("#properties").load("components/sender-imap.html");
        }
        else if($(this).children().prop("id") === "receiver-smtp"){
                console.log("receiver-smtp");
                $("#properties").empty();
                $("#properties").load("components/receiver-smtp.html");
        }
        else if($(this).children().prop("id") === "sender-jdbc"){
                console.log("sender-jdbc");
                $("#properties").empty();
                $("#properties").load("components/sender-jdbc.html");
        }
        else if($(this).children().prop("id") === "receiver-jdbc"){
                console.log("receiver-jdbc");
                $("#properties").empty();
                $("#properties").load("components/receiver-jdbc.html");
        }
        else if($(this).children().prop("id") === "sender-mqtt"){
                console.log("sender-mqtt");
                $("#properties").empty();
                $("#properties").load("components/sender-mqtt.html");
        }
        else if($(this).children().prop("id") === "receiver-mqtt"){
                console.log("receiver-mqtt");
                $("#properties").empty();
                $("#properties").load("components/receiver-mqtt.html");
        }
        
        else{
            console.log("item click not matched")
        }
    });

   
});