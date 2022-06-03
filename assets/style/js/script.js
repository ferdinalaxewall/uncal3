$(document).ready(function(){

    var zoom = 1;

    $('#zoom-in').on('click', function(){
        zoom += 0.1;
        $('#flow-container').css('transform', 'scale(' + zoom + ')');
    });
        // $('#zoom-init').on('click', function(){
        //     zoom = 1;
        //     $('#flow-container').css('transform', 'scale(' + zoom + ')');
        // });
    $('#zoom-out').on('click', function(){
        zoom -= 0.1;
        $('#flow-container').css('transform', 'scale(' + zoom + ')');
    });

    $(".list-workspace").each(function(i){
        if($(this).children(). length > 1){
            $(this).addClass("has-child")
        }
    })

    $(".workspace-group").click(function(){
        if ($(this).parent().hasClass("has-child")) {
            $(this).parent().toggleClass("active");
            $(this).siblings(".list-of-project").fadeToggle();
        }
    });

    $("#properties-section").resizable();

    $(".edit-profile").click(function(){
        $("#editProfileModal").modal('show');
        if($("#editProfileModal").children().children().children().children().children().find("#main-profile").hasClass("active")){
            console.log("main-ppr")
        }
    });
    
    $(".edit-profile-tab").click(function(){
        $(".edit-profile-tab").removeClass("active");
        $(this).addClass("active");
        if ($(this).prop("id") == 'change-password') {
            $("#main-profile-form").removeClass("d-block").addClass("d-none");
            $("#change-password-form").removeClass("d-none").addClass("d-block");
        }else if($(this).prop("id") == 'main-profile'){
            $("#main-profile-form").removeClass("d-none").addClass("d-block");
            $("#change-password-form").removeClass("d-block").addClass("d-none");
        }
    });
    
    $("#logout-link .nav-link").click(function(){
        $("#logoutModal").modal('show');
    });
    
    // Context Menu Function
    $(function() {
        $.contextMenu({
            selector: '.project-name', 
            callback: function(key, options) {
                if (key == 'edit'){
                    $("#renameProjectModal").modal('show');
                }else if(key == 'delete'){
                    $("#deleteProjectModal").modal('show');
                }
            },
            items: {
                "edit": {name: "Rename", icon: "edit"},
                "delete": {name: "Delete", icon: "delete"}
            }
        }); 

        $.contextMenu({
            selector: '.workspace-link', 
            callback: function(key, options) {
                if (key == 'edit'){
                    $("#renameFolderModal").modal('show');
                }else if(key == 'delete'){
                    $("#deleteFolderModal").modal('show');
                }
            },
            items: {
                "edit": {name: "Rename", icon: "edit"},
                "delete": {name: "Delete", icon: "delete"}
            }
        });  
        
        $.contextMenu({
            selector: '.flow-diagram .element-item', 
            callback: function(key, options) {
                if(key == 'delete'){
                    thisComp = $(this);
                    deleteComponent(thisComp);
                }
            },
            items: {
                "delete": {name: "Delete", icon: "delete"}
            }
        });

        $.contextMenu({
            selector: '.workspace-name', 
            callback: function(key, options) {
                if(key == 'delete'){
                    deleteWorkspace($(this));
                }else if(key == 'add'){
                    createNewProject($(this));
                }else if(key == 'edit'){
                    renameWorkspaceName($(this));
                }
            },
            items: {
                "add": {name: "Create Project", icon: "add"},
                "edit": {name: "Rename", icon: "edit"},
                "delete": {name: "Delete", icon: "delete"}
            }
        });  

    });

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
    
    $("#flow-map-group .list-item span").click(function(e){
        $(this).parent().toggleClass("active");
        $(this).siblings(".list-sub-item").fadeToggle();
    });

    $(".list-sub-item").parent().addClass("has-child");

    $(".modal .menu-name").click(function(){
        $(".modal .menu-name").removeClass("active");
        $(this).addClass("active")
        if($(this).prop("id") == 'notes-properties'){
            $("#properties").hide();
            $("#notes").show();
            $("#input-output").removeClass("d-flex").addClass("d-none");
            $(".modal .error-info").hide();
        }else if($(this).prop("id") == 'general-properties'){
            $("#properties").show();
            $("#notes").hide();
            $("#input-output").removeClass("d-flex").addClass("d-none");
            $(".modal .error-info").show();
        }else if($(this).prop("id") == 'input-output-properties'){
            $("#properties").hide();
            $("#notes").hide();
            $("#input-output").removeClass("d-none").addClass("d-flex");
            $(".modal .error-info").hide();

        }
    });

    $(".minimize-properties").click(function(){
        $(this).toggleClass("minimize");
        $(this).parent().parent().toggleClass("minimized")
    });

    $(".create-new-workspace").click(function(){
        $("#createWorkspaceModal").modal('show');
    })
    
    var sidebarCollapse = false;
    
    $(".sidebar-toggle").click(function(){
        $(".sidebar").toggleClass("collapsed")
        if(sidebarCollapse == false){
            sidebarCollapse = true;
            $("#flow-section").removeClass("col-md-8").addClass("col-md-7");
            $("#properties-section").removeClass("col-md-8").addClass("col-md-7");
            $("#palette-section").removeClass("col-md-4").addClass("col-md-3");
            $("#flow-map-section").removeClass("col-md-4").addClass("col-md-3");
            $(".sidebar-content").fadeIn();
        }else{
            sidebarCollapse = false;
            $("#flow-section").removeClass("col-md-7").addClass("col-md-8");
            $("#properties-section").removeClass("col-md-7").addClass("col-md-8");
            $("#palette-section").removeClass("col-md-3").addClass("col-md-4");
            $("#flow-map-section").removeClass("col-md-3").addClass("col-md-4");
            $(".sidebar-content").fadeOut();
        }
    });

    $(".dropzone").change(function(){
        readImageFile(this);
    });

    $(".dropzone-wrapper").on('dragover', function(e){
        e.preventDefault();
        e.stopPropagation();
        $(this).addClass("dragover");
    });
    
    $(".dropzone-wrapper").on('dragleave', function(e){
        e.preventDefault();
        e.stopPropagation();
        $(this).removeClass("dragover");
    });

    $(".reset-image").click(function(){
        var previewBody = $(this).parent().siblings(".preview-body");
        var previewZone = $(this).parent().parent();
        var dropzone = $(this).parent().parent().siblings(".dropzone-wrapper").children(".dropzone");

        previewBody.empty();
        previewZone.addClass("hidden");
        resetDropzone(dropzone)
    });

});

