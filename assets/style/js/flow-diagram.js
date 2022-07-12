$(document).ready(function(){
      
    var flowDiagram = "<ul class='flow-diagram mt-4'><div class='flow-name'><button class='minimize-flow' onclick='minimizeFlow(this)'><img src='./assets/icon/minimize-flow-icon-2.svg' alt='Chevron Icon' id='chevron-flow-name'></button><input type='text' class='flow-name-text' ondblclick='renameFlow(this)' onblur='toReadonly(this)' oninput='flowTyping(this)' value='Scenario_1' readonly/> <button class='close-flow' onclick='closeFlow(this)'><img src='./assets/icon/close-icon.svg' alt='Close Icon'></button></div></ul><br>";
    
    $(".elements-list .element-item").draggable({
        connectToSortable : ".flow-diagram, .switch-flow-diagram, .switch-flow-element, .sender-droppable",
        containment : ".content",
        disabled: false,
        helper : "clone",
        revert: "invalid",
        cursorAt: { top: 25, left: 25 },
        scroll : false,
        start : function(ev, ui){
            var elementType = $(ui.helper).children().attr("data-properties");
            $(ui.helper).attr("id", elementType);
        }
    }).disableSelection();
    
    droppableFunc();
    sortableFunc();
    switchFlowFunc();
    switchFlowElementFuncs();

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

var flowDiagram = "<ul class='flow-diagram mt-4'><div class='flow-name'><button class='minimize-flow' onclick='minimizeFlow(this)'><img src='./assets/icon/minimize-flow-icon-2.svg' alt='Chevron Icon' id='chevron-flow-name'></button><input type='text' class='flow-name-text' ondblclick='renameFlow(this)' onblur='toReadonly(this)' oninput='flowTyping(this)' value='' readonly/> <button class='close-flow' onclick='closeFlow(this)'><img src='./assets/icon/close-icon.svg' alt='Close Icon'></button></div></ul><br>";


function droppableFunc(){

    $(".canvas").droppable({
        accept : ".elements-list #sender",
        scroll : true,
        drop : function(ev, ui){
            let thisLocal = $(this);
            var flowDiagramNew = $(flowDiagram);
            flowDiagramNew.attr("flow_id", generateUUID());
            $(flowDiagramNew).insertBefore($(this));
            setTimeout(function(){
                var flow_id = $(flowDiagramNew).attr("flow_id");
                sortableFunc();
                
                var projectFlowDiagram = $(flowDiagramNew).parents(".project-container").find(".flow-diagram");
                $(projectFlowDiagram).each(function(i){
                    if ($(this).attr("flow_id") == flow_id) {
                        var indexElement = i+1;
                        $(this).find(".flow-name-text").val("Scenario_"+indexElement)
                        $(".flow-name-text").each(function(ind){
                            var flowNameLength = $(this).val().length;
                            $(this).attr("size", flowNameLength);
                        });
                    }
                })

                $(".flow-diagram").each(function(i){
                    if (!$(".flow-diagram").eq(i).children().hasClass("element-item")) {

                        $(".flow-diagram").eq(i).append(ui.draggable.clone());
                        setTimeout(function(){
                            var data_id = generateUUID();
                            $(".flow-diagram").eq(i).children(".element-item").first().addClass("element-item-disabled");
                            $(".flow-diagram").eq(i).children(".element-item").first().removeAttr("style");
                            $(".flow-diagram .element-box").each(function(i){
                                if (!$(this).attr("onclick")) {
                                    $(this).attr("onclick", "focusElement(this)").attr("ondblclick", "elementProperties(this)");
                                    $(this).parent().attr("data_id", data_id);
                                }
                            });

                            // tambah json flow ke local storage
                            var type_comp = $(ui.draggable).children(0).attr("id");
                            var spanText = $(ui.draggable).children(0).find("span").text();
                            $.get("./components/"+type_comp+".jsp", function (result) {
                                // mempersiapkan json component
                                var propItem = htmlToProp(result, type_comp);
                                var jsonTabThis = JSON.parse(localStorage.getItem("jsonTab"));
                                let getProjectId = thisLocal.closest(".project-container").attr("project_id");
                                let scenarionName = $(flowDiagramNew).find(".flow-name-text").val();

                                for (let i = 0; i < jsonTabThis.length; i++) {
                                    const tab = jsonTabThis[i];
                                    let project_id = tab.project_id;
                                    if(project_id == getProjectId){
                                        if (tab.tab_status == "saved") {
                                            tab.tab_status = "unsaved"
                                        }
                                        var newFlow = {
                                            "name": scenarionName,
                                            "uuid": flow_id,
                                            "components": [
                                                {
                                                    "uuid": data_id,
                                                    "type": type_comp,
                                                    "name": spanText,
                                                    "attribut": propItem,
                                                    "log": logDefault,
                                                }
                                            ]
                                        };
                                        jsonTabThis[i].jsonData.push(newFlow);
                                        localStorage.setItem("jsonTab", JSON.stringify(jsonTabThis));
                                        setTimeout(() => {
                                            removeUnsavedStatus();
                                            if(tab.tab_status == "unsaved"){
												toggleSaveProjectButton(getProjectId);
											}
                                        }, 150);
                                    }
                                }
                            });
                        },100);
                    }
                });
            }, 100);
        },
    }).disableSelection();
}



var switchUl = "<ul class='switch-flow-diagram'></ul>";

function sortableFunc(){
    var adding = 0
    
    $(".flow-diagram").sortable({
        items : ".element-item:not(.element-item-disabled)",
        cancel : ".element-item#sender, .element-item-disabled",
        connectWith : ".flow-diagram, .switch-flow-diagram, .switch-flow-element",
        scrollSensitivity: 100,
        cursor: "move", 
        cursorAt: { top: 40, left: 50 },
        revert : true,
        placeholder: "element-item-highlight",
        zIndex : 1010,
        start : function(ev, ui){
            var ulCompId = $(ui.item).parent().attr("flow_id");
            localStorage.setItem("ulSource", ulCompId);
        },
        receive : function(ev, ui){

            // Fix Bug Width Element Item
            $(".flow-diagram").children(".element-item").css("width", "auto");
            
            // create switch component

            if ($(this).data().uiSortable.currentItem != undefined) {
                var itemDropped = $(this).data().uiSortable.currentItem;

                createSwitchElement(itemDropped)
            }

            $(".flow-diagram .element-box").each(function(i){
                if (!$(this).attr("onclick")) {
                    $(this).attr("onclick", "focusElement(this)").attr("ondblclick", "elementProperties(this)");
                }
            });
        
            if ($(this).children(".element-item").length > 1) {
                if ($(this).data().uiSortable.currentItem != undefined) {
                    var itemDropped = $(this).data().uiSortable.currentItem.children();
                    if ($(itemDropped).attr("data-properties") == "sender") {
                        $(itemDropped).parent().fadeOut().remove();
                        iziToast.error({
                            timeout : 2000,
                            title: 'Error',
                            message: "You can't drop more 1 Sender in 1 Scenario",
                            position : "topRight",
                            transitionIn : "fadeInDown",
                            transitionOut : "fadeOutUp",
                            pauseOnHover: false,
                        });
                    }
                }
            }else{
                if ($(this).data().uiSortable.currentItem != undefined) {
                    var itemDropped = $(this).data().uiSortable.currentItem.children();
                    if ($(itemDropped).attr("data-properties") == "receiver") {
                        $(itemDropped).parent().fadeOut().remove();
                        iziToast.error({
                            timeout : 2000,
                            title: 'Error',
                            message: "You can't drop unless the sender is at the beginning of the Scenario  ",
                            position : "topRight",
                            transitionIn : "fadeInDown",
                            transitionOut : "fadeOutUp",
                            pauseOnHover: false,
                        });
                    }
                    else if ($(itemDropped).attr("data-properties") == "object") {
                        $(itemDropped).parent().fadeOut().remove();
                        iziToast.error({
                            timeout : 2000,
                            title: 'Error',
                            message: "You can't drop unless the sender is at the beginning of the Scenario  ",
                            position : "topRight",
                            transitionIn : "fadeInDown",
                            transitionOut : "fadeOutUp",
                            pauseOnHover: false,
                        });
                    }
                    else if($(itemDropped).attr("data-properties") == "sender"){
                        $(itemDropped).parent(".element-item").addClass("element-item-disabled");
                    }
                }
            }
        
        },
        change : function(ev, ui){
            var liComp = $(ui.item[0]);
            var data_id = liComp.attr("data_id");
            var getCompMove = localStorage.getItem("compMove");
            let getProjectId = liComp.closest(".project-container").attr("project_id");
            console.log("change. data_id: ", data_id, "| getCompMove: ", getCompMove);

            if(getCompMove == "" || getCompMove == null /* || getLocal == "[]" */){
                console.log("getCompMove null");
                var compMove = getComp(data_id, getProjectId);
                localStorage.setItem("compMove", JSON.stringify(compMove));
            }

            deleteJsonFlow(data_id, getProjectId);
        },
        update  : function(ev, ui){
            console.log("update: ui: ", ui);

            setTimeout(function(){

                $(".switch-flow-element").each(function(i){
                    if ($(this).children().length == 0) {
                        $(this).remove()
                    }
                })
                
                var liComp = $(ui.item);
                let getProjectId = liComp.closest(".project-container").attr("project_id");

                let getJsonTab = JSON.parse(localStorage.getItem("jsonTab"));
                for (let i = 0; i < getJsonTab.length; i++) {
                    let localTab = getJsonTab[i];
                    if (localTab.project_id == getProjectId) {
                        if (localTab.tab_status == "saved") {
                            localTab.tab_status = "unsaved"

                            localStorage.setItem("jsonTab", JSON.stringify(getJsonTab));
                            setTimeout(() => {
                                removeUnsavedStatus();
                                if(localTab.tab_status == "unsaved"){
									toggleSaveProjectButton(getProjectId)									
								}
                            }, 150);
                        }
                    }
                }

                // new dan move comp
                var compMove = localStorage.getItem("compMove");
                // console.log("update: compMove: ", compMove, "| ui:", $(ui.item[0]), "| uiSortable: ", $(this).data().uiSortable);
                
                if(compMove == ""){
                    compMove = null;
                } if(compMove == undefined){
                    compMove = null;
                } if(compMove == "undefined"){
                    compMove = null;
                }
                
                if(compMove == null){
                    var ulFlowSource = localStorage.getItem("ulSource");
                    var ulFlowDest = liComp.parent().attr("flow_id");
                    console.log("newwww. | ulFlowSource: ", ulFlowSource, "| ulFlowDest:", ulFlowDest);
                    if(ulFlowSource == ulFlowDest){
                        addJsonFlow(ui);
                    }
                } else {
                    var data_id = liComp.attr("data_id");
                    var indexFlow = liComp.parent().parent().children("ul").index(liComp.parent());
                    var indexNewComp = liComp.parent().children("li").index(liComp);
                    compMove = JSON.parse(compMove);
                    console.log("move. compMove: ", compMove, "| getProjectId: ", getProjectId /*"| ulFlowSource: ", ulFlowSource, "| ulFlowDest:", ulFlowDest*/);

                    // tambah component ke json local storage
                    var jsonTabThis = JSON.parse(localStorage.getItem("jsonTab"));
                    for (let i = 0; i < jsonTabThis.length; i++) {
                        const tab = jsonTabThis[i];
                        if(tab.project_id == getProjectId){
                            var jsonFlowIndex = tab.jsonData[indexFlow];
                            var components = jsonFlowIndex.components;
                            components.splice(indexNewComp, 0, compMove);
                            localStorage.setItem("jsonTab", JSON.stringify(jsonTabThis));
                            setTimeout(() => {
								if(tab.tab_status == "unsaved"){
									toggleSaveProjectButton(getProjectId)									
								}
							},150)
                        }
                    }
                }
                localStorage.removeItem("compMove");
                localStorage.removeItem("ulSource");
            },50);
        },
        over : function(ev,ui){
            switchFlowFunc();
            switchFlowElementFuncs();
        }
        
    }).disableSelection();
}


function createSwitchElement(switchEl){
    var itemDroppedChild = $(switchEl).children();
        if ($(itemDroppedChild).attr("data-type-element") == "switching") {
            
            $(switchEl).attr("id", "switch-element");

            // Generate Data ID buat Switch Element
            // var data_id = generateUUID();
            // if ($(switchEl).attr("data_id") == undefined) {
            //     $(switchEl).attr("data_id", data_id);
            // }

            $(switchEl).css({
                "width" : "auto",
                "height" : "auto"
            })
            
            if ($(switchEl).children(".switch-flow-diagram").length == 0) {
                $(switchEl).append(switchUl);    
            }

            switchFlowFunc();
        }
}

function switchFlowFunc(){
    $(".switch-flow-diagram").sortable({
        items : ".switch-flow-element, .element-item",
        // connectWith : ".flow-diagram",
        placeholder: "element-item-highlight",
        cursor: "move", 
        cursorAt: { top: 40.5, left: 87.5 },
        revert : true,
        update : function(ev, ui){
            console.log("update");

            var project_id = $(this).parents(".project-container").attr("project_id");
            var jsonTab = JSON.parse(localStorage.getItem("jsonTab"));

            for (let i = 0; i < jsonTab.length; i++) {
                let tab = jsonTab[i];
                if (tab.project_id == project_id) {
                    if (tab.tab_status == "saved") {
                        tab.tab_status = "unsaved";
                        localStorage.setItem("jsonTab", JSON.stringify(jsonTab));
                        setTimeout(() => {
                            removeUnsavedStatus();
                            if(tab.tab_status == "unsaved"){
								toggleSaveProjectButton(project_id)									
							}
                        }, 150);
                    }
                }
                
            }
        },
        receive : function(ev, ui){
            console.log("revce ")
            setTimeout(() => {
                if ($(this).data().uiSortable.currentItem != undefined) {
                    var itemDropped = $(this).data().uiSortable.currentItem;
                    createSwitchElement(itemDropped);
                }

                $(".switch-flow-diagram .switch-flow-element").each(function(i){
                    if ($(this).children(".element-item").length == 0) {
                        $(this).remove();
                    }
                })

                $(".switch-flow-diagram").children(".element-item").each(function(i){
                    $(this).eq(i).wrap("<div class='switch-flow-element'></div>")
                    switchFlowElementFuncs();
                    setTimeout(() => {
                        $(".switch-flow-element").each(function(ind){
                            $(this).attr("id", "switch-flow-element-"+ind);
                        
                        var data_id = generateUUID();
        
                        $(".switch-flow-element .element-box").each(function(ind){
                            // console.log($(this).prop("onclick"))
                            if (!$(this).attr("onclick")) {
                                $(this).attr("onclick", "focusElement(this)").attr("ondblclick", "elementProperties(this)");                                    
                                $(this).parent().attr("data_id", data_id);
                            }
                        });
                        })
                    }, 150);
                })
            }, 100);
        
            if ($(this).data().uiSortable.currentItem != undefined) {
                var itemDropped = $(this).data().uiSortable.currentItem.children();
                if ($(itemDropped).attr("data-properties") == "sender") {
                    $(itemDropped).parent().fadeOut().remove();
                    iziToast.error({
                        timeout : 2000,
                        title: 'Error',
                        message: "You can't drop more 1 Sender in 1 Scenario",
                        position : "topRight",
                        transitionIn : "fadeInDown",
                        transitionOut : "fadeOutUp",
                        pauseOnHover: false,
                    });
                }
            }
        },
        over : function(ev,ui){
            switchFlowElementFuncs();
        }
    });
}

function switchFlowElementFuncs(){
    $(".switch-flow-element").sortable({
        placeholder : "element-item-highlight",
        dropOnEmpty : true,
        connectWith : ".switch-flow-element, .flow-diagram, .switch-flow-diagram",
        cursor : "move",
        cursorAt : {top : 40.5, left : 87.5},
        revert : true,
        receive : function(ev, ui){
            
            if ($(this).data().uiSortable.currentItem != undefined) {
                var itemDropped = $(this).data().uiSortable.currentItem;

                createSwitchElement(itemDropped)
            }


            var data_id = generateUUID();
            $(".switch-flow-element .element-box").each(function(ind){
                if(!$(this).attr("onclick")){
                    $(this).attr("onclick", "focusElement(this)").attr("ondblclick", "elementProperties(this)");
                    $(this).parent().attr("data_id", data_id)
                }
            });
        
            if ($(this).data().uiSortable.currentItem != undefined) {
                var itemDropped = $(this).data().uiSortable.currentItem.children();
                if ($(itemDropped).attr("data-properties") == "sender") {
                    $(itemDropped).parent().fadeOut().remove();
                    iziToast.error({
                        timeout : 2000,
                        title: 'Error',
                        message: "You can't drop more 1 Sender in 1 Scenario",
                        position : "topRight",
                        transitionIn : "fadeInDown",
                        transitionOut : "fadeOutUp",
                        pauseOnHover: false,
                    });
                }
            }
        },
        update : function(ev, ui){
			var project_id = $(this).parents(".project-container").attr("project_id")
            setTimeout(() => {
                if ($(ui.sender).children().length == 0) {
                    $(ui.sender).remove();
                }
                
                removeUnsavedStatus()
                toggleSaveProjectButton(project_id)
            }, 100);
        },
        over : function(ev,ui){
            switchFlowFunc();
        }
    })
}


let logDefault = {
    "log_type": "ALL",
    "show_in_console": true,
    "put_on": "File",
};

let codeAdapter = {
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

function getComp(data_id, project_id) {
    var jsonTabThis = JSON.parse(localStorage.getItem("jsonTab"));
    var result;
    for (let h = 0; h < jsonTabThis.length; h++) {
        const tab = jsonTabThis[h];
        if(tab.project_id == project_id){
            let jsonData = tab.jsonData;
            for (let i = 0; i < jsonData.length; i++) {
                const flow = jsonData[i];
                var components = flow.components;
                for (let j = 0; j < components.length; j++) {
                    const comp = components[j];
                    var name = comp.name;
                    var type = comp.type;
                    var uuid = comp.uuid;
                    var attribut = comp.attribut;

                    if(data_id == uuid){
                        // console.log("findComp del. name:", name, "| type:", type, "| id:", id, "| attribut:", attribut);
                        result = comp;
                    }
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
    var spanText = liComp.children(0).find("span").text();
    // console.log("liComp.children(0):", spanText);
    $(ui.item[0]).attr("data_id", data_id);  // ngisi uuid ke element html ui

    $.get("./components/"+type_comp+".jsp", function (result) {
        // mempersiapkan json component
        var propItem = htmlToProp(result, type_comp);
        var newCompJson;

        // kalau bukan component Mapping
        if(type_comp != "object-mapping"){
            newCompJson = {
                "uuid": data_id,
                "type": type_comp,
                "name": spanText,
                "adapter": codeAdapter[type_comp][0],
                "attribut": propItem,
                "log": logDefault,
            };
        } else { // component mapping
            newCompJson = {
                "uuid": data_id,
                "type": type_comp,
                "name": spanText,
                "mapping": "mapping.class",
                "path": "",
                "log": logDefault,
            };
        }

        var jsonTabThis = JSON.parse(localStorage.getItem("jsonTab"));
        var getIndex;
        
        // tambah component ke json local storage
        let getProjectId = liComp.closest(".project-container").attr("project_id");
        for (let i = 0; i < jsonTabThis.length; i++) {
            const tab = jsonTabThis[i];
            if(tab.project_id == getProjectId){
                let jsonData = tab.jsonData;
                for (let j = 0; j < jsonData.length; j++) {
                    var components = jsonData[j].components;
                    if (components.length == 0) {
                        if (indexNewComp == 1) {
                            jsonTabThis[i].jsonData[j].components.push(newCompJson);
                            localStorage.setItem("jsonTab", JSON.stringify(jsonTabThis));
                        }
                    }
                    for (let x = 0; x < components.length; x++) {
                        const comp = components[x];
                        var name = comp.name;
                        var type = comp.type;
                        var uuid = comp.uuid;
                        var attribut = comp.attribut;

                        if(data_id_prev == uuid){
                            getIndex = x;
                            // console.log("findCompx. name:", name, "| type:", type, "| uuid:", uuid, "| attribut:", attribut, "| x: ", x);
                            jsonTabThis[i].jsonData[j].components.splice(getIndex+1, 0, newCompJson);
                            localStorage.setItem("jsonTab", JSON.stringify(jsonTabThis));
                        }
                    }
                }
                setTimeout(() => {
					if(tab.tab_status == "unsaved"){
						toggleSaveProjectButton(getProjectId)
					}
				}, 150)
            }
        }
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
    if(type_comp != "object-mapping"){
        jsonItem["code"] = codeAdapter[type_comp][1];
    }
    return jsonItem;
}

// === JSON TO UI ====
function addFlow(component, data_id, name, projectUuid){
    let projectContent = $(".project-container[project_id='"+projectUuid+"']").find(".canvas");
    $(flowDiagram).insertBefore(projectContent);

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
            $(clone).find('span').text(name);
            $(clone).find('a').attr('onclick', 'focusElement(this)').attr("ondblclick", "elementProperties(this)");
            $(".flow-diagram").eq(i).append(clone);
        }
    });
}

function addComponent(compId, i, component, projectUuid){
    var clone = $(compId).parent().clone();
    $(clone).attr('style', 'width: auto; height: auto;');
    $(clone).attr('data_id', component.uuid);
    $(clone).find('span').text(component.name);
    $(clone).find('a').attr('onclick', 'focusElement(this)').attr("ondblclick", "elementProperties(this)");
    let flowDg = $(".project-container[project_id='"+projectUuid+"']").find(".flow-diagram");
    $(flowDg.get(i)).append(clone);
}

function addSwitch(compId, i, component, projectUuid){
    var clone = $(compId).parent().clone();
    $(clone).attr('id', 'switch-element');
    $(clone).attr('style', 'width: auto; height: auto;');
    $(clone).attr('data_id', component.uuid);
    $(clone).find('span').text(component.name);
    $(clone).find('a').attr('onclick', 'focusElement(this)').attr("ondblclick", "elementProperties(this)");

    var cloneFinal = $(clone).append(switchUl);
    let flowDg = $(".project-container[project_id='"+projectUuid+"']").find(".flow-diagram");
    $(flowDg.get(i)).append(cloneFinal);
}

function addSwitchItem(component, switch_id, idSwitch){
    var clone = $(component).parent().clone();
    $(clone).attr('data_id', idSwitch);
    $('[data_id="'+ switch_id +'"]').find('ul').append(clone);
    setTimeout(() => {
        $(".switch-flow-diagram .element-item").each(function(i){
            if ($(this).attr("data_id") == idSwitch) {
                $(this).wrap("<div class='switch-flow-element'></div>")
            }
        });
    }, 10);
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
                "name": "TCP Sender",
                "adapter": "001",
                // "index": 0,
                "attribut": {
                    "code": "T001S",
                    "port": 8080,
                    "name": "aaa",
                    "thread": 1,
                    "keep_open": true,
                    "wait": 60
                }, 
                "log": {
                    "log_type": "NONE",
                    "show_in_console": false,
                    "put_on": "DB",
                },
            },
            {
                // "uuid": "0-2",
                "uuid": generateUUID(),
                "type": "receiver-nfs",
                "name": "NFS Receiver",
                "adapter": "003",
                // "index": 0,
                "attribut": {
                    "code": "N031R",
                    "path": "/opt/path", 
                    "polling": 10,
                    "retry": 60, 
                    "file_name": "getdata.csv"
                },
                "log": logDefault,
            },
            {
                // "uuid": "0-3",
                "uuid": generateUUID(),
                "type": "receiver-jdbc",
                "name": "JDBC Receiver",
                "adapter": "005",
                // "index": 0,
                "attribut": {
                    "code": "J051R",
                    "host": "192.168.1.56",
                    "port": "3306",
                    "username": "sa",
                    "password": "test",
                    "db_name": "databaseku",
                    "db_type": "mysql",
                    "polling": 20,
                    "retry": 60
                },
                "log": logDefault,
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
                "name": "NFS Sender",
                "adapter": "003",
                // "index": 0,
                "attribut": {
                    "code": "N031S",
                    "path": "/opt/dataku",
                    "polling": 10,
                    "retry": 60,
                    "file_name": "file.xml",
                    "file_event": 2,
                    "folder_name": "assets",
                },
                "log": logDefault,
            },
            {
                "uuid": "1-2",
                "type": "object-switching",
                "name": "Switching",
                // "index": 0,
                "attribut": {
                    "switch-case": "object",
                    "if-else": "object",
                    "customization": "java-code"
                },
                "log": logDefault,
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
                            "db_name": "databaseku",
                            "db_type": "mysql",
                            "polling": 20,
                            "retry": 60
                        },
                        "log": logDefault,
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
                            "db_name": "db-server",
                            "db_type": "mssql",
                            "polling": 20,
                            "retry": 60
                        },
                        "log": logDefault,
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
                            "file_name": "lolz"
                        },
                        "log": logDefault,
                    },
                ],
            },
            {
                // "uuid": "1-3",
                "uuid": generateUUID(),
                "type": "receiver-ftp",
                "name": "FTP Receiver",
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
                    "file_name": "finalCrime.img"
                },
                "log": logDefault,
            },
        ],
    },
];

