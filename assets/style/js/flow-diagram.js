$(document).ready(function(){
      
    var flowDiagram = "<ul class='flow-diagram mt-4'><div class='flow-name'><button class='minimize-flow' onclick='minimizeFlow(this)'><img src='./assets/icon/chevron-icon.svg' alt='Chevron Icon' id='chevron-flow-name'></button><p class='flow-name-text mb-0 mt-0' ondblclick='renameFlow(this)'>Flow Name</p> <button class='close-flow' onclick='closeFlow(this)'><img src='./assets/icon/close-icon.svg' alt='Close Icon'></button></div></ul><br>";
    
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

            var flowDiagramNew = $(flowDiagram);
            flowDiagramNew.attr("flow_id", generateUUID());
            $(flowDiagramNew).insertBefore($(this));
            setTimeout(function(){
                $("#properties").empty();
                $("#properties").load("components/" + ui.draggable.children().attr("id") + ".html");
                sortableFunc();
                $(".flow-diagram").each(function(i){
                    if (!$(".flow-diagram").eq(i).children().hasClass("element-item")) {
                        $(".flow-diagram").eq(i).append(ui.draggable.clone());
                        setTimeout(function(){
                            var data_id = generateUUID();
                            $(".flow-diagram").eq(i).children().first().addClass("element-item-disabled");
                            $(".flow-diagram .element-box").each(function(i){
                                if (!$(this).attr("onclick")) {
                                    $(this).attr("onclick", "focusElement(this)").attr("ondblclick", "elementProperties(this)");
                                    $(this).parent().attr("data_id", data_id);
                                }
                            });

                            // tambah json flow ke local storage
                            var type_comp = $(ui.draggable).children(0).attr("id");
                            $.get("components/"+type_comp+".html", function (result) {
                                // mempersiapkan json component
                                var propItem = htmlToProp(result, type_comp);
                                var jsonFlowThis = JSON.parse(localStorage.getItem("jsonFlow"));
                                var newFlow = {
                                    "name": "Flow Name",
                                    "id": data_id,
                                    "components": [
                                        {
                                            "id": data_id,
                                            "type": type_comp,
                                            "name": type_comp,
                                            "properties": propItem
                                        }
                                    ]
                                };
                                jsonFlowThis.push(newFlow);
                                localStorage.setItem("jsonFlow", JSON.stringify(jsonFlowThis));
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
                // console.log("receive: ui: ", ui);
                $(".flow-diagram .element-box").each(function(i){
                    if (!$(this).attr("onclick")) {
                        $(this).attr("onclick", "focusElement(this)").attr("ondblclick", "elementProperties(this)");
                    }
                });
            },
            change : function(ev, ui){
                var liComp = $(ui.item[0]);
                var data_id = liComp.attr("data_id");
                var getCompMove = localStorage.getItem("compMove");

                if(getCompMove == "" || getCompMove == null /* || getLocal == "[]" */){
                    console.log("getCompMove null");
                    var compMove = getComp(data_id);
                    localStorage.setItem("compMove", JSON.stringify(compMove));
                }

                deleteJsonFlow(data_id);
            },
            update  : function(ev, ui){
                console.log("update: ui: ", ui);
                setTimeout(function(){
                    // create switch component
                    $(".flow-diagram .element-item").each(function(i){
                        if($(".flow-diagram .element-box").eq(i).prop("id") == 'object-switching'){
                            if (ui.item.prop("id") == 'switch-element') {
                            }else{
                                // console.log("colxz: ", $(ui.draggable));
                                $(".flow-diagram #object-switching").parent().attr("id", "switch-element")
                                setTimeout(function(){
                                    $(".flow-diagram #switch-element").each(function(ind){
                                        $(this).eq(ind).css({
                                            "width" : "auto",
                                            "height" : "auto"
                                        })
                                        if($(this).eq(ind).children().hasClass("switch-flow-diagram")){
                                            // console.log("ada swf")  
                                        }else{
                                            $(this).eq(ind).append(switchUl);
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

                    // new dan move comp
                    var compMove = localStorage.getItem("compMove");
                    console.log("update: compMove: ", compMove);
                    if(compMove == "" || compMove == null || compMove == undefined){
                        console.log("newwww");
                        addJsonFlow(ui);
                    } else {
                        var liComp = $(ui.item[0]);
                        var data_id = liComp.attr("data_id");
                        var indexFlow = liComp.parent().parent().children("ul").index(liComp.parent());
                        var indexNewComp = liComp.parent().children("li").index(liComp);
                        compMove = JSON.parse(compMove);
                        console.log("move. compMove: ", compMove, "| indexNewComp:", indexNewComp);

                        // tambah component ke json local storage
                        var jsonFlowThis = JSON.parse(localStorage.getItem("jsonFlow"));
                        var jsonFlowIndex = jsonFlowThis[indexFlow];
                        var components = jsonFlowIndex.components;
                        components.splice(indexNewComp, 0, compMove);
                        localStorage.setItem("jsonFlow", JSON.stringify(jsonFlowThis));
                        localStorage.removeItem("compMove");
                    }
                },50);
            }
        }).disableSelection();
    }
    
    function getComp(data_id) {
        var jsonFlowThis = JSON.parse(localStorage.getItem("jsonFlow"));
        var result;
        findComp(jsonFlowThis);
        function findComp(jsonFlowIndex){
            for (let i = 0; i < jsonFlowIndex.length; i++) {
                const flow = jsonFlowIndex[i];
                var components = flow.components;
    
                for (let x = 0; x < components.length; x++) {
                    const comp = components[x];
                    var name = comp.name;
                    var type = comp.type;
                    var id = comp.id;
                    var properties = comp.properties;
    
                    if(data_id == id){
                        // console.log("findComp del. name:", name, "| type:", type, "| id:", id, "| properties:", properties, "| jsonFlowThis:", jsonFlowThis);
                        result = comp;
                    }
                }
            }
        }
        return result;
    }

    function addJsonFlow(ui) {
        // tambah component di localStorage
        var liComp = $(ui.item[0]);
        var indexFlow = liComp.parent().parent().children("ul").index(liComp.parent());
        var indexNewComp = liComp.index();
        // console.log("indexNewComp: ", indexNewComp, "| indexFlow:", indexFlow);
        
        // membuat json object untuk component
        var data_id = generateUUID();
        var data_id_prev = liComp.prev().attr("data_id");
        var type_comp = liComp.children(0).attr("id");
        $(ui.item[0]).attr("data_id", data_id);  // ngisi uuid ke element html ui

        $.get("components/"+type_comp+".html", function (result) {
            // mempersiapkan json component
            var propItem = htmlToProp(result, type_comp);
            var newCompJson = {
                "id": data_id,
                "type": type_comp,
                "name": type_comp,
                "properties": propItem,
            };

            var jsonFlowThis = JSON.parse(localStorage.getItem("jsonFlow"));
            var getIndex;
            
            // tambah component ke json local storage
            findComp(jsonFlowThis[indexFlow]);
            function findComp(jsonFlowIndex){
                var components = jsonFlowIndex.components;
                for (let x = 0; x < components.length; x++) {
                    const comp = components[x];
                    var name = comp.name;
                    var type = comp.type;
                    var id = comp.id;
                    var properties = comp.properties;

                    if(data_id_prev == id){
                        getIndex = x;
                        // console.log("findCompx. name:", name, "| type:", type, "| id:", id, "| properties:", properties, "| jsonFlowThis:", jsonFlowThis, "| x: ", x);
                    }
                }

                components.splice(getIndex+1, 0, newCompJson);
                localStorage.setItem("jsonFlow", JSON.stringify(jsonFlowThis));
            }
        });
    }
    
    function switchFlowFunc(){
        $(".switch-flow-diagram").sortable({
            placeholder: "element-item-highlight",
            cursor: "move", 
            cursorAt: { top: 40, left: 50 },
            revert : true,
        });
    }

    function htmlToProp(html, type_comp){
        var listInput = $(html).find("input");
        var listSelect = $(html).find("select");
        var listTextarea = $(html).find("textarea");
        var listFinal = [];

        if(listInput.length > 0){
            for (let i = 0; i < listInput.length; i++) {
                var item_id = listInput[i].id;
                listFinal.push(item_id);
            }
        }

        if(listSelect.length > 0){
            for (let i = 0; i < listSelect.length; i++) {
                var item_id = listSelect[i].id;
                listFinal.push(item_id);
            }
        }

        if(listTextarea.length > 0){
            for (let i = 0; i < listTextarea.length; i++) {
                var item_id = listTextarea[i].id;
                listFinal.push(item_id);
            }
        }

        var jsonItem = {}
        for (let i = 0; i < listFinal.length; i++) {
            var item_id = listFinal[i];
            var item_new = item_id.replaceAll(type_comp + "-", "");
            jsonItem[item_new] = "";
            // console.log("item_new: ", item_new));
        }
        return jsonItem;
    }

    // === JSON TO UI ====
    function addFlow(component, data_id, flow_id){
        $(flowDiagram).insertBefore($('.canvas'));
        
        sortableFunc();
        $(".flow-diagram").each(function(i){
            if ($(".flow-diagram").eq(i).children().hasClass("element-item")) {
            }else{
                var clone = $(component).parent().clone();
                $(clone).addClass('element-item-disabled');
                $(clone).attr('data_id', data_id);
                $(clone).find('a').attr('onclick', 'focusElement(this)').attr("ondblclick", "elementProperties(this)");
                $(".flow-diagram").eq(i).append(clone);
            }
        });
    }

    function addComponent(component, i, data_id){
        var clone = $(component).parent().clone();
        $(clone).attr('style', 'width: auto; height: auto;');
        $(clone).attr('data_id', data_id);
        $(clone).find('a').attr('onclick', 'focusElement(this)').attr("ondblclick", "elementProperties(this)");
        $($(".flow-diagram").get(i)).append(clone);
    }

    function addSwitch(component, i, data_id){
        var clone = $(component).parent().clone();
        $(clone).attr('id', 'switch-element');
        $(clone).attr('style', 'width: auto; height: auto;');
        $(clone).attr('data_id', data_id);
        $(clone).find('a').attr('onclick', 'focusElement(this)').attr("ondblclick", "elementProperties(this)");
        var cloneFinal = $(clone).append(switchUl);
        $($(".flow-diagram").get(i)).append(cloneFinal);
    }

    function addSwitchItem(component, switch_id, idSwitch){
        var clone = $(component).parent().clone();
        $(clone).attr('data_id', idSwitch);
        $('[data_id="'+ switch_id +'"]').find('ul').append(clone);
    }

    // Unic ID untuk flow dan component
    function generateUUID() { 
        var d = new Date().getTime();//Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    var jsonData = [
        {
            "name": "flow1",
            // "index": 0,
            "id": generateUUID(),
            "components": [
                {
                    // "id": "0-1",
                    "id": generateUUID(),
                    "type": "sender-tcp",
                    "name": "tcp-test",
                    // "level": 0,
                    // "pid": "0-0",
                    // "index": 0,
                    "properties": {
                        "port": 8080,
                        "name": "aaa",
                        "thread": 1,
                        "keepopen": true,
                        "wait": 60
                    }
                },
                {
                    // "id": "0-2",
                    "id": generateUUID(),
                    "type": "receiver-nfs",
                    "name": "nfs-test",
                    // "level": 1,
                    // "pid": "0-1",
                    // "index": 0,
                    "properties": {
                        "path": "/opt/path", 
                        "polling": 10,
                        "retry": 60, 
                        "filename": "getdata.csv"
                    }
                },
                {
                    // "id": "0-3",
                    "id": generateUUID(),
                    "type": "receiver-jdbc",
                    "name": "nfs-jdbc",
                    // "level": 2,
                    // "pid": "0-2",
                    // "index": 0,
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
            // "index": 1,
            "id": generateUUID(),
            "components": [
                {
                    // "id": "1-1",
                    "id": generateUUID(),
                    "type": "sender-nfs",
                    "name": "nfs-test",
                    // "level": 0,
                    // "pid": "1-0",
                    // "index": 0,
                    "properties": {
                        "path": "/opt/dataku",
                        "polling": 10,
                        "retry": 60,
                        "filename": "file.xml",
                        "fileEvent": 2,
                        "folderName": "assets",
                    }
                },
                {
                    "id": "1-2",
                    "type": "object-switching",
                    "name": "my-switching",
                    // "level": 1,
                    // "pid": "1-1",
                    // "index": 0,
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
                                "path": "/opt/assets",
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
                    // "id": "1-3",
                    "id": generateUUID(),
                    "type": "receiver-ftp",
                    "name": "ftp-test",
                    // "level": 2,
                    // "pid": "1-2",
                    // "index": 0,
                    "properties": {
                        "path": "/home/nude/img",
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

    // ===== (JSON TO UI) ALL ===
    for (let i = 0; i < jsonFlow.length; i++) {
        const flow = jsonFlow[i];
        var flow_name = flow.name;
        var flow_id = flow.id;
        var type_com0 = flow.components[0].type;
        var id_com0 = flow.components[0].id;
        addFlow('#'+type_com0, id_com0);
        $(".flow-diagram").eq(i).attr("flow_id",flow_id);
        $(".flow-name").eq(i).find("p").text(flow_name);

        var components = flow.components;
        var firstCompId = components[0].id;
        console.log("components", components);
        console.log("firstCompId:", firstCompId);

        // recurComp(components, firstCompId, i);
        flatComp(components, i);
    }
   
    // ===== (JSON TO UI) BACA CARA RECURSIVE ===
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

    // ===== (JSON TO UI) BACA CARA FLAT ===
    function flatComp(components, indexFlow){
        for (let j = 1; j < components.length; j++) {
            var component = components[j];
            var level = component.level;
            var name = component.name;
            var id = component.id;
            var pid = component.pid;
            var type = component.type;

            console.log("type: ", type, "data_id", id, "indexFlow", indexFlow);
            
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