function resetDropzone(e) {
    e.wrap('<form class="wrap-form">').closest('form').get(0).reset();
    e.unwrap();
}

function readImageFile(input){
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e){
            var imagePreview = 
                '<img height="100" src = "' + e.target.result + '" />' + 
                '<p>' + input.files[0].name + '</p>';
            var wrapperZone = $(input).parent();
            var previewZone = $(input).parent().siblings(".preview-zone");
            var previewBody = $(input).parent().siblings(".preview-zone").children(".preview-body");

            wrapperZone.removeClass("dragover")
            previewZone.removeClass("hidden");
            previewBody.empty();
            previewBody.append(imagePreview);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function createNewProject(wsp){
    $("#createProjectModal").modal('show');
}

function renameWorkspaceName(wsp){
    $("#renameWorkspaceModal").modal('show');
    $("#renameWorkspaceModal").find("#input-workspace-name").val(wsp.text());
}

function deleteWorkspace(wsp){
    $("#deleteWorkspaceModal").modal('show')
    $("#deleteWorkspace").click(function(){
        $(wsp).parent().parent().remove();
        $("#deleteWorkspaceModal").modal('hide')
    });
}

function searchFolderFunc(){
    var workspaceBody, workspaceTitle, textValue, inputField, filter, workspaceBox;
    workspaceBox = document.querySelectorAll(".workspace-box");
    workspaceBody = document.querySelectorAll(".workspace-body");
    inputField = document.getElementById("search-workspace");
    filter = inputField.value.toUpperCase();
    for (var index = 0; index < workspaceBody.length; index++) {
        workspaceTitle = workspaceBody[index].getElementsByTagName("h5")[0];
        textValue = workspaceTitle.textContent || workspaceTitle.innerText;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            workspaceBox[index].style.display = "block";
        } else {
            workspaceBox[index].style.display = "none";
        }
    }
}

