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
});