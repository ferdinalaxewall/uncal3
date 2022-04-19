$(document).ready(function(){
    $('.element-item').sortable({
        connectWith: '.flow-diagram',
        receive: function (event, ui) {
        }
      }).disableSelection();
      
    $(".elements-list .element-item").draggable({
        connectToSortable : ".flow-diagram",
        helper : "clone",
        revert: "invalid",
        cursorAt: { top: 25, left: 25 }
    }).disableSelection();

    $(".canvas").droppable({
        accept : ".elements-list #sender",
        drop : function(ev, ui){
                var droppedItem = $(ui.draggable).clone();
                var flowDiagram = "<ul class='flow-diagram'></ul><br>";
                $(flowDiagram).insertBefore($(this));   
                setTimeout(function(){
                    sortableFunc();
                    $(".flow-diagram").each(function(i){
                        if ($(".flow-diagram").eq(i).children().hasClass("element-item")) {

                        }else{
                            $(".flow-diagram").eq(i).append(ui.draggable.clone());
                        }
                    });
                }, 100);
        }
    }).disableSelection();

    $("#flow-tab").sortable().disableSelection();

    function sortableFunc(){
        $(".flow-diagram").sortable({
            cursor: "move", 
            cursorAt: { top: 40, left: 50 },
            revert : true,
            placeholder: "element-item-highlight"
        });

    }
    
});