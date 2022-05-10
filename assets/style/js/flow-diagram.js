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
    var switchUl = "<ul class='switch-flow-diagram ui-sortable'></ul>";

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
                                            $(this).eq(ind).append(switchUl);
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
    function addFlow(component, data_id){
        var flowDiagram = "<ul class='flow-diagram'></ul><br>";
        $(flowDiagram).insertBefore($('.canvas'));
        
        sortableFunc();
        $(".flow-diagram").each(function(i){
            if ($(".flow-diagram").eq(i).children().hasClass("element-item")) {
            }else{
                var clone = $(component).parent().clone();
                $(clone).addClass('element-item-disabled');
                $(clone).attr('data_id', data_id);
                $(clone).find('a').attr('onclick', 'focusElement(this)');
                $(".flow-diagram").eq(i).append(clone);
            }
        });
    }

    function addComponent(component, i, data_id){
        var clone = $(component).parent().clone();
        $(clone).attr('style', 'width: auto; height: auto;');
        $(clone).attr('data_id', data_id);
        $(clone).find('a').attr('onclick', 'focusElement(this)');
        $($(".flow-diagram").get(i)).append(clone);
    }

    function addSwitch(component, i, data_id){
        var clone = $(component).parent().clone();
        $(clone).attr('id', 'switch-element');
        $(clone).attr('style', 'width: auto; height: auto;');
        $(clone).attr('data_id', data_id);
        $(clone).find('a').attr('onclick', 'focusElement(this)');
        var cloneFinal = $(clone).append(switchUl);
        $($(".flow-diagram").get(i)).append(cloneFinal);
    }

    function addSwitchItem(component, switch_id, idSwitch){
        var clone = $(component).parent().clone();
        $(clone).attr('data_id', idSwitch);
        $('[data_id="'+ switch_id +'"]').find('ul').append(clone);
    }

    var jsonData = [
        {
            "name": "flow1",
            "index": 0,
            "components": [
                {
                    "id": "0-1",
                    "type": "sender-tcp",
                    "name": "tcp-test",
                    "level": 0,
                    "pid": "0-0",
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
                    "id": "0-2",
                    "type": "receiver-nfs",
                    "name": "nfs-test",
                    "level": 1,
                    "pid": "0-1",
                    "index": 0,
                    "properties": {
                        "path": "/opt/xxnx", 
                        "polling": 10,
                        "retry": 60, 
                        "filename": "getfucked.3gp"
                    }
                },
                {
                    "id": "0-3",
                    "type": "receiver-jdbc",
                    "name": "nfs-jdbc",
                    "level": 2,
                    "pid": "0-2",
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
                    "id": "1-1",
                    "type": "sender-nfs",
                    "name": "nfs-test",
                    "level": 0,
                    "pid": "1-0",
                    "index": 0,
                    "properties": {
                        "path": "/opt/hamster/video",
                        "polling": 10,
                        "retry": 60,
                        "filename": "video.mp4",
                        "fileEvent": 2,
                        "folderName": "assets",
                    }
                },
                {
                    "id": "1-2",
                    "type": "object-switching",
                    "name": "my-switching",
                    "level": 1,
                    "pid": "1-1",
                    "index": 0,
                    "properties": {
                        "switch-case": "object",
                        "if-else": "object",
                        "customization": "java-code"
                    },
                    "components": [
                        {
                            "id": "1-2-1",
                            "type": "receiver-jdbc",
                            "name": "jdbc-mysql",
                            "level": 0,
                            "pid": "1-2",
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
                            "id": "1-2-2",
                            "type": "receiver-jdbc",
                            "name": "jdbc-mssql",
                            "level": 0,
                            "pid": "1-2",
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
                        },
                        {
                            "id": "1-2-3",
                            "type": "receiver-ftp",
                            "name": "ftp-rec",
                            "level": 1,
                            "pid": "1-2-1",
                            "index": 0,
                            "properties": {
                                "path": "/opt/xfantasy/assets",
                                "polling": 20,
                                "retry": 60,
                                "ip": "192.168.1.56",
                                "port": 21,
                                "username" : "testuser",
                                "password" : "testing111",
                                "ssl": true,
                                "explicit": false,
                                "filename": "lolz"
                            }
                        },
                    ],
                },
                {
                    "id": "1-3",
                    "type": "receiver-ftp",
                    "name": "ftp-test",
                    "level": 2,
                    "pid": "1-2",
                    "index": 0,
                    "properties": {
                        "path": "/home/nudetube/img",
                        "polling": 20,
                        "retry": 60,
                        "ip": "192.168.1.666",
                        "port": 21,
                        "username" : "admin",
                        "password" : "1234",
                        "ssl": false,
                        "explicit": true,
                        "filename": "finalCrime.img"
                    }
                },
            ],
        }
    ];

    // localStorage
    var getLocal = localStorage.getItem("jsonFlow");
    console.log("getLocal: ", getLocal);
    if(getLocal == "" || getLocal == null /* || getLocal == "[]" */){
        console.log("empty");
        localStorage.setItem("jsonFlow", JSON.stringify(jsonData));
    } 

    var jsonFlow = JSON.parse(localStorage.getItem("jsonFlow"));

    // ===== (JSON TO UI) BACA CARA FLAT ===
    for (let i = 0; i < jsonFlow.length; i++) {
        const flow = jsonFlow[i];
        var flow_name = flow.name;
        var type_com0 = flow.components[0].type;
        var id_com0 = flow.components[0].id;
        addFlow('#'+type_com0, id_com0);

        var components = flow.components;
        var firstCompId = components[0].id;
        console.log("components", components);
        console.log("firstCompId:", firstCompId);
        recurComp(components, firstCompId, i);
    }

    // ===== (JSON TO UI) BACA CARA RECURSIVE ===
    // for (let i = 0; i < jsonFlow.length; i++) {
    //     const flow = jsonFlow[i];
    //     var flow_name = flow.name;
    //     var type_com0 = flow.components[0].type;
    //     var id_com0 = flow.components[0].id;
    //     addFlow('#'+type_com0, id_com0);

    //     var components = flow.components;
    //     var firstCompId = components[0].id;
    //     // console.log("components", components);
    //     // console.log("firstCompId:", firstCompId);
    //     recurComp(components, firstCompId, i);
    // }

    function recurComp(components, parent_id, indexFlow){
        for (let j = 1; j < components.length; j++) {
            var component = components[j];
            var level = component.level;
            var name = component.name;
            var id = component.id;
            var pid = component.pid;
            var type = component.type;

            if(pid == parent_id){
                // console.log("type: ", type, "data_id", id, "indexFlow", indexFlow);
                
                // selain component switch
                if(type != 'object-switching'){
                    addComponent("#" + type, indexFlow, id);
                } else { // component switch
                    addSwitch("#object-switching", indexFlow, id);

                    // switch components child
                    var componSwitchList = component.components;
                    for (let k = 0; k < componSwitchList.length; k++) {
                        var componSwitch = componSwitchList[k];
                        var levelSwitch = componSwitch.level;
                        var nameSwitch = componSwitch.name;
                        var idSwitch = componSwitch.id;
                        var pidSwitch = componSwitch.pid;
                        var typeSwitch = componSwitch.type;
                        // console.log("nameSwitch: ", nameSwitch, "typeSwitch", typeSwitch, "idSwitch", idSwitch);

                        if(id == pidSwitch){
                            addSwitchItem("#"+typeSwitch, id, idSwitch);
                        }
                    }
                }

                recurComp(components, id, indexFlow);
            }
        }
    }

    // == contoh hardcode 2 flow polos == 
    // addFlow('#sender-tcp');
    // addComponent("#receiver-tcp", 0);

    // addFlow('#sender-nfs');
    // addComponent("#receiver-nfs", 1);

    // == contoh hardcode 1 flow switch == 
    // addFlow('#sender-tcp');
    // var data_id = 0 + "_" + 1;
    // addSwitch("#object-switching", 0, data_id);
    // addSwitchItem("#receiver-rest", data_id);
    // addSwitchItem("#receiver-nfs", data_id);
    
});