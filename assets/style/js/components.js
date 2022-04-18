$(document).ready(function(){
    // componen
    $("#allElements").load("allElements.html");
    
    $("#sender-tcp").click(function(e){
        console.log("sender-tcp");
        $("#properties").empty();
        $("#properties").load("components/sender-tcp.html");
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