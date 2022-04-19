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

    $("#sender-tcp").click(function(e){
        console.log("sender-tcp");
        $("#properties").empty();
    });
    
    $("#receiver-tcp").click(function(e){
        console.log("receiver-tcp");
        $("#properties").empty();
        $("#properties").load("components/receiver-tcp.html");
    });
    
    $("#sender-rest").click(function(e){
        console.log("sender-rest"); 
        $("#properties").empty();
        $("#properties").load("components/sender-rest.html");
    });
    
    $("#receiver-rest").click(function(e){
        console.log("receiver-rest");
        $("#properties").empty();
        $("#properties").load("components/receiver-rest.html");
    });
    
    $("#sender-nfs").click(function(e){
        console.log("sender-nfs");
        $("#properties").empty();
        $("#properties").load("components/sender-nfs.html");
    });
    
    $("#receiver-nfs").click(function(e){
        console.log("receiver-nfs");
        $("#properties").empty();
        $("#properties").load("components/receiver-nfs.html");
    });
    
    $("#sender-ftp").click(function(e){
        console.log("sender-ftp");
        $("#properties").empty();
        $("#properties").load("components/sender-ftp.html");
    });
    
    $("#receiver-ftp").click(function(e){
        console.log("receiver-ftp");
        $("#properties").empty();
        $("#properties").load("components/receiver-ftp.html");
    });
    
    $("#sender-sftp").click(function(e){
        console.log("sender-sftp");
        $("#properties").empty();
        $("#properties").load("components/sender-sftp.html");
    });
    
    $("#receiver-sftp").click(function(e){
        console.log("receiver-sftp");
        $("#properties").empty();
        $("#properties").load("components/receiver-sftp.html");
    });
    
    $("#sender-imap").click(function(e){
        console.log("sender-imap");
        $("#properties").empty();
        $("#properties").load("components/sender-imap.html");
    });
    
    $("#receiver-smtp").click(function(e){
        console.log("receiver-smtp");
        $("#properties").empty();
        $("#properties").load("components/receiver-smtp.html");
    });
    
    $("#sender-jdbc").click(function(e){
        console.log("sender-jdbc");
        $("#properties").empty();
        $("#properties").load("components/sender-jdbc.html");
    });
    
    $("#receiver-jdbc").click(function(e){
        console.log("receiver-jdbc");
        $("#properties").empty();
        $("#properties").load("components/receiver-jdbc.html");
    });
    
    $("#sender-mqtt").click(function(e){
        console.log("sender-mqtt");
        $("#properties").empty();
        $("#properties").load("components/sender-mqtt.html");
    });
    
    $("#receiver-mqtt").click(function(e){
        console.log("receiver-mqtt");
        $("#properties").empty();
        $("#properties").load("components/receiver-mqtt.html");
    });
});