function searchElementsFunc(){
    var inputField, filter, elementList, elementItem, elementBox, i, txtValue;
    inputField = document.querySelector('.search-elements');
    elementList = document.querySelector(".elements-list");
    elementItem = elementList.getElementsByTagName('li');
    filter = inputField.value.toUpperCase();

    for (i = 0; i < elementItem.length; i++) {
        elementBox = elementItem[i].getElementsByTagName("a")[0];
        txtValue = elementBox.textContent || elementBox.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
        elementItem[i].style.display = "";
        } else {
        elementItem[i].style.display = "none";
        }
    }
}

function searchWorkspaceFunc(){
    var workspaceBody, workspaceTitle, textValue, inputField, filter, workspaceBox;
    workspaceBox = document.querySelectorAll(".list-workspace");
    workspaceBody = document.querySelectorAll(".workspace-group");
    inputField = document.querySelector(".input-search-workspace");
    filter = inputField.value.toUpperCase();
    for (var index = 0; index < workspaceBody.length; index++) {
        workspaceTitle = workspaceBody[index].getElementsByTagName("p")[0];
        textValue = workspaceTitle.textContent || workspaceTitle.innerText;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            workspaceBox[index].style.display = "block";
        } else {
            workspaceBox[index].style.display = "none";
        }
    }
}


