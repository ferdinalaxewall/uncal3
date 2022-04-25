$(document).ready(function(){
      
    
    $(".element-item").draggable({
        connectToSortable : ".flow-diagram, .switch-flow-diagram",
        containment : "#flow-container",
        helper : "clone",
        revert: "invalid",
        cursorAt: { top: 25, left: 25 },
        scroll : false,
        // stop : function(ev, ui){
        //     $(".flow-diagram").each(function(inde){

        //         console.log($(".flow-diagram").width());
        //         console.log($("#flow-container").width());
                     
        // }
    }).disableSelection();

    $("#flow-container").css({
        "background-color" : "reds"
    })

    $(".canvas").droppable({
        accept : ".elements-list #sender",
        scroll : true,
        drop : function(ev, ui){
                var droppedItem = $(ui.draggable).clone();
                var flowDiagram = "<ul class='flow-diagram'></ul><br>";
                $(flowDiagram).insertBefore($(this));
                setTimeout(function(){
                    $("#properties").empty();
                    $("#properties").load("components/" + ui.draggable.children().attr("id") + ".html");
                    sortableFunc();
                    $(".flow-diagram").each(function(i){
                        if (!$(".flow-diagram").eq(i).children().hasClass("element-item")) {
                            $(".flow-diagram").eq(i).append(ui.draggable.clone());
                            setTimeout(function(){
                                $(".flow-diagram").eq(i).children().first().addClass("element-item-disabled");
                                $(".flow-diagram .element-box").each(function(i){
                                    if (!$(this).attr("onclick")) {
                                        $(this).attr("onclick", "focusElement(this)");
                                    }
                                });
                            },200);
                        }
                    });
                }, 100);
        }
    }).disableSelection();

    $("#flow-tab").sortable().disableSelection();

    function sortableFunc(){
        var adding = 0

        $(".flow-diagram").sortable({
            items : ".element-item:not(.element-item-disabled)",
            scrollSensitivity: 100,
            cursor: "move", 
            cursorAt: { top: 40, left: 50 },
            revert : true,
            placeholder: "element-item-highlight",
            zIndex : -2,
            receive : function(ev, ui){
                $(".flow-diagram .element-box").each(function(i){
                    if (!$(this).attr("onclick")) {
                        $(this).attr("onclick", "focusElement(this)");
                    }
                });
            },
            update  : function(ev, ui){
                setTimeout(function(){
                    $(".flow-diagram .element-item").each(function(i){
                        if($(".flow-diagram .element-box").eq(i).prop("id") == 'switch'){
                            if (ui.item.prop("id") == 'switch-element') {
                            }else{
                                console.log("tos")
                                $(".flow-diagram #switch").parent().attr("id", "switch-element")
                                setTimeout(function(){
                                    console.log(ui.item.children().hasClass("switch-flow-diagram"))
                                    $(".flow-diagram #switch-element").each(function(ind){
                                        $(this).eq(ind).css({
                                            "width" : "auto",
                                            "height" : "auto"
                                        })
                                        if($(this).eq(ind).children().hasClass("switch-flow-diagram")){
                                            console.log("ada swf")
                                        }else{
                                            $(this).eq(ind).append("<ul class='switch-flow-diagram'></ul>")
                                            console.log($(this).eq(ind));
                                        }
                                    });
                                    // if (ui.item.prop("id") == 'switch-element'.children().hasClass("switch-flow-diagram")) {
                                    //     console.log("ada swf")
                                    // } else {
                                    //     console.log("tidak ada swf")
                                    // }
                                    switchFlowFunc();
                            }, 100);
                            }
                        }
                    });
                },50);
            }
        }).disableSelection();

    }
    
    function switchFlowFunc(){
        $(".switch-flow-diagram").sortable({
            placeholder: "element-item-highlight",
            cursor: "move", 
            cursorAt: { top: 40, left: 50 },
            revert : true,
        });
    }
    
});