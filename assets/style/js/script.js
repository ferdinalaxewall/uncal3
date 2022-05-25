$(window).on("load", function() {
	$(".loader").delay(2000).fadeOut("slow");
    $(".pre-loader").delay(2000).fadeOut("slow");
})

$(document).ready(function(){

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
    
    $("#input-output-properties-group .list-item span").click(function(e){
        $(this).parent().toggleClass("active");
    });
    
    $("#flow-map-group .list-item span").click(function(e){
        $(this).parent().toggleClass("active");
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

    $(".modal .input-output-menu-name").click(function(){
        $(".modal .input-output-menu-name").removeClass("active");
        $(this).addClass("active")
    });

    $(".minimize-properties").click(function(){
        $(this).toggleClass("minimize");
        $(this).parent().parent().toggleClass("minimized")
    });

    $(".create-new-project").click(function(){
        $("#createProjectModal").modal('show');
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
});

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

function elementProperties(el){
    $("#propertiesModal").modal('show'); 

    // auto open by file name
    var getTypeComp = $(el).prop("id");
    $("#properties").empty();
    $("#properties").load("components/"+getTypeComp+".html");
    
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
            var id = comp.id;
            var properties = comp.properties;
            
            if(data_id == id){
                console.log("name:", name, "| type:", type, "| id:", id, "| properties:", properties);
                for (const key in properties) {
                    var value = properties[key];
                    // console.log('key', key, 'properties', properties[key]);
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
                            var id = comp.id;
                            var properties = comp.properties;
    
                            if(prop_id == id){
                                var propName = idThis.replace(type + "-", "");
                                console.log("propName: ", propName);
                                properties[propName] = valueThis;
                                // console.log("findComp. name:", name, "| type:", type, "| id:", id, "| properties:", properties, "| jsonFlowThis:", jsonFlowThis);
                                localStorage.setItem("jsonFlow", JSON.stringify(jsonFlowThis));
                            }
                        }
                    }
                }
            });
        });
        
    }, 300);
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
                var id = comp.id;
                var properties = comp.properties;

                if(data_id == id){
                    console.log("findComp del. name:", name, "| type:", type, "| id:", id, "| properties:", properties, "| jsonFlowThis:", jsonFlowThis);
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
        if(flow_id == flow.id){
            jsonFlowThis.splice(x, 1);
            localStorage.setItem("jsonFlow", JSON.stringify(jsonFlowThis));
        }
    }

    $(thisClose).parent().parent().remove();
}

function renameFlow(flowName){
    $("#renameFlowModal").modal('show');
    $("#input-flow-name").val($(flowName).text());

    // edit json flow name    
    let flow_id = $(flowName).parent().parent().attr("flow_id")
    $('#saveFlowName').unbind("click");
    $('#saveFlowName').click(function(){
        var jsonFlowThis = JSON.parse(localStorage.getItem("jsonFlow"));
        for (let x = 0; x < jsonFlowThis.length; x++) {
            var flow = jsonFlowThis[x];
            if(flow_id == flow.id){
                let newName = $("#input-flow-name").val();
                flow.name = newName;
                localStorage.setItem("jsonFlow", JSON.stringify(jsonFlowThis));
                $(flowName).text(newName);
                $("#renameFlowModal").modal('hide');
            }
        }
    });
}

// project
$(document).ready(function () {
    // contoh json project auto fill
    let getJsonProject = localStorage.getItem("jsonProject");
    console.log("getJsonProject: ", getJsonProject);
    if(getJsonProject == "" || getJsonProject == null /* || getJsonProject == "[]" */){
        console.log("jsonProject empty");
        let dataProject = [{
            "projectName": "projectA",
            "isOpen": true,
            "files": [
                "file a", "file b", "file c"
            ]
        }];
        localStorage.setItem("jsonProject", JSON.stringify(dataProject));
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