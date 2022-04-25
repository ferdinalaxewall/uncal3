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
                        console.log("col1: ", $(".flow-diagram .element-box").eq(i).prop("id"));
                        if($(".flow-diagram .element-box").eq(i).prop("id") == 'object-switching'){
                            console.log("col2: ", ui.item.prop("id"));
                            if (ui.item.prop("id") == 'switch-element') {
                            }else{
                                console.log("tos")
                                $(".flow-diagram #object-switching").parent().attr("id", "switch-element")
                                setTimeout(function(){
                                    console.log(ui.item.children().hasClass("switch-flow-diagram"))
                                    $(".flow-diagram #switch-element").each(function(ind){
                                        console.log("ind", ind);
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

    // === JSON TO UI ====
    function addFlow(component){
        console.log("component:", component);
        var flowDiagram = "<ul class='flow-diagram'></ul><br>";
        $(flowDiagram).insertBefore($('.canvas'));
        
        sortableFunc();
        $(".flow-diagram").each(function(i){
            if ($(".flow-diagram").eq(i).children().hasClass("element-item")) {
            }else{
                var clone = $(component).parent().clone();
                $(".flow-diagram").eq(i).append(clone);
            }
        });
    }

    function addComponent(component, i){
        var clone = $(component).parent().clone();
        $($(".flow-diagram").get(i)).append(clone);
    }

    var jsonFlow = [
        {
            "name": "flow1",
            "index": 0,
            "components": [
                {
                    "id": 1,
                    "type": "sender-tcp",
                    "name": "tcp-test",
                    "level": 0,
                    "pid": 0,
                    "index": 0,
                    "properties": {
                        "port": 8080,
                        "name": "xxx",
                        "thread": 1,
                        "keepopen": true,
                        "wait": 60
                    }
                },
                {
                    "id": 2,
                    "type": "receiver-nfs",
                    "name": "nfs-test",
                    "level": 1,
                    "pid": 1,
                    "index": 0,
                    "properties": {
                        "path": "/opt/xxnx", 
                        "polling": 10,
                        "retry": 60, 
                        "filename": "getfucked.3gp"
                    }
                },
                {
                    "id": 3,
                    "type": "receiver-jdbc",
                    "name": "nfs-jdbc",
                    "level": 2,
                    "pid": 1,
                    "index": 0,
                    "properties": {
                        "host": "192.168.1.56",
                        "port": "3306",
                        "username": "sa",
                        "password": "test",
                        "dbname": "databaseku",
                        "dbtype": "mysql",
                        "polling": 20,
                        "retry": 60
                    }
                }
            ]
        },
        {
            "name": "flow2",
            "index": 1,
            "components": [
                {
                    "id": 1,
                    "type": "sender-nfs",
                    "name": "nfs-test",
                    "level": 0,
                    "pid": 0,
                    "index": 0,
                    "properties": {
                        "port": 8080,
                        "name": "xxx",
                        "thread": 1,
                        "keepopen": true,
                        "wait": 60
                    }
                },
                {
                    "id": 2,
                    "type": "object-switching",
                    "name": "my-switching",
                    "level": 1,
                    "pid": 1,
                    "index": 0,
                    "properties": {
                        "switch-case": "object",
                        "if-else": "object",
                        "customization": "java-code"
                    }
                },
                {
                    "id": 3,
                    "type": "receiver-jdbc",
                    "name": "jdbc-mysql",
                    "level": 2,
                    "pid": 2,
                    "index": 0,
                    "properties": {
                        "host": "192.168.1.56",
                        "port": "3306",
                        "username": "sa",
                        "password": "test",
                        "dbname": "databaseku",
                        "dbtype": "mysql",
                        "polling": 20,
                        "retry": 60
                    }
                },
                {
                    "id": 4,
                    "type": "receiver-jdbc",
                    "name": "jdbc-mssql",
                    "level": 2,
                    "pid": 2,
                    "index": 1,
                    "properties": {
                        "host": "192.168.1.39",
                        "port": "1433",
                        "username": "sa",
                        "password": "password",
                        "dbname": "db-server",
                        "dbtype": "mssql",
                        "polling": 20,
                        "retry": 60
                    }
                }
            ]
        }
    ];

    for (let i = 0; i < jsonFlow.length; i++) {
        const flow = jsonFlow[i];
        console.log("flow: ", flow);
        var flow_name = flow.name;
        var type_com0 = flow.components[0].type;
        // console.log("Name Flow", flow_name, ", type_com0: ", type_com0);
        // addFlow('#'+type_com0);

        var components = flow.components;
        for (let j = 1; j < components.length; j++) {
            var component = components[j];
            var type = component.type;
            var name = component.name;

            // console.log("Type_com", type, ", name_ui: ", name, " prop: ", component.properties);
            // addComponent("#" + type, i);
        }
    }

    // == contoh hardcode == 
    // addFlow('#sender-tcp');
    // addComponent("#receiver-tcp", 0);

    // addFlow('#sender-nfs');
    // addComponent("#receiver-nfs", 1);
    
});