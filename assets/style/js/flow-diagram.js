$(document).ready(function(){
      
    var flowDiagram = "<ul class='flow-diagram mt-4'><div class='flow-name'><button class='minimize-flow' onclick='minimizeFlow(this)'><img src='./assets/icon/minimize-flow-icon-2.svg' alt='Chevron Icon' id='chevron-flow-name'></button><input type='text' class='flow-name-text' ondblclick='renameFlow(this)' onblur='toReadonly(this)' oninput='flowTyping(this)' value='Scenario_1' readonly/> <button class='close-flow' onclick='closeFlow(this)'><img src='./assets/icon/close-icon.svg' alt='Close Icon'></button></div></ul><br>";
    
    $(".element-item").draggable({
        connectToSortable : ".flow-diagram, .switch-flow-diagram, .switch-flow-element",
        containment : "#flow-container",
        helper : "clone",
        revert: "invalid",
        cursorAt: { top: 25, left: 25 },
        scroll : false,
        start : function(ev, ui){
            var elementId = $(ui.helper).children().attr("id");
            var splitText = elementId.split("-").shift();

            if (splitText == "sender") {
                $(".flow-diagram").each(function(i) {
                    if ($(this).children().length > 0) {
                        $(this).sortable({
                            disabled : true
                        })
                    }
                });
            }else{
                $(".flow-diagram").each(function(i) {
                    if ($(this).children().length > 0) {
                        $(this).sortable({
                            disabled : false    
                        })
                    }
                });
            }

        }
    }).disableSelection();

    $(".canvas").droppable({
        accept : ".elements-list #sender",
        scroll : true,
        drop : function(ev, ui){
            var droppedItem = $(ui.draggable).clone();

            var flowDiagramNew = $(flowDiagram);
            flowDiagramNew.attr("flow_id", generateUUID());
            $(flowDiagramNew).insertBefore($(this));
            setTimeout(function(){
                $(".flow-name-text").each(function(ind){
                    var flowNameLength = $(this).val().length;
                    $(this).attr("size", flowNameLength);
                });
                $("#properties").empty();
                $("#properties").load("components/" + ui.draggable.children().attr("id") + ".html");
                sortableFunc();
                $(".flow-diagram").each(function(i){
                    if (!$(".flow-diagram").eq(i).children().hasClass("element-item")) {
                        $(".flow-diagram").eq(i).append(ui.draggable.clone());
                        setTimeout(function(){
                            var data_id = generateUUID();
                            $(".flow-diagram").eq(i).children(".element-item").first().addClass("element-item-disabled");
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
                                    "uuid": data_id,
                                    "components": [
                                        {
                                            "uuid": data_id,
                                            "type": type_comp,
                                            "name": type_comp,
                                            "attribut": propItem
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
        },
            // over : function(ev, ui) {
            //     console.log(ui.helper)
            // }
    }).disableSelection();

    $("#flow-tab").sortable().disableSelection();
    var switchUl = "<ul class='switch-flow-diagram'></ul>";

    function sortableFunc(){
        var adding = 0
        
        $(".flow-diagram").sortable({
            items : ".element-item:not(.element-item-disabled)",
            scrollSensitivity: 100,
            cursor: "move", 
            cursorAt: { top: 40, left: 50 },
            revert : true,
            placeholder: "element-item-highlight",
            zIndex : 10,
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
                                            // console.log("tidak ada swf")  
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
            },
            over : function(ev, ui){
                var elementId = $(ui.item).children().attr("id");
                var splitText = elementId.split("-").shift();

                if (splitText == "sender") {
                        $(this).sortable({
                            disabled : true
                    })
                }else{
                    console.log("not-sender")
                }
            }
        }).disableSelection();
    }
    
    var codeAdapter = {
        "sender-tcp" : ["001", "T011S"],
        "receiver-tcp" : ["001", "T011R"],
        "sender-rest" : ["002", "R021S"],
        "receiver-rest" : ["002", "R021R"],
        // "sender-soap" : ["002", "S022S"],
        // "receiver-soap" : ["002", "S022R"],
        "sender-nfs" : ["003", "N031S"],
        "receiver-nfs" : ["003", "N031R"],
        "sender-ftp" : ["003", "F032S"],
        "receiver-ftp" : ["003", "F032R"],
        // "sender-ftpe" : ["003", "F033S"],
        // "receiver-ftpe" : ["003", "F033R"],
        // "sender-ftps" : ["003", "F034S"],
        // "receiver-ftps" : ["003", "F034R"],
        "sender-sftp" : ["003", "S035S"],
        "receiver-sftp" : ["003", "S035R"],
        "sender-imap" : ["004", "I041S"],
        "receiver-smtp" : ["004", "S041R"],
        "sender-jdbc" : ["005", "J051S"],
        "receiver-jdbc" : ["005", "J051R"],
        "sender-mqtt" : ["006", "M061S"],
        "receiver-mqtt" : ["006", "M061R"],
        "object-EnDe" : ["", ""],
        "object-switching" : ["", ""],
    };

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
                    var uuid = comp.uuid;
                    var attribut = comp.attribut;
    
                    if(data_id == uuid){
                        // console.log("findComp del. name:", name, "| type:", type, "| id:", id, "| attribut:", attribut, "| jsonFlowThis:", jsonFlowThis);
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
                "uuid": data_id,
                "type": type_comp,
                "name": type_comp,
                "adapter": codeAdapter[type_comp][0],
                "attribut": propItem,
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
                    var uuid = comp.uuid;
                    var attribut = comp.attribut;

                    if(data_id_prev == uuid){
                        getIndex = x;
                        // console.log("findCompx. name:", name, "| type:", type, "| uuid:", uuid, "| attribut:", attribut, "| jsonFlowThis:", jsonFlowThis, "| x: ", x);
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
            cursorAt: { top: 40.5, left: 87.5 },
            revert : true,
            update : function(ev, ui){
                console.log("update")
                // $(ui.item).wrap("<ul class='switch-element-sortable'></ul>");
                // $(".switch-flow-diagram").each(function(i){
                //     $(this).children(".element-item").each(function(ind){
                //         // $(this).wrap("<ul class='switch-element-sortable'></ul>")
                //     })
                // })
            },
            receive : function(ev, ui){
                console.log("revce ")
                setTimeout(() => {
                    $(".switch-flow-diagram").children(".element-item").each(function(i){
                        $(this).eq(i).wrap("<div class='switch-flow-element'></div>")
                        switchFlowElementFuncs();
                        setTimeout(() => {
                            $(".switch-flow-element").each(function(ind){
                                $(this).attr("id", "switch-flow-element-"+ind);
                            })
                        }, 250);
                    })
                }, 100);
            }
        });
    }

    function switchFlowElementFuncs(){
        // $(".switch-flow-element").on('mouseenter', function(){
        //     console.log("dragover")
        // })
        $(".switch-flow-element").sortable({
            placeholder : "element-item-highlight",
            cursor : "move",
            cursorAt : {top : 40.5, left : 87.5},
            revert : true,
            // over : function(){
            //   console.log($(this).children(".element-item"))
            // },
            // out : function(){
            //     // $(this).children(".element-item:last").css({
            //     //     // "background" : "blue"
            //     // })
            // }
        })
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
        jsonItem["code"] = codeAdapter[type_comp][1];
        return jsonItem;
    }

    // === JSON TO UI ====
    function addFlow(component, data_id, flow_id){
        $(flowDiagram).insertBefore($('.canvas'));

        setTimeout(() => {
            $(".flow-name-text").each(function(ind){
                var flowNameLength = $(this).val().length;
                $(this).attr("size", flowNameLength)
            });
        }, 10);
        
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
            "uuid": generateUUID(),
            "components": [
                {
                    "uuid": generateUUID(),
                    "type": "sender-tcp",
                    "name": "tcp-test",
                    "adapter": "001",
                    // "index": 0,
                    "attribut": {
                        "code": "T001S",
                        "port": 8080,
                        "name": "aaa",
                        "thread": 1,
                        "keepopen": true,
                        "wait": 60
                    }
                },
                {
                    // "uuid": "0-2",
                    "uuid": generateUUID(),
                    "type": "receiver-nfs",
                    "name": "nfs-test",
                    "adapter": "003",
                    // "index": 0,
                    "attribut": {
                        "code": "N031R",
                        "path": "/opt/path", 
                        "polling": 10,
                        "retry": 60, 
                        "filename": "getdata.csv"
                    }
                },
                {
                    // "uuid": "0-3",
                    "uuid": generateUUID(),
                    "type": "receiver-jdbc",
                    "name": "nfs-jdbc",
                    "adapter": "005",
                    // "index": 0,
                    "attribut": {
                        "code": "J051R",
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
            "uuid": generateUUID(),
            "components": [
                {
                    // "uuid": "1-1",
                    "uuid": generateUUID(),
                    "type": "sender-nfs",
                    "name": "nfs-test",
                    "adapter": "003",
                    // "index": 0,
                    "attribut": {
                        "code": "N031S",
                        "path": "/opt/dataku",
                        "polling": 10,
                        "retry": 60,
                        "filename": "file.xml",
                        "fileEvent": 2,
                        "folderName": "assets",
                    }
                },
                {
                    "uuid": "1-2",
                    "type": "object-switching",
                    "name": "my-switching",
                    // "index": 0,
                    "attribut": {
                        "switch-case": "object",
                        "if-else": "object",
                        "customization": "java-code"
                    },
                    "components": [
                        {
                            "uuid": "1-2-1",
                            "type": "receiver-jdbc",
                            "name": "jdbc-mysql",
                            "level": 0,
                            "pid": "1-2",
                            "index": 0,
                            "attribut": {
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
                            "uuid": "1-2-2",
                            "type": "receiver-jdbc",
                            "name": "jdbc-mssql",
                            "level": 0,
                            "pid": "1-2",
                            "index": 1,
                            "attribut": {
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
                            "uuid": "1-2-3",
                            "type": "receiver-ftp",
                            "name": "ftp-rec",
                            "level": 1,
                            "pid": "1-2-1",
                            "index": 0,
                            "attribut": {
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
                    // "uuid": "1-3",
                    "uuid": generateUUID(),
                    "type": "receiver-ftp",
                    "name": "ftp-test",
                    "adapter": "003",
                    // "index": 0,
                    "attribut": {
                        "code": "F032R",
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
        var flow_id = flow.uuid;
        var type_com0 = flow.components[0].type;
        var id_com0 = flow.components[0].uuid;
        addFlow('#'+type_com0, id_com0);
        $(".flow-diagram").eq(i).attr("flow_id",flow_id);
        $(".flow-name").eq(i).find("input").val(flow_name);
        var components = flow.components;
        var firstCompId = components[0].uuid;
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
            var uuid = component.uuid;
            var pid = component.pid;
            var type = component.type;

            if(pid == parent_id){
                // console.log("type: ", type, "data_id", uuid, "indexFlow", indexFlow);
                
                // selain component switch
                if(type != 'object-switching'){
                    addComponent("#" + type, indexFlow, uuid);
                } else { // component switch
                    addSwitch("#object-switching", indexFlow, uuid);

                    // switch components child
                    var componSwitchList = component.components;
                    for (let k = 0; k < componSwitchList.length; k++) {
                        var componSwitch = componSwitchList[k];
                        var levelSwitch = componSwitch.level;
                        var nameSwitch = componSwitch.name;
                        var idSwitch = componSwitch.uuid;
                        var pidSwitch = componSwitch.pid;
                        var typeSwitch = componSwitch.type;
                        // console.log("nameSwitch: ", nameSwitch, "typeSwitch", typeSwitch, "idSwitch", idSwitch);

                        if(uuid == pidSwitch){
                            addSwitchItem("#"+typeSwitch, uuid, idSwitch);
                        }
                    }
                }

                recurComp(components, uuid, indexFlow);
            }
        }
    }

    // ===== (JSON TO UI) BACA CARA FLAT ===
    function flatComp(components, indexFlow){
        for (let j = 1; j < components.length; j++) {
            var component = components[j];
            var level = component.level;
            var name = component.name;
            var uuid = component.uuid;
            var pid = component.pid;
            var type = component.type;

            console.log("type: ", type, "data_id", uuid, "indexFlow", indexFlow);
            
            // selain component switch
            if(type != 'object-switching'){
                addComponent("#" + type, indexFlow, uuid);
            } else { // component switch
                addSwitch("#object-switching", indexFlow, uuid);

                // switch components child
                var componSwitchList = component.components;
                for (let k = 0; k < componSwitchList.length; k++) {
                    var componSwitch = componSwitchList[k];
                    var levelSwitch = componSwitch.level;
                    var nameSwitch = componSwitch.name;
                    var idSwitch = componSwitch.uuid; 
                    var pidSwitch = componSwitch.pid;
                    var typeSwitch = componSwitch.type;
                    // console.log("nameSwitch: ", nameSwitch, "typeSwitch", typeSwitch, "idSwitch", idSwitch);

                    if(uuid == pidSwitch){
                        addSwitchItem("#"+typeSwitch, uuid, idSwitch);
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