var jsonData2 = [
    {
        "name": "flow1",
        // "index": 0,
        "uuid": generateUUID(),
        "components": [
            {
                "uuid": generateUUID(),
                "type": "sender-tcp",
                "name": "TCP Sender",
                "adapter": "001",
                // "index": 0,
                "attribut": {
                    "code": "T001S",
                    "port": 8080,
                    "name": "aaa",
                    "thread": 1,
                    "keep_open": true,
                    "wait": 60
                }, 
                "log": {
                    "log_type": "NONE",
                    "show_in_console": false,
                    "put_on": "DB",
                },
            },
            {
                "uuid": "1206e433f2bb42bdd2b6",
                "type": "object-mapping",
                "name": "Mapping",
                "mapping": "mapping.class44",
                "path": "55",
                "log": logDefault,
            },
            {
                "uuid": generateUUID(),
                "type": "receiver-tcp",
                "name": "tcp-test",
                "adapter": "001",
                // "index": 0,
                "attribut": {
                    "code": "T011R",
                    "port": 8080,
                    "ip": "192.168.1.39",
                    "timeout": 1,
                    "keep_open": true,
                    "timewait": 60
                }, 
                "log": logDefault,
            }
        ]
    },
];

// localStorage
// var getLocal = localStorage.getItem("jsonFlow");
// console.log("getLocal: ", getLocal);
// if(getLocal == "" || getLocal == null /* || getLocal == "[]" */){
//     console.log("empty");
//     localStorage.setItem("jsonFlow", JSON.stringify(jsonData));
// } 

// var jsonFlow = JSON.parse(localStorage.getItem("jsonFlow"));

// ===== (JSON TO UI) ALL ===
// for (let i = 0; i < jsonFlow.length; i++) {
//     const flow = jsonFlow[i];
//     var flow_name = flow.name;
//     var flow_id = flow.uuid;
//     var type_com0 = flow.components[0].type;
//     var id_com0 = flow.components[0].uuid;
                                                       
//     var components = flow.components;
//     var firstCompId = components[0].uuid;
//     var firstCompName = components[0].name;
    
//     addFlow('#'+type_com0, id_com0, firstCompName);
//     $(".flow-diagram").eq(i).attr("flow_id",flow_id);
//     $(".flow-name").eq(i).find("input").val(flow_name);
  
//     // recurComp(components, firstCompId, i);
//     flatComp(components, i);
// }

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
                addComponent("#" + type, indexFlow, component);
            } else { // component switch
                addSwitch("#object-switching", indexFlow, component);
                
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
function flatComp(components, indexFlow, projectUuid){
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
            addComponent("#" + type, indexFlow, component, projectUuid);
        } else { // component switch
            addSwitch("#object-switching", indexFlow, component, projectUuid);

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