function elementProperties(el){
    // $("#propertiesModal").modal('show'); 
    var floatProp = '' + 
    '<div class="floating-properties ui-draggable ui-draggable-handle" style="top:0;">' + 
    '      <div class="floating-properties-header">' + 
    '        <h5 class="properties-title" id="propertiesModalTitle">Flow Properties</h5>' + 
    '          <button type="button" class="close close-element-properties">' + 
    '            <span aria-hidden="true">&times;</span>' + 
    '          </button>' + 
    '      </div>' + 
    '      <div class="properties-body">' + 
    '        <div class="row justify-content-center">' + 
    '                <div class="col-md-11" id="properties-modal-content">' + 
    '                  <div class="menu-group">' + 
    '                    <a href="#" class="menu-name active" id="general-properties">General</a>' + 
    '                    <a href="#" class="menu-name" id="notes-properties">Notes</a>' + 
    '                    <a href="#" class="menu-name" id="input-output-properties">Input/Output</a>' + 
    '                  </div>' + 
    '                </div>' + 
    '              </div>' + 
    '              <div id="properties">' + 
    '              </div>' + 
    '              <div id="notes" style="display: none;">' + 
    '                notes' + 
    '              </div>' + 
    '              <div id="input-output" class="row justify-content-center" style="display: none;">' + 
    '                <div class="col-md-9 input-output-menu">' + 
    '                  <div class="menu-group d-flex justify-content-center align-items-center">' + 
    '                    <a href="#" class="input-output-menu-name active">Input</a>' + 
    '                    <a href="#" class="input-output-menu-name">Output</a>' + 
    '                  </div>' + 
    '                </div>' + 
    '                <div class="col-md-11 mt-3 input-output-content">' + 
    '                  <ul class="list-group" id="input-output-properties-group">' + 
    '                    <li class="list-item">' + 
    '                      <span> Payload </span>' + 
    '                      <p class="list-sub-item">Unknown : <span class="unhighlighted-text">Unknown</span></p>' + 
    '                      <p class="list-sub-item">Unknown : <span class="unhighlighted-text">Unknown</span></p>' + 
    '                      <p class="list-sub-item">Unknown : <span class="unhighlighted-text">Unknown</span></p>' + 
    '                    </li>' + 
    '                    <li class="list-item">' + 
    '                      <span>Flow Variables</span>' + 
    '                    </li>' + 
    '                    <li class="list-item">' + 
    '                      <span>Session Variable</span>' + 
    '                    </li>' + 
    '                    <li class="list-item">' + 
    '                      <span>Inbound Properties</span>' + 
    '                    </li>' + 
    '                    <li class="list-item">' + 
    '                      <span>Outbound Properties</span>' + 
    '                    </li>' + 
    '                    <li class="list-item">' + 
    '                      <span>Record Variables</span>' + 
    '                    </li>' + 
    '                  </ul>' + 
    '                </div>' + 
    '              </div>  ' + 
    '      </div>' + 
    '      <div class="properties-footer">' + 
    '        <button type="button" class="btn btn-primary" id="saveFlowName">Save changes</button>' + 
    '      </div>' + 
    '    </div>' + 
    '';

    $("body").append(floatProp);

    var elPropName = $(el).children("span").text();
    console.log("Elements Name", elPropName)

    setTimeout(() => {
        
        $(".floating-properties").each(function(ind){
            $(".floating-properties").eq(ind).css({
                "left" : 310 * ind + "px"
            });
            $(".floating-properties").eq(ind).attr("id", "floating-properties-"+ind)
            $(".floating-properties").eq(ind).find("#properties").attr("class", "properties-"+ind)
            setTimeout(() => {
                if($(this).find(".properties-"+ind).children().length == 0){
                    $(this).find(".properties-"+ind).load("components/"+getTypeComp+".html");
                    $(this).find(".properties-title").text(elPropName)
                }

                $(this).find(".menu-name").click(function(){
                    $("#floating-properties-"+ind).find(".menu-name").removeClass("active");
                    $(this).addClass("active");
                    if($(this).prop("id") == 'notes-properties'){
                        $(this).parents("#floating-properties-"+ind).find(".properties-"+ind).hide();
                        $(this).parents("#floating-properties-"+ind).find("#notes").show();
                        $(this).parents("#floating-properties-"+ind).find("#input-output").removeClass("d-flex").addClass("d-none");
                        $(this).parents("#floating-properties-"+ind).find(".floating-properties .error-info").hide();
                    }else if($(this).prop("id") == 'general-properties'){
                        $(this).parents("#floating-properties-"+ind).find(".properties-"+ind).show();
                        $(this).parents("#floating-properties-"+ind).find("#notes").hide();
                        $(this).parents("#floating-properties-"+ind).find("#input-output").removeClass("d-flex").addClass("d-none");
                        $(this).parents("#floating-properties-"+ind).find(".floating-properties .error-info").show();
                    }else if($(this).prop("id") == 'input-output-properties'){
                        $(this).parents("#floating-properties-"+ind).find(".properties-"+ind).hide();
                        $(this).parents("#floating-properties-"+ind).find("#notes").hide();
                        $(this).parents("#floating-properties-"+ind).find("#input-output").removeClass("d-none").addClass("d-flex");
                        $(this).parents("#floating-properties-"+ind).find(".floating-properties .error-info").hide();

                        var menuName = $(this).parents("#floating-properties-"+ind).find(".input-output-menu-name");
                        $(menuName).click(function(){
                            $("#floating-properties-"+ind).find(".input-output-menu-name").removeClass("active");
                            $(this).addClass("active")
                        });
                        
                        var spanListItem = $(this).parents("#floating-properties-"+ind).find(".list-item span");
                        $(spanListItem).click(function(){
                            $(this).parent().toggleClass("active");
                            $(this).siblings(".list-sub-item").fadeToggle();
                        });

                        var listItem = $(this).parents("#floating-properties-"+ind).find(".list-item");
                        $(listItem).each(function(index){
                            if ($(this).children(".list-sub-item").length > 0) {
                                $(this).addClass("has-child")
                            }
                        })
                    }
                });
            }, 100);
        }) 
        $(".floating-properties").draggable({
            cursor : "move", 
            cursorAt: { top: 0, left: 150 },
            containment : "body",
            scroll : false
        });

        $(".close-element-properties").click(function(){
            $(this).parent().parent().fadeOut();
            setTimeout(() => {
                $(this).parent().parent().remove();
            }, 500);
        })
        
        if ($(".floating-properties").length > 3) {
            $(".floating-properties")[0].remove()
        }

    }, 100);

    // auto open by file name
    var getTypeComp = $(el).prop("id");

    // fill data ke properties (auto nama id)
    var liComp = $(el).parent();
    var data_id = liComp.attr("data_id");
    var indexFlow = liComp.parent().parent().children("ul").index(liComp.parent());
    console.log('focusElement. data_id', data_id, "indexFlow", indexFlow);
    var jsonFlow = JSON.parse(localStorage.getItem("jsonFlow"));
    console.log("focusElement. jsonFlow", jsonFlow[indexFlow]);
    
    function recurJsonFlow(jsonFlowIndex){
        var components = jsonFlowIndex.components;
        for (let x = 0; x < components.length; x++) {
            const comp = components[x];
            var name = comp.name;
            var type = comp.type;
            var uuid = comp.uuid;
            var attribut = comp.attribut;
            
            if(data_id == uuid){
                console.log("name:", name, "| type:", type, "| uuid:", uuid, "| attribut:", attribut);
                for (const key in attribut) {
                    var value = attribut[key];
                    // console.log('key', key, 'attribut', attribut[key]);
                    var finalData = type + '-' + key;
                    var typeValue = typeof value;
                    console.log('finalData. value:', value, '| type:', typeValue);

                   if(typeValue == 'boolean'){
                        if(value == true){
                            $("#"+finalData).attr('checked', true);
                        } else {
                            $("#"+finalData).attr('checked', false);
                        }
                    } else {
                        $("#"+finalData).val(value);
                    }
                }
            }

            if(type == 'object-switching'){
                recurJsonFlow(comp);
            }
        }
    }

    setTimeout(function(){
        // isi data ke properties
        recurJsonFlow(jsonFlow[indexFlow]);

        // edit properties
        console.log('edit', '#'+getTypeComp+"-page");
        $('#'+getTypeComp+"-page").attr("prop_id", data_id);

        $('#'+getTypeComp+"-page").find("input").unbind("click");
        $('#'+getTypeComp+"-page").find("input").each(function(){
            // console.log("edit:", $(this));

            // edit component di local storage
            $(this).keyup(function() {
                var idThis = $(this).attr('id');
                var valueThis = $(this).val();
                var prop_id = $(this).parent().parent().parent().attr('prop_id');
                // console.log("edit. idThis:", idThis, "| valueThis:", valueThis, "| prop_id:", prop_id);

                var jsonFlowThis = JSON.parse(localStorage.getItem("jsonFlow"));
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
    
                            if(prop_id == uuid){
                                var propName = idThis.replace(type + "-", "");
                                console.log("propName: ", propName);
                                attribut[propName] = valueThis;
                                // console.log("findComp. name:", name, "| type:", type, "| uuid:", uuid, "| attribut:", attribut, "| jsonFlowThis:", jsonFlowThis);
                                localStorage.setItem("jsonFlow", JSON.stringify(jsonFlowThis));
                            }
                        }
                    }
                }
            });
        });
        
    }, 300);
}

