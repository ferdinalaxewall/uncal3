$(document).ready(function(){
    $("#flow-tab .tab-name").click(function(e){
        $("#flow-tab .tab-name").removeClass("active");

        var $this = $(this);
        if (!$this.hasClass("active")) {
            $this.addClass("active");
        }

        e.preventDefault();

    });
    
    $("#palette-tab .tab-name").click(function(e){
        $("#palette-tab .tab-name").removeClass("active");

        var $this = $(this);
        if (!$this.hasClass("active")) {
            $this.addClass("active");
        }

        e.preventDefault();
        
    });
    
    $(".category-button") .click(function(e){
        $(".category-button").removeClass("active");
        
        var $this = $(this);
        if (!$this.hasClass("active")) {
            $this.addClass("active");
        }
    
        e.preventDefault();
        
    });

    $("#properties-tab .tab-name").click(function(e){
        $("#properties-tab .tab-name").removeClass("active");

        var $this = $(this);
        if (!$this.hasClass("active")) {
            $this.addClass("active");
        }

        e.preventDefault();

    });

    $("#flow-map-tab .tab-name").click(function(e){
        $("#flow-map-tab .tab-name").removeClass("active");

        var $this = $(this);
        if (!$this.hasClass("active")) {
            $this.addClass("active");
        }

        e.preventDefault();

    });

    $("#main-menu .menu-name").click(function(e){
        $("#main-menu .menu-name").removeClass("active");

        var $this = $(this);
        if (!$this.hasClass("active")) {
            $this.addClass("active");
        }

        e.preventDefault();

    });

    $("#sub-main-menu .menu-name").click(function(e){
        $("#sub-main-menu .menu-name").removeClass("active");

        var $this = $(this);
        if (!$this.hasClass("active")) {
            $this.addClass("active");
        }

        e.preventDefault();

    });
    
    $("#properties-group .list-item").click(function(e){
        $(this).toggleClass("active");
    });
    
    $("#flow-map-group .list-item").click(function(e){
        $(this).toggleClass("active");
    });

    $(".list-sub-item").parent().addClass("has-child");

});

function focusElement(e) {
    $(".flow-diagram .element-item, .flow-diagram .element-box").removeClass("focus");
    setTimeout(function(){
      $(e).toggleClass("focus")
      $(e).parent().toggleClass("focus");
    }, 1);
    
        if($(e).prop("id") === "sender-tcp"){
                console.log("sender-tcp");
                $("#properties").empty();
                $("#properties").load("components/sender-tcp.html");
        }
        else if($(e).prop("id") === "receiver-tcp"){
                console.log("receiver-tcp");
                $("#properties").empty();
                $("#properties").load("components/receiver-tcp.html");
        }
        else if($(e).prop("id") === "sender-rest"){
                console.log("sender-rest");
                $("#properties").empty();
                $("#properties").load("components/sender-rest.html");
        }
        else if($(e).prop("id") === "receiver-rest"){
                console.log("receiver-rest");
                $("#properties").empty();
                $("#properties").load("components/receiver-rest.html");
        }
        else if($(e).prop("id") === "sender-nfs"){
                console.log("sender-nfs");
                $("#properties").empty();
                $("#properties").load("components/sender-nfs.html");
        }
        else if($(e).prop("id") === "receiver-nfs"){
                console.log("receiver-nfs");
                $("#properties").empty();
                $("#properties").load("components/receiver-nfs.html");
        }
        else if($(e).prop("id") === "sender-ftp"){
                console.log("sender-ftp");
                $("#properties").empty();
                $("#properties").load("components/sender-ftp.html");
        }
        else if($(e).prop("id") === "receiver-ftp"){
                console.log("receiver-ftp");
                $("#properties").empty();
                $("#properties").load("components/receiver-ftp.html");
        }
        else if($(e).prop("id") === "sender-sftp"){
                console.log("sender-sftp");
                $("#properties").empty();
                $("#properties").load("components/sender-sftp.html");
        }
        else if($(e).prop("id") === "receiver-sftp"){
                console.log("receiver-sftp");
                $("#properties").empty();
                $("#properties").load("components/receiver-sftp.html");
        }
        else if($(e).prop("id") === "sender-imap"){
                console.log("sender-imap");
                $("#properties").empty();
                $("#properties").load("components/sender-imap.html");
        }
        else if($(e).prop("id") === "receiver-smtp"){
                console.log("receiver-smtp");
                $("#properties").empty();
                $("#properties").load("components/receiver-smtp.html");
        }
        else if($(e).prop("id") === "sender-jdbc"){
                console.log("sender-jdbc");
                $("#properties").empty();
                $("#properties").load("components/sender-jdbc.html");
        }
        else if($(e).prop("id") === "receiver-jdbc"){
                console.log("receiver-jdbc");
                $("#properties").empty();
                $("#properties").load("components/receiver-jdbc.html");
        }
        else if($(e).prop("id") === "sender-mqtt"){
                console.log("sender-mqtt");
                $("#properties").empty();
                $("#properties").load("components/sender-mqtt.html");
        }
        else if($(e).prop("id") === "receiver-mqtt"){
                console.log("receiver-mqtt");
                $("#properties").empty();
                $("#properties").load("components/receiver-mqtt.html");
        }
        
        else{
            console.log("item click not matched")
        }
    // });
    
    $(document).keydown(function(e){
      var key = (e.keyCode ? e.keyCode : e.which);
      if (key === 8) {
        $(".element-item.focus").remove();
        $("#properties").empty();
        
        if ($(".flow-diagram").children().length == 0) {
          $(".flow-diagram, br").remove();
        }
      }
    });
   
    $(document).click(function(a){
      if (!e.contains(a.target)) {
        $(".flow-diagram .element-item, .flow-diagram .element-box").removeClass("focus");
      }
    });
}
