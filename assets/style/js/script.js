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