function deleteComponent(comp) {    
    // validasi hapus properties
    var data_id = comp.attr("data_id");
    var prop_id = $("#properties").children(":first").attr("prop_id");

    // hapus element
    comp.remove();
    if ($(".flow-diagram").children().length == 0) {
        $(".flow-diagram, br").remove();
    }
    
    if(data_id != undefined){
        $("#properties").empty();
        
        // hapus component di localStorage
        deleteJsonFlow(prop_id);
    }
}

function focusElement(e) {
    $(".flow-diagram .element-item, .flow-diagram .element-box").removeClass("focus");
    setTimeout(function(){
      $(e).toggleClass("focus")
      $(e).parent().toggleClass("focus");
    }, 1);
    
    // klik keyboard di component
    $(document).keydown(function(e){
        var key = (e.keyCode ? e.keyCode : e.which);
        if (key === 8) {
            // validasi hapus properties
            var getEl = $(".element-item.focus");
            var data_id = getEl.attr("data_id");
            var prop_id = $("#properties").children(":first").attr("prop_id");

            // hapus element
            $(".element-item.focus").remove();
            if ($(".flow-diagram").children().length == 0) {
                $(".flow-diagram, br").remove();
            }
            
            if(data_id != undefined){
                $("#properties").empty();
                
                // hapus component di localStorage
                deleteJsonFlow(prop_id);
            }
        }
    });
   
    $(document).click(function(a){
      if (!e.contains(a.target)) {
        $(".flow-diagram .element-item, .flow-diagram .element-box").removeClass("focus");
      }
    });
}

function deleteJsonFlow(data_id) {
    var jsonFlowThis = JSON.parse(localStorage.getItem("jsonFlow"));
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
                    console.log("findComp del. name:", name, "| type:", type, "| uuid:", uuid, "| attribut:", attribut, "| jsonFlowThis:", jsonFlowThis);
                    components.splice(x, 1);
                    localStorage.setItem("jsonFlow", JSON.stringify(jsonFlowThis));
                }
            }
        }
    }
}

$("#flow-map-tab .tab-name").click(function(e){
    $("#flow-map-tab .tab-name").removeClass("active");

    var $this = $(this);
    if (!$this.hasClass("active")) {
        $this.addClass("active");
    }

    e.preventDefault();

});

function minimizeFlow(minimize){
    $(minimize).toggleClass("minimize");
    $(minimize).parent().siblings(".element-item").fadeToggle();
    $(minimize).parent().parent().toggleClass("minimize-flow-diagram");
    setTimeout(() => {
        if ($(minimize).parent().parent().hasClass("minimize-flow-diagram")) {
            setTimeout(() => {
                $(minimize).parent().parent().css({
                    "visibility" : "hidden"
                });
            }, 100);
        } else {
            $(minimize).parent().parent().css({
                "visibility" : "visible"
            });
        }
    }, 100);
}

function closeFlow(thisClose){
    var flow_id = $(thisClose).parent().parent().attr("flow_id");
    var jsonFlowThis = JSON.parse(localStorage.getItem("jsonFlow"));
    for (let x = 0; x < jsonFlowThis.length; x++) {
        var flow = jsonFlowThis[x];
        if(flow_id == flow.uuid){
            jsonFlowThis.splice(x, 1);
            localStorage.setItem("jsonFlow", JSON.stringify(jsonFlowThis));
        }
    }

    $(thisClose).parent().parent().remove();
}

function renameFlow(flowName){
    $(flowName).removeAttr("readonly");
}

function toReadonly(flowName){
    $(flowName).attr("readonly", "true");

    // edit json flow name    
    let flow_id = $(flowName).parent().parent().attr("flow_id")
    var jsonFlowThis = JSON.parse(localStorage.getItem("jsonFlow"));
    for (let x = 0; x < jsonFlowThis.length; x++) {
        var flow = jsonFlowThis[x];
        if(flow_id == flow.uuid){
            let newName = $(flowName).val();
            flow.name = newName;
            localStorage.setItem("jsonFlow", JSON.stringify(jsonFlowThis));
            // $(flowName).val(newName);
            console.log(flow.name)
            setTimeout(() => {
                $(flowName).val(newName)
            }, 100);
        }
    }
}

function flowTyping(e) {
    $(e).attr('size', $(e).val().length + 1);
    $(e).css("width", "auto");
}

// project
$(document).ready(function () {
    // contoh json project auto fill
    let getJsonProject = localStorage.getItem("jsonProject");
    console.log("getJsonProject: ", getJsonProject);
    if(getJsonProject == "" || getJsonProject == null /* || getJsonProject == "[]" */){
        console.log("jsonProject empty");
        // let dataProject = [{
        //     "projectName": "projectA",
        //     "isOpen": true,
        //     "files": [
        //         "file a", "file b", "file c"
        //     ]
        // }];
        // localStorage.setItem("jsonProject", JSON.stringify(dataProject));
    }

    // buat html file
    function addFileHtml(item) {
        let result = "";
        result += '<li class="list-project">';
        result += '<a href="#" class="project-name">';
        result +=  '<img src="./assets/icon/uncal-icon.svg" alt="Uncal Icon">';
        result +=  '<span class="project-name">'+item+'</span>';
        result += '</a></li>';
        return result;
    }

    // show jsonProject ke sidebar
    let jsonProject = JSON.parse(localStorage.getItem("jsonProject"));
    let listHtml = "";
    for (let i = 0; i < jsonProject.length; i++) {
        const project = jsonProject[i];
        if(project.isOpen){
            let files = project.files;
            $(".folder-name").text(project.projectName);
            for (let j = 0; j < files.length; j++) {
                listHtml += addFileHtml(files[j]);
            }
        }
    }
    $(".list-group-project").empty();
    $(".list-group-project").append(listHtml);

    // new project
    $("#createProjectName").click(function (e) { 
        let newName = $("#input-project-name").val();
        console.log("createProjectName. newName:", newName);

        let jsonProjectLocal = JSON.parse(localStorage.getItem("jsonProject"));
        for (let i = 0; i < jsonProjectLocal.length; i++) {
            const project = jsonProjectLocal[i];
            if(project.isOpen){
                project.files.push(newName);
            }
        }
        localStorage.setItem("jsonProject", JSON.stringify(jsonProjectLocal));
        $(".list-group-project").append(addFileHtml(newName));
        $("#createProjectModal").modal("hide");
    });
});