$(document).ready(function(){

    // var zoom = 1;
    // var toTop = 0;

    // // Zoom in and Zoom Out
    // $('#zoom-in').on('click', function(){
    //     zoom += 0.1;
    //     toTop += 13;
    //     $(".flow-diagram").each(function(i){
    //         // var index = i+1;
    //         // console.log(index * ((index + 1) / 2))
    //         $(".flow-diagram").eq(i).css({
    //             "transform" : "translateY("+ toTop * i + "px) scale(" + zoom + ")"
    //         });
    //     });
    // });
    //     // $('#zoom-init').on('click', function(){
    //     //     zoom = 1;
    //     //     $('.flow-diagram').css('transform', 'scale(' + zoom + ')');
    //     // });
    // $('#zoom-out').on('click', function(){
    //     zoom -= 0.1;
    //     toTop -= 13;
    //     $(".flow-diagram").each(function(i){
    //         // var index = i+1;
    //         // console.log(index * ((index + 1) / 2))
    //         // $(".canvas").css({
    //         //     "transform" : "translateY("+ toTop * i + "px) scale(" + zoom + ")"
    //         // })
    //         $(".flow-diagram").eq(i).css({
    //             "transform" : "translateY("+ toTop * i + "px) scale(" + zoom + ")"
    //         });
    //     });
        
    // });

    // Check modal
    $(".modal").on('shown.bs.modal', function(event){
        var buttonPrimary = $(this).find(".btn-primary");
        var buttonDanger = $(this).find(".btn-danger");
        console.log(buttonPrimary, buttonDanger)

        $(".modal").off('keypress').on('keypress', function(e){
            var keycode = (e.keyCode ? e.keyCode : e.which);
            if(keycode == '13'){
                if (buttonPrimary.length == 1) {
                    $(buttonPrimary).click();
                }else if(buttonDanger.length == 1){
                    $(buttonDanger).click();
                }
            }  
        })
        
    })

    // Check if the workspace have a child
    $(".list-folder").each(function(i){
        if($(this).children(). length > 1){
            $(this).addClass("has-child")
        }
    })

    // Edit Profile Modal
    $(".edit-profile").click(function(){
        $("#editProfileModal").modal('show');

        $('#editProfileModal').on('hidden.bs.modal', function(e){
            $("#editProfileModal #change-password-form").find("input").val("");
            $("#editProfileModal #change-password-form").find(".input-group").removeClass("is-valid").removeClass("is-invalid");

            if ($(".edit-profile-tab#change-password").hasClass("active")) {
                $(".edit-profile-tab#change-password").removeClass("active");
                $(".edit-profile-tab#main-profile").addClass("active");

                $("#main-profile-form").removeClass("d-none").addClass("d-block");
                $("#change-password-form").removeClass("d-block").addClass("d-none");
            }
        });
        // var inputField = $(".")
        // validateProfileModal
    });

    // Edit Profile Tab in Edit Profile Modal
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

    // $("#flow-tab .project-tab").click(function(e){
    //     $("#flow-tab .project-tab").removeClass("active");

    //     var $this = $(this);
    //     if (!$this.hasClass("active")) {
    //         $this.addClass("active");
    //     }

    //     e.preventDefault();

    // });
    
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



        var inputField, filter, elementList, elementItem, elementBox, i, txtValue;
        inputField = document.querySelector('.search-elements');
        elementList = document.querySelector(".elements-list");
        filter = inputField.value.toUpperCase();
        
        setTimeout(() => {
            if ($("#all-category").hasClass("active")) {
                elementItem = elementList.getElementsByTagName('li');
            }else if ($("#sender-category").hasClass("active")) {
                elementItem = elementList.querySelectorAll('#sender');
            }else if($("#receiver-category").hasClass("active")){
                elementItem = elementList.querySelectorAll('#receiver');
            }else if($("#object-category").hasClass("active")){
                elementItem = elementList.querySelectorAll('#object');
            }
    
            for (i = 0; i < elementItem.length; i++) {
                elementBox = elementItem[i].getElementsByTagName("a")[0];
                txtValue = elementBox.textContent || elementBox.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                elementItem[i].style.display = "";
                } else {
                elementItem[i].style.display = "none";
                }
            }
        }, 100);
    
        e.preventDefault();
        
    });

    $("#properties-tab .tab-name").click(function(e){
        $("#properties-tab .tab-name").removeClass("active");

        var $this = $(this);
        if (!$this.hasClass("active")) {
            $this.addClass("active");
        }

        if ($this.parents("#properties-section").hasClass("minimized")) {
            $this.parents("#properties-section").toggleClass("minimized");
            $this.parents("#properties-section").siblings("#flow-map-section").toggleClass("minimized");
            $this.parents("#properties-section").siblings("#flow-section, #palette-section").toggleClass("maximize");
        }

        e.preventDefault();

    });

    $("#flow-map-tab .tab-name").click(function(e){
        $("#flow-map-tab .tab-name").removeClass("active");

        var $this = $(this);
        if (!$this.hasClass("active")) {
            $this.addClass("active");
        }

        setTimeout(() => {
            if($this.prop("id") == "element-properties"){
                $(".element-properties-content").removeClass("d-none");
                $(".outline-content").addClass("d-none");
            }else if ($this.prop("id") == "outline") {
                $(".element-properties-content").addClass("d-none");
                $(".outline-content").removeClass("d-none");
            }
        }, 25);

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
    
    $("#flow-map-group .list-item").click(function(e){
        $(this).toggleClass("active");
        $(this).children(".list-sub-item").fadeToggle();
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
            $("#log").hide();
        }else if($(this).prop("id") == 'general-properties'){
            $("#properties").show();
            $("#notes").hide();
            $("#input-output").removeClass("d-flex").addClass("d-none");
            $(".modal .error-info").show();
            $("#log").hide();
        }else if($(this).prop("id") == 'input-output-properties'){
            $("#properties").hide();
            $("#notes").hide();
            $("#input-output").removeClass("d-none").addClass("d-flex");
            $(".modal .error-info").hide();
            $("#log").hide();
        }else if($(this).prop("id") == 'log-properties'){
            $("#properties").hide();
            $("#notes").hide();
            $("#input-output").removeClass("d-flex").addClass("d-none");
            $(".modal .error-info").hide();
            $("#log").show();
        }
    });

    $(".minimize-properties").click(function(){
        $(this).toggleClass("minimize");
        $(this).parent().parent().toggleClass("minimized");
    });

    $(".minimize-section").click(function(){
        $(this).toggleClass("minimized");
        $(this).parent().toggleClass("minimized");
        $(this).parent().siblings("#flow-map-section").toggleClass("minimized");
        $(this).parent().siblings("#flow-section, #palette-section").toggleClass("maximize");
    });

    $(".create-new-folder").click(function(){
        $("#createFolderModal").modal('show');
        $("#createFolderModal").find("#input-folder-name").val("");
        $("#createFolderModal").find(".btn-primary").attr("disabled", true);
        $("#createFolderModal").find(".input-group").removeClass("is-invalid").removeClass("is-valid");   
    });

    $("#create-new-workspace").click(function(){
        $("#createWorkspaceModal").modal('show');
    })
    
    $(".create-new-project").click(function(){
        createNewProject();
    });

    // Set Workspace Content Type (Box or List)

    $(".set-type-content").click(function(){
        $(".set-type-content").removeClass("active");
        $(this).addClass("active");

        if ($(this).attr("id") == "list-content-button") {
            $(".workspace-box").removeClass("col-lg-3").addClass("list-content");

            // Set to localstorage
            localStorage.setItem("content-type", "list")
        }else if($(this).attr("id") == "box-content-button"){
            $(".workspace-box").removeClass("list-content").addClass("col-lg-3")

            // Set to localstorage
            localStorage.setItem("content-type", "box")
        }
    });

    // Get Content Type from Localstrorage
    var contentType = localStorage.getItem("content-type");

    if (contentType == "box") {
        $("#list-content-button").removeClass("active");
        $("#box-content-button").addClass("active");
        $(".workspace-box").removeClass("list-content").addClass("col-lg-3");
    }else if (contentType == "list") {
        $("#list-content-button").addClass("active");
        $("#box-content-button").removeClass("active");
        $(".workspace-box").removeClass("col-lg-3").addClass("list-content");
    }

    // var sidebarCollapse = false;

    // $(".sidebar-toggle").click(function(){
    //     $(".sidebar").toggleClass("collapsed")
    //     if(sidebarCollapse == false){
    //         sidebarCollapse = true;
    //         $("#flow-section").removeClass("col-md-9").addClass("col-md-7");
    //         $("#properties-section").removeClass("col-md-9").addClass("col-md-7");
    //         $(".sidebar-content").fadeIn();
    //     }else{
    //         sidebarCollapse = false;
    //         $("#flow-section").removeClass("col-md-7").addClass("col-md-9");
    //         $("#properties-section").removeClass("col-md-7").addClass("col-md-9");
    //         $(".sidebar-content").fadeOut();
    //     }
    // });

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


var sidebarCollapse = false;
    
function toggleSidebar(button){

    var navigationBar = document.getElementById("navigation-bar");
    var sidebarMenu = document.getElementById("sidebar-menu")

    $(".sidebar").toggleClass("collapsed");
    if(sidebarCollapse == false){
        sidebarCollapse = true;
        if ($("#flow-section").hasClass("col-md-9")) {
            $("#flow-section").removeClass("col-md-9").addClass("col-md-7");
            $("#properties-section").removeClass("col-md-9").addClass("col-md-7");
            $(".sidebar-content").fadeIn();
            setTimeout(() => {
                // console.log($("body").width())
                if ($("body").width() < 1280) {
                    if (!$(".sidebar").hasClass("collapsed")) {
                        $(document).click(function(event){
                            if (!sidebarMenu.contains(event.target) && !navigationBar.contains(event.target)) {
                                sidebarCollapse = false;
                                $(".sidebar").addClass("collapsed")
                                $("#flow-section").removeClass("col-md-7").addClass("col-md-9");
                                $("#properties-section").removeClass("col-md-7").addClass("col-md-9");
                                $(".sidebar-content").fadeOut();
                            }
                        });
                    }
                }
            }, 100);
        } else if ($("#flow-section").hasClass("col-md-12")){
            $("#flow-section").removeClass("col-md-12").addClass("col-md-10");
            $("#properties-section").removeClass("col-md-9").addClass("col-md-7");
            $(".sidebar-content").fadeIn();
            setTimeout(() => {
                // console.log($("body").width())
                if ($("body").width() < 1280) {
                    if (!$(".sidebar").hasClass("collapsed")) {
                        $(document).click(function(event){
                            if (!sidebarMenu.contains(event.target) && !navigationBar.contains(event.target)) {
                                sidebarCollapse = false;
                                $(".sidebar").addClass("collapsed")
                                $("#flow-section").removeClass("col-md-10").addClass("col-md-12");
                                $("#properties-section").removeClass("col-md-7").addClass("col-md-9");
                                $(".sidebar-content").fadeOut();
                            }
                        });
                    }
                }
            }, 100);
        }

    }else{
        sidebarCollapse = false;
        if ($("#flow-section").hasClass("col-md-10")) {
            $("#flow-section").removeClass("col-md-10").addClass("col-md-12");
            $("#properties-section").removeClass("col-md-7").addClass("col-md-9");
            $(".sidebar-content").fadeOut();
        }else if($("#flow-section").hasClass("col-md-12")){
            $("#flow-section").removeClass("col-md-12").addClass("col-md-10");
            $("#properties-section").removeClass("col-md-7").addClass("col-md-9");
            $(".sidebar-content").fadeOut();
        }else if ($("#flow-section").hasClass("col-md-7")) {
            $("#flow-section").removeClass("col-md-7").addClass("col-md-9");
            $("#properties-section").removeClass("col-md-7").addClass("col-md-9");
            $(".sidebar-content").fadeOut();
        }
    }
}


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


    // Context Menu Function
    $(function() {
        $.contextMenu({
            selector: 'a.project-name', 
            callback: function(key, options) {
                if (key == 'edit'){
                    renameProject($(this), $(this).parents(".list-project").attr("file_id"), $(this).parents(".list-folder").attr("folder_id"));
                }else if(key == 'delete'){
                    deleteProject($(this), $(this).parents(".list-project").attr("file_id"));
                }
            },
            items: {
                "edit": {name: "Rename Project", icon: "edit"},
                "delete": {name: "Delete Project", icon: "delete"}
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
            selector: '.flow-diagram .element-box', 
            callback: function(key, options) {
                if (key == 'edit'){
                    thisComp = $(this);
                    renameComponent(thisComp);
                }
                else if(key == 'delete'){
                    thisComp = $(this);
                    deleteComponent(thisComp);
                }
            },
            items: {
                "edit": {name: "Rename Component", icon: "edit"},
                "delete": {name: "Delete", icon: "delete"}
            }
        });

        $.contextMenu({
            selector: '.folder-group', 
            callback: function(key, options) {
                if(key == 'delete'){
                    deleteFolder($(this), $(this).parent().attr("folder_id"));
                }else if(key == 'add'){
                    createNewProject($(this), $(this).parent().attr("folder_id"));
                }else if(key == 'edit'){
                    renameFolderName($(this), $(this).parent().attr("folder_id"));
                }
            },
            items: {
                "add": {name: "Create Project", icon: "add"},
                "edit": {name: "Rename Folder", icon: "edit"},
                "delete": {name: "Delete Folder", icon: "delete"}
            }
        });  
        
        $.contextMenu({
            selector: '.flow-name-text', 
            callback: function(key, options) {
                if(key == 'edit'){
                    renameFlowModal($(this));
                }
            },
            items: {
                "edit": {name: "Rename", icon: "edit"},
            }
        });

        $.contextMenu({
            selector: '.project-tab', 
            callback: function(key, options) {
                if (key == 'quit') {
                    closeAllProjectTab();
                }
            },
            items: {
                "quit": {name: "Close all tab", icon: "quit"},
            }
        });

    });

function closeAllProjectTab(){
    $(".project-tab").fadeOut().remove();
    $(".project-container").fadeOut().remove();
    $("#flow-section .content-box").addClass("empty-project");
    $(".project-menu-tab .utility-group").removeClass("d-flex").fadeOut();

    if ($(".sidebar").hasClass("collapsed")) {
        $("#flow-section").removeClass("col-md-9").addClass("col-md-12");
        $("#palette-section").addClass("d-none");
    }else{
        $("#flow-section").removeClass("col-md-7").addClass("col-md-10");
        $("#palette-section").addClass("d-none");
    }

    localStorage.setItem("jsonTab", "[]"); // Remove all Json Tab
}

function saveProject(button){
    $(".project-tab").each(function(i){
        if ($(this).hasClass("active")) {
            let project_id = $(this).attr("project_id")
            
            let jsonTab = JSON.parse(localStorage.getItem("jsonTab"));

            for (let i = 0; i < jsonTab.length; i++) {
                let tab = jsonTab[i];
                if (tab.project_id == project_id) {
                    
                    // Save project by Project ID
                    // tab = data yang mau di simpan

                    console.log("Save Project : ", tab) 
                }
            }
        }
    })
}

function createNewProject(project, folder_id){
    $("#createProjectModal").modal('show');
    $("#createProjectModal").find("#input-project-name").val("");
    $("#createProjectModal").removeAttr("folder_id");
    $("#createProjectModal").attr("modal_folder_id", folder_id);

    $("#createProjectName").off('click').on('click',function(){
        let newName = $("#createProjectModal").find("#input-project-name").val();
        var inputValue = $("#createProjectrModal #input-project-name");
        var inputValueLength = newName.length;
        var button = $(this);
        let checkReturn = validateReturnInput(inputValue, newName, inputValueLength, button);
        let checkAlreadyExistProject = checkExistProject(inputValue, newName, button, folder_id);

        if (checkReturn == true) {
            if (checkAlreadyExistProject == true) {
                iziToast.error({
                    timeout : 2000,
                    title: 'Error',
                    message: "a Project with that name already exists",
                    position : "topRight",
                    transitionIn : "fadeInDown",
                    transitionOut : "fadeOutUp",
                    pauseOnHover: false,
                });
            } else {
                let jsonFolderLocal = JSON.parse(localStorage.getItem("jsonFolder"));
                for (let i = 0; i < jsonFolderLocal.length; i++) {
                    const item = jsonFolderLocal[i];
                    if(item.uuid == folder_id){
                        // new file project json 
                        let newFile = { name : newName, uuid : generateUUID()};
                        item.files.push(newFile);
                        localStorage.setItem("jsonFolder", JSON.stringify(jsonFolderLocal));
                        
                        // new file project UI
                        addFileHtmlLi(newFile, item.uuid, item.files.length);

                        setTimeout(() => {
                            $(".list-project").each(function(i){
                                if ($(this).attr("file_id") == newFile.uuid) {
                                    let project = $(this).children("a.project-name");
                                    openProjectTab(project)
                                }
                            })
                        }, 100);
                    }
                }
                
                if (!$(project).parent().hasClass("active")) {
                    openFolderGroup(project)
                }

                iziToast.success({
                    timeout : 2000,
                    title: 'Success',
                    message: "Successfully created a New Project",
                    position : "topRight",
                    transitionIn : "fadeInDown",
                    transitionOut : "fadeOutUp",
                    pauseOnHover: false,
                });


                $("#createProjectModal").modal('hide');
                $("#createProjectModal").find("input").val("");
                $("#createProjectModal").find(".btn-primary").attr("disabled", true);
                $("#createProjectModal").find(".input-group").removeClass("is-invalid").removeClass("is-valid")
            }
        } else {
            iziToast.error({
                timeout : 2000,
                title: 'Error',
                message: "Project Name can't be less than 2 characters and can't use special characters",
                position : "topRight",
                transitionIn : "fadeInDown",
                transitionOut : "fadeOutUp",
                pauseOnHover: false,
            });
        }
    
    });
}


function renameProject(project, file_id, folder_id){
    var projectName = project.children("span.project-name").text();
    // var projectNameWithoutFormat = projectName.split(".").shift()

    $("#renameProjectModal").modal('show');
    $("#renameProjectModal").find("#input-project-name").val(projectName);
    $("#renameProjectModal").find(".input-group").removeClass("is-valid").removeClass("is-invalid");

    $("#updateProjectName").unbind("click");
    $("#updateProjectName").click(function(){
        let newName = $("#renameProjectModal").find("#input-project-name").val();
        var inputValue = $("#createProjectrModal #input-project-name");
        var inputValueLength = newName.length;
        var button = $(this);
        let checkReturn = validateReturnInput(inputValue, newName, inputValueLength, button);
        let checkAlreadyExistProject = checkExistProject(inputValue, newName, button, folder_id);
        
        if (checkReturn == true) {
            if (checkAlreadyExistProject == true) {
                iziToast.error({
                    timeout : 2000,
                    title: 'Error',
                    message: "a Project with that name already exists",
                    position : "topRight",
                    transitionIn : "fadeInDown",
                    transitionOut : "fadeOutUp",
                    pauseOnHover: false,
                });
            } else {
                // rename project tab jika sedang di open
                $(".list-folder").each(function(){
                    if ($(this).attr("folder_id") == folder_id) {
                        var folderName = $(this).find(".folder-name").text();
                        $(".project-tab").each(function(i){
                            if ($(this).attr("project_id") == file_id) {
                                var titleName = folderName + "/" + newName;
                                $(this).find("p").text(newName)
                                $(this).attr("title", titleName)
                            }
                        });
                    }
                })

                // == rename file == 
                let jsonFolderLocal = JSON.parse(localStorage.getItem("jsonFolder"));
                for (let i = 0; i < jsonFolderLocal.length; i++) {
                    const folder = jsonFolderLocal[i];
                    let files = folder.files;
                    for (let j = 0; j < files.length; j++) {
                        let file = files[j];
                        if(file.uuid == file_id){
                            // rename file jsonFolder
                            files[j].name = newName
                            localStorage.setItem("jsonFolder", JSON.stringify(jsonFolderLocal));
                            
                            // rename file UI
                            $(project).children("span.project-name").text(newName);
                        }
                    }
                }

                // rename file jsonTab
                let jsonTabLocal = JSON.parse(localStorage.getItem("jsonTab"));
                for (let i = 0; i < jsonTabLocal.length; i++) {
                    const project_id = jsonTabLocal[i].project_id;
                    if(project_id == file_id){
                        jsonTabLocal[i].project = newName;
                    }
                }
                localStorage.setItem("jsonTab", JSON.stringify(jsonTabLocal));

                iziToast.success({
                    timeout : 2000,
                    title: 'Success',
                    message: "Successfully rename Project",
                    position : "topRight",
                    transitionIn : "fadeInDown",
                    transitionOut : "fadeOutUp",
                    pauseOnHover: false,
                });

                $("#renameProjectModal").modal('hide');
                $("#renameProjectModal").find("#input-project-name").val("");
            }
        } else {
            iziToast.error({
                timeout : 2000,
                title: 'Error',
                message: "Project Name can't be less than 2 characters and can't use special characters",
                position : "topRight",
                transitionIn : "fadeInDown",
                transitionOut : "fadeOutUp",
                pauseOnHover: false,
            });
        }
    });
}

function deleteProject(project, file_id){
    $("#deleteProjectModal").modal('show');

    $("#deleteProject").unbind("click");
    $("#deleteProject").click(function(){

        
    var folderParent = $(project).parents(".list-of-project");
        
        // delete project tab jika sedang di open
        $(".project-tab").each(function(ind){
            if ($(this).attr("project_id") == file_id) {
                var closeProjectTab = $(this).find(".close-tab");
                closeCanvasProject(closeProjectTab);
            }
        });
        
        let jsonFolderLocal = JSON.parse(localStorage.getItem("jsonFolder"));
        console.log("file_id: ", file_id, "| $(project):", $(project));
        for (let i = 0; i < jsonFolderLocal.length; i++) {
            const folder = jsonFolderLocal[i];
            let files = folder.files;
            for (let j = 0; j < files.length; j++) {
                let file = files[j];
                if(file.uuid == file_id){
                    // delete file json 
                    files.splice(j, 1);
                    localStorage.setItem("jsonFolder", JSON.stringify(jsonFolderLocal));
                    
                    // delete file UI
                    $(project).closest(".list-project").remove();
                    
                    setTimeout(() => {
                        if ($(folderParent).children().length == 0) {
                            $(folderParent).parents(".list-folder").removeClass("has-child").removeClass("active")
                        }
                    }, 100);
                }
            }
        }

        iziToast.success({
            timeout : 2000,
            title: 'Success',
            message: "Successfully deleted Project",
            position : "topRight",
            transitionIn : "fadeInDown",
            transitionOut : "fadeOutUp",
            pauseOnHover: false,
        });

        $("#deleteProjectModal").modal('hide');
    });
}

function renameFolderName(folder, folder_id){
    $("#renameFolderModal").modal('show');
    $("#renameFolderModal").find("#input-folder-name").val($(folder).find(".folder-name").text());
    $("#renameFolderModal").find(".input-group").removeClass("is-invalid").removeClass("is-valid");
    
    $("#updateFolderName").off('click').on('click', function(e){
        e.preventDefault(); 
        let newName = $("#renameFolderModal").find("#input-folder-name").val();
        var inputValue = $("#renameFolderModal #input-folder-name");
        var inputValueLength = newName.length;
        var button = $(this);
        let checkReturn = validateReturnInput(inputValue, newName, inputValueLength, button);
        let checkAlreadyExistFolder = checkExistFolder(inputValue, newName, button)
        
        if(checkReturn == true){
            if (checkAlreadyExistFolder == true) {
                iziToast.error({
                    timeout : 2000,
                    title: 'Error',
                    message: "a Folder with that name already exists",
                    position : "topRight",
                    transitionIn : "fadeInDown",
                    transitionOut : "fadeOutUp",
                    pauseOnHover: false,
                });
            } else {
                $(folder).find(".folder-name").text(newName);

                if($(folder).parent().hasClass("has-child")) {
                    $(folder).siblings(".list-of-project").find(".list-project").each(function(i){
                        var file_id = $(this).attr("file_id");
                        $(".project-tab").each(function(ind){
                            if ($(this).attr("project_id") == file_id) {
                                var titleName = newName + "/" + $(this).find("p").text();
                                $(this).attr("title", titleName)
                            }
                        })
                    });
            
                }
                
                // rename jsonFolder
                let jsonFolderLocal = JSON.parse(localStorage.getItem("jsonFolder"));
                for (let i = 0; i < jsonFolderLocal.length; i++) {
                    const item = jsonFolderLocal[i];
                    if(item.uuid == folder_id){
                        jsonFolderLocal[i].name = newName;
                    }
                }
                localStorage.setItem("jsonFolder", JSON.stringify(jsonFolderLocal));
                
                iziToast.success({
                    timeout : 2000,
                    title: 'Success',
                    message: "Successfully rename Folder",
                    position : "topRight",
                    transitionIn : "fadeInDown",
                    transitionOut : "fadeOutUp",
                    pauseOnHover: false,
                });
                
                $("#renameFolderModal").modal('hide');
                $("#renameFolderModal").find("#input-folder-name").val("");
                $("#renameFolderModal").find(".btn-primary").attr("disabled", true);
                $("#renameFolderModal").find(".input-group").removeClass("is-invalid").removeClass("is-valid");
            }
        }else{
            iziToast.error({
                timeout : 2000,
                title: 'Error',
                message: "Folder Name can't be less than 2 characters and can't use special characters",
                position : "topRight",
                transitionIn : "fadeInDown",
                transitionOut : "fadeOutUp",
                pauseOnHover: false,
            });
        }

    });
}

function deleteFolder(folder, folder_id){
    $("#deleteFolderModal").modal('show')
    $("#deleteFolder").off('click').on('click', function(){
        $(folder).parent().remove();
        
        // delete jsonFolder
        let jsonFolderLocal = JSON.parse(localStorage.getItem("jsonFolder"));
        for (let i = 0; i < jsonFolderLocal.length; i++) {
            const item = jsonFolderLocal[i];
            if(item.uuid == folder_id){
                jsonFolderLocal.splice(i, 1);
            }
        }

        iziToast.success({
            timeout : 2000,
            title: 'Success',
            message: "Successfully deleted folder",
            position : "topRight",
            transitionIn : "fadeInDown",
            transitionOut : "fadeOutUp",
            pauseOnHover: false,
        });
        
        localStorage.setItem("jsonFolder", JSON.stringify(jsonFolderLocal));
        $("#deleteFolderModal").modal('hide')
    });
}

// Workspace or Folder onclick action
function openFolderGroup(folder){
    // var folder_id = $(folder).parent().attr("folder_id");

    if ($(folder).parent().hasClass("has-child")) {
        $(folder).parent().toggleClass("active");
        $(folder).siblings(".list-of-project").fadeToggle();
        // setTimeout(() => {
        //     if ($(folder).parent().hasClass("active")) {
        //         localStorage.setItem(folder_id, "active")
        //     }else{
        //         localStorage.removeItem(folder_id)
        //     }
        // }, 100);
    }
}

function inputFieldValidate(field){
    var inputValue = $(field).val();
    var inputValueLength = $(field).val().length;
    var button = $(field).parents(".modal").find(".btn-primary");

    $(field).val($(field).val().replace(/ +?/g, ''));

    validateReturnInput(field, inputValue, inputValueLength, button);
    if ($(field).attr("id") == "input-project-name") {
        var folder_id = $(field).parents(".modal").attr("modal_folder_id")
        checkExistProject(field, inputValue, button, folder_id);
    }else if ($(field).attr("id") == "input-folder-name") {
        checkExistFolder(field, inputValue, button);
    }
}

function checkExistFolder(inputField, value, button){

    let booleanCheck;

    $(".list-folder .folder-name").each(function(i){
        if ($(this).text().toUpperCase() == value.toUpperCase()) {
            $(inputField).parent().removeClass("is-valid").addClass("is-invalid")
            $(button).attr("disabled", true)
            booleanCheck = true;
        }
    });

    return booleanCheck;
}

function checkExistProject(inputField, value, button, folder_id){
    let booleanCheck;

    $(".list-folder").each(function(){
        if ($(this).attr("folder_id") == folder_id) {
            $(this).find("span.project-name").each(function(i){
                if ($(this).text().toUpperCase() == value.toUpperCase()) {
                    $(inputField).parent().removeClass("is-valid").addClass("is-invalid");
                    $(button).attr("disabled", true);
                    booleanCheck = true
                }
            })
        }
    });

    return booleanCheck;
}

function validateReturnInput(field, value, length, button){
    if(/^[a-zA-Z0-9- _]*$/.test(value) == true) {
        if (length > 2) {
            if ($(field).parent().hasClass("is-invalid")) {
                $(field).parent().removeClass("is-invalid").addClass("is-valid");
            }
            $(button).attr("disabled", false)
            return true;
        }else{
            setTimeout(() => {
                if ($(field).parent().hasClass("is-valid")) {
                    $(field).parent().removeClass("is-valid").addClass("is-invalid");
                }
                $(button).attr("disabled", true)
            }, 100);
            return false;
        }
    }else{
        $(field).parent().removeClass("is-valid").addClass("is-invalid");
        $(button).attr("disabled", true)
        return false;
    }
    
}

var checkCurrentPassword, checkNewPassword, verifyNewPassword;

function validateInputPassword(field) {
    var value = $(field).val();
    var inputValueLength = value.length;
    var button = $("#save-change-password");
    
    $(field).val(value.replace(/ +?/g, ''));

    setTimeout(() => {
        if (checkCurrentPassword == true && checkNewPassword == true && verifyNewPassword == true) {
            $("#save-change-password").removeAttr("disabled");
        }else{
            $("#save-change-password").attr("disabled", true);
        }
    }, 100);
    
    if (/^[a-zA-Z0-9- _]*$/.test(value) == true) {
        if (inputValueLength >= 8) {
            $(field).parent().removeClass("is-invalid").addClass("is-valid");

            if ($(field).attr("id") == "current-password") {
                checkCurrentPassword = true;
                return true;

            }else if ($(field).attr("id") == "new-password"){
                if (checkCurrentPassword == true) {
                    checkNewPassword = true;
                    $("#current-password").parent().removeClass("is-invalid").addClass("is-valid");
                }else{
                    $("#current-password").parent().addClass("is-invalid")
                }
                
                if (verifyNewPassword == true) {
                    let checkVerifyPassword = verifyNewPasswordValue(field, value);
                    if (checkVerifyPassword == true) {
                        verifyNewPassword = true;
                        return true;
                    }else{
                        verifyNewPassword = undefined;
                        return false;
                    }
                }
                
            }else if ($(field).attr("id") == "verify-new-password") {
                let checkVerifyPassword = verifyNewPasswordValue(field, value);
                if (checkVerifyPassword == true) {
                    verifyNewPassword = true;
                    return true;
                }else{
                    verifyNewPassword = undefined;
                    return false;
                }

            }
            
            setTimeout(() => {
                if (checkCurrentPassword == true && checkNewPassword == true) {
                    $("#verify-new-password").parent().fadeIn();
                }else{
                    $("#verify-new-password").parent().fadeOut();
                }
            }, 100);

            return false;
        }else{

            if ($(field).attr("id") == "current-password") {
                checkCurrentPassword = undefined
            }else if ($(field).attr("id") == "new-password"){
                checkNewPassword = undefined;
            }else if($(field).attr("id") == "verify-new-password"){
                verifyNewPassword = undefined
            }

            setTimeout(() => {
                if (checkCurrentPassword == true && checkNewPassword == true) {
                    $("#verify-new-password").parent().fadeIn();
                }else{
                    $("#verify-new-password").parent().fadeOut();
                }
                
                if ($(field).parent().hasClass("is-valid")) {
                    $(field).parent().removeClass("is-valid").addClass("is-invalid");
                }
            }, 100);
            
            return false;
        }
        
    } else {
        $(field).parent().removeClass("is-valid").addClass("is-invalid");

        if ($(field).attr("id") == "current-password") {
            checkCurrentPassword = undefined
        }else if ($(field).attr("id") == "new-password"){
            checkNewPassword = undefined;
        }else if($(field).attr("id") == "verify-new-password"){
            verifyNewPassword = undefined
        }

        return false;
    }

    
}

function verifyNewPasswordValue(field, value){
    var fieldCompareValue;

    if ($(field).attr("id") == "verify-new-password") {
        fieldCompareValue = $("#new-password").val();
        if (fieldCompareValue == value) {
            $(field).parent().removeClass("is-invalid").addClass("is-valid");
            return true;
        }else{
            $(field).parent().removeClass("is-valid").addClass("is-invalid");
            return false;
        }
    }else if($(field).attr("id") == "new-password"){
        fieldCompareValue = $("#verify-new-password").val();
        if (value == fieldCompareValue) {
            $("#verify-new-password").parent().removeClass("is-invalid").addClass("is-valid");
            return true;
        }else{
            $("#verify-new-password").parent().removeClass("is-valid").addClass("is-invalid");
            return false;
        }
    }
}

$("#save-change-password").click(function(e){
    e.preventDefault();
    
    var checkValidateCurrentPasswordInput = validateInputPassword($("input#current-password"), $("input#current-password").val());
    var checkValidateNewPasswordInput = validateInputPassword($("input#new-password"), $("input#new-password").val());
    var checkValidateVerifyNewPasswordInput = validateInputPassword($("input#verify-new-password"), $("input#verify-new-password").val());

    console.log(checkValidateCurrentPasswordInput, checkValidateNewPasswordInput, checkValidateVerifyNewPasswordInput)
    
    if (checkValidateCurrentPasswordInput == true && checkValidateNewPasswordInput == true && checkValidateVerifyNewPasswordInput == true) {
        iziToast.success({
            timeout : 2000,
            title: 'Success',
            message: "Successfully change password",
            position : "topRight",
            transitionIn : "fadeInDown",
            transitionOut : "fadeOutUp",
            pauseOnHover: false,
        });
        
        $("#change-password-form").find("input").val("");
        $("#change-password-form").find(".input-group").removeClass("is-valid").removeClass("is-invalid");
        $("#verify-password-input-group").fadeOut();
    }else{
        iziToast.error({
            timeout : 2000,
            title: 'Error',
            message: "Failed to change password",
            position : "topRight",
            transitionIn : "fadeInDown",
            transitionOut : "fadeOutUp",
            pauseOnHover: false,
        });

    }

})

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
    filter = inputField.value.toUpperCase();
    
    if ($("#all-category").hasClass("active")) {
        elementItem = elementList.getElementsByTagName('li');
    }else if ($("#sender-category").hasClass("active")) {
        elementItem = elementList.querySelectorAll('#sender');
    }else if($("#receiver-category").hasClass("active")){
        elementItem = elementList.querySelectorAll('#receiver');
    }else if($("#object-category").hasClass("active")){
        elementItem = elementList.querySelectorAll('#object');
    }

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

function searchFolderSidebarFunc(){
    var workspaceBody, workspaceTitle, textValue, inputField, filter, workspaceBox;
    workspaceBox = document.querySelectorAll(".list-folder");
    workspaceBody = document.querySelectorAll(".folder-group");
    inputField = document.querySelector(".input-search-folder");
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

function searchProjectSidebarFunc(){
    var workspaceBody, workspaceTitle, textValue, inputField, filter, workspaceBox;
    workspaceBox = document.querySelectorAll(".list-project");
    workspaceBody = document.querySelectorAll(".project-name");
    inputField = document.querySelector(".input-search-project");
    filter = inputField.value.toUpperCase();
    for (var index = 0; index < workspaceBody.length; index++) {
        workspaceTitle = workspaceBody[index].getElementsByTagName("p")[0];
        console.log(workspaceTitle.innerText);
        textValue = workspaceTitle.textContent || workspaceTitle.innerText;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            workspaceBox[index].style.display = "block";
        } else {
            workspaceBox[index].style.display = "none";
        }
    }
}

function minimizeElementProperties(elProp){
    
    var listProperties = 
    '                       <li class="list-properties" ondblclick="expandElementProperties(this)">'+
    '                        <a href="#" class="properties-name" id="properties-1">'+
    '                          <div id="properties-group-1">'+
    '                            <div class="properties-text-group">'+
    '                              <img src="./assets/icon/list-icon.svg" alt="List Icon">'+
    '                              <p class="properties-text"></p>'+
    '                            </div>'+
    '                          </div>'+
    '                          <div id="properties-group-2">'+
    '                            <div class="properties-text-group">'+
    '                              <img src="./assets/icon/expand-icon.svg" alt="Expand Icon">'+
    '                              <p class="properties-text">Double Click to open this properties</p>'+
    '                              <button class="close-list-properties" onclick="closeListProperties(this)"><img src="./assets/icon/close-icon.svg" alt="Close Icon"></button>' +
    '                            </div>'+
    '                          </div>'+
    '                        </a>'+
    '                      </li>';

    var propertiesID = $(elProp).parents(".floating-properties").attr("prop_id");
    var propertiesName = $(elProp).parent().siblings(".properties-title").children(".properties-title-name").text();
    var propertiesTypeName = $(elProp).parent().siblings(".properties-title").children(".properties-type-name").text();


    $(elProp).parents(".floating-properties").fadeOut();
    $(".list-of-properties").append(listProperties);
    setTimeout(() => {
        $(".list-properties").each(function(i){
            if (!$(this).attr("prop_id")) {
                $(this).attr("prop_id", propertiesID);
                $(this).find("#properties-group-1 .properties-text").text(propertiesName + " " + propertiesTypeName);
            }
        })
    }, 100);

    if($("#flow-map-section").hasClass("minimized")){
        $("#flow-section, #palette-section").toggleClass("maximize");
        $("#flow-map-section, #properties-section, .minimize-section").toggleClass("minimized");
    }

    if (!$("#flow-map-tab #element-properties").hasClass("active")) {
        $("#flow-map-tab .tab-name").removeClass("active");
        $("#flow-map-tab #element-properties").addClass("active");
        $(".element-properties-content").removeClass("d-none");
        $(".outline-content").addClass("d-none");
    }

    // Di tunda dulu
    // $(".flow-diagram .element-box").each(function(i){
    //    if ($(this).parent().attr("data_id") == propertiesID) {
    //        $(this).attr("ondblclick", "elementProperties(this)");
    //    } 
    // });
}

function closeListProperties(elProp){
    var prop_id = $(elProp).parents(".list-properties").attr("prop_id");
    $(".floating-properties").each(function(i){
        if ($(".floating-properties").eq(i).attr("prop_id") == prop_id) {
            $(this).remove()
        }
    });

    $(".flow-diagram .element-item").each(function(i) {
        if ($(this).attr("data_id") == prop_id) {
            $(this).children().attr("ondblclick", "elementProperties(this)")
        }
    })

    $(elProp).parents(".list-properties").fadeOut().remove();
}

function expandElementProperties(elProp){
    $(".floating-properties").each(function(i){
        if($(".floating-properties").eq(i).attr("prop_id") == $(elProp).attr("prop_id")){
            $(this).fadeIn();
            $(elProp).fadeOut().remove();
        }
    });
}

// ketika klik save di modal properties
function saveProperties(saveProp){
    let rootProp = $(saveProp).closest(".floating-properties");
    let propId = rootProp.attr("prop_id");
    let jsonTabThis = JSON.parse(localStorage.getItem("jsonTab"));

    for (let i = 0; i < jsonTabThis.length; i++) {
        let tab = jsonTabThis[i];
        let jsonData = tab.jsonData;
        for (let j = 0; j < jsonData.length; j++) {
            const flow = jsonData[j];
            let components = flow.components;
            for (let x = 0; x < components.length; x++) {
                const comp = components[x];
                let name = comp.name;
                let type = comp.type;
                let uuid = comp.uuid;
                let attribut = comp.attribut;
                let log = comp.log;
                
                if(propId == uuid){
                    // console.log("findComp. name:", name, "| type:", type, "| uuid:", uuid, "| attribut:", attribut);
                    // save attribut
                    for (const key in attribut) {
                        let finalData = type + '-' + key;
                        let elInput = rootProp.find("#"+finalData);
                        let inputId = elInput.attr("id");
                        let inputVal = elInput.val();
                        let isCheckbox = elInput.attr("type") == "checkbox";
                        let isChecked = elInput.is(":checked");
                        // console.log("attribut. inputVal:", inputVal, "| inputId: ", inputId, "| elInput: ", elInput);
    
                        if(inputVal!=undefined){
                            let propName = inputId.replace(type + "-", "");
                            if(!isCheckbox){
                                attribut[propName] = inputVal;
                            } else {
                                attribut[propName] = isChecked;
                            }
                        } 
                    }
    
                    // save log
                    for (const key in log) {
                        const LOG = "log";
                        let finalData = LOG + '-' + key;
                        let elInput = rootProp.find("#"+finalData);
                        let inputId = elInput.attr("id");
                        let inputVal = elInput.val();
                        let isCheckbox = elInput.attr("type") == "checkbox";
                        let isChecked = elInput.is(":checked");
                        // console.log("log. inputVal:", inputVal, "| inputId: ", inputId, "| isChecked: ", isChecked, "| isCheckbox: ", isCheckbox, "| elInput: ", elInput);
    
                        if(inputVal!=undefined){
                            let propName = inputId.replace(LOG + "-", "");
                            if(!isCheckbox){
                                log[propName] = inputVal;
                            } else {
                                log[propName] = isChecked;
                            }
                        }
                    }
    
                    if(type == "object-mapping"){
                        let elInputMapping = rootProp.find("#object-mapping-mapping").val();
                        let elInputPath = rootProp.find("#object-mapping-path").val();
                        comp.mapping = elInputMapping;
                        comp.path = elInputPath;
                    }
    
                    // properties name
                    let propname = type + '-propname';
                    let propnameVal = rootProp.find("#"+propname).val();
                    comp.name = propnameVal; // change json
                    $('[data_id="'+uuid+'"]').find("span").text(propnameVal); // change UI canvas
                    let titleName = propnameVal;
                    rootProp.find(".properties-title-name").text(titleName); // change UI title
                    rootProp.find(".properties-title-name").attr("title", titleName); // change UI title tooltip
                }
            }
        }
    }
    localStorage.setItem("jsonTab", JSON.stringify(jsonTabThis));
}

// Floating Properties
function elementProperties(el){
    
    var elPropName = $(el).children("span").text();
    
    // auto open by file name
    var getTypeComp = $(el).prop("id");

    // fill data ke properties (auto nama id)
    var liComp = $(el).parent();
    var data_id = liComp.attr("data_id");
    

    // Di tunda dulu hehe
    // setTimeout(() => {
    //     $(".list-properties").each(function(i){
    //         if ($(this).attr("prop_id") == data_id) {
    //             $(this).fadeOut().remove();
    //             alert("Component di hapus adalah, " + $(this).attr("prop_id") + " & " + data_id)
    //         }
    //         // var propID = $(this).attr("prop_id");
    //         // console.log("Prop ID : " + propID, "Data ID : " + data_id)
    //     });
    // }, 1000);

    var floatProp = '' + 
    '<div class="floating-properties ui-draggable ui-draggable-handle" style="top: 50%;left: 50%;transform: translate(-50%, -50%);-webkit-transform: translate(-50%, -50%);-moz-transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%);-o-transform: translate(-50%, -50%);" prop_id="'+ data_id +'">' + 
    '      <div class="floating-properties-header">' + 
    '        <h5 class="properties-title" id="propertiesModalTitle"><span class="properties-title-name mr-1">Flow Properties</span><span class="properties-type-name"></span></h5>' +
    '           <div class="button-group">' + 
    '               <button type="button" class="close close-element-properties">' + 
    '                   <span aria-hidden="true">&times;</span>' + 
    '               </button>' + 
    '               <button type="button" class="minimize-element-properties mr-2" onclick="minimizeElementProperties(this)">' + 
    '                   <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> ' +
    '                       <path d="M16.6654 11.6668H3.33203V8.3335H16.6654" fill="#808080"/> ' +
    '                    </svg> ' +
    '               </button>' + 
    '           </div>' +
    '      </div>' + 
    '      <div class="properties-body">' + 
    '        <div class="row justify-content-center">' + 
    '                <div class="col-md-11" id="properties-modal-content">' + 
    '                  <div class="menu-group">' + 
    '                    <a href="#" class="menu-name active" id="general-properties">General</a>' + 
    '                    <a href="#" class="menu-name" id="notes-properties">Notes</a>' + 
    '                    <a href="#" class="menu-name" id="input-output-properties">Input/Output</a>' + 
    '                    <a href="#" class="menu-name" id="log-properties">Log</a>' + 
    '                  </div>' + 
    '                </div>' + 
    '              </div>' + 
    '              <div id="properties">' + 
    '              </div>' + 
    '              <div id="notes" style="display: none;">' + 
    '                <textarea class="notes-properties mx-3 mt-3" rows="10">Notes</textarea>' + 
    '              </div>' + 
    '              <div id="log" class="log" style="display: none;">' + 
    '                log' + 
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
    '        <button type="button" class="btn btn-primary" id="saveFlowName" onclick="saveProperties(this)">Save changes</button>' + 
    '      </div>' + 
    '    </div>' + 
    '';

    $("body").append(floatProp);

    setTimeout(() => {

        $(el).removeAttr("ondblclick");
        
        $(".floating-properties").each(function(ind){
            // $(".floating-properties").eq(ind).css({
            //     "left" : 310 * ind + "px"
            // });
            $(".floating-properties").eq(ind).attr("id", "floating-properties-"+ind)
            $(".floating-properties").eq(ind).find("#properties").attr("class", "properties-"+ind)
            setTimeout(() => {
                if($(this).find(".properties-"+ind).children().length == 0){
                    $(this).find(".properties-"+ind).load("./components/"+getTypeComp+".html");
                    let titleName = elPropName;
                    let propTypeName = getTypeComp;
                    $(this).find(".properties-title-name").text(titleName).attr("title", titleName);
                    $(this).find(".properties-type-name").text("(" + propTypeName + ")").attr("title", propTypeName);
                    $(this) .find(".log").load("./components/log.html");
                    setTimeout(() => {
                        $(this).find("#properties-name").children(".input-field").val(elPropName);  
                        $(this).find("#properties").children(".row").attr("prop_id", data_id);
                    }, 190);
                }

                $(this).find(".menu-name").click(function(){
                    $("#floating-properties-"+ind).find(".menu-name").removeClass("active");
                    $(this).addClass("active");
                    if($(this).prop("id") == 'notes-properties'){
                        $(this).parents("#floating-properties-"+ind).find(".properties-"+ind).hide();
                        $(this).parents("#floating-properties-"+ind).find("#notes").show();
                        $(this).parents("#floating-properties-"+ind).find("#input-output").removeClass("d-flex").addClass("d-none");
                        $(this).parents("#floating-properties-"+ind).find(".floating-properties .error-info").hide();
                        $(this).parents("#floating-properties-"+ind).find("#log").hide();
                    }else if($(this).prop("id") == 'general-properties'){
                        $(this).parents("#floating-properties-"+ind).find(".properties-"+ind).show();
                        $(this).parents("#floating-properties-"+ind).find("#notes").hide();
                        $(this).parents("#floating-properties-"+ind).find("#input-output").removeClass("d-flex").addClass("d-none");
                        $(this).parents("#floating-properties-"+ind).find(".floating-properties .error-info").show();
                        $(this).parents("#floating-properties-"+ind).find("#log").hide();
                    } else if($(this).prop("id") == 'log-properties'){
                        $(this).parents("#floating-properties-"+ind).find(".properties-"+ind).hide();
                        $(this).parents("#floating-properties-"+ind).find("#notes").hide();
                        $(this).parents("#floating-properties-"+ind).find("#input-output").removeClass("d-flex").addClass("d-none");
                        $(this).parents("#floating-properties-"+ind).find(".floating-properties .error-info").hide();
                        $(this).parents("#floating-properties-"+ind).find("#log").show();
                    }else if($(this).prop("id") == 'input-output-properties'){
                        $(this).parents("#floating-properties-"+ind).find(".properties-"+ind).hide();
                        $(this).parents("#floating-properties-"+ind).find("#notes").hide();
                        $(this).parents("#floating-properties-"+ind).find("#input-output").removeClass("d-none").addClass("d-flex");
                        $(this).parents("#floating-properties-"+ind).find(".floating-properties .error-info").hide();
                        $(this).parents("#floating-properties-"+ind).find("#log").hide();

                        var menuName = $(this).parents("#floating-properties-"+ind).find(".input-output-menu-name");
                        $(menuName).click(function(){
                            $("#floating-properties-"+ind).find(".input-output-menu-name").removeClass("active");
                            $(this).addClass("active")
                        });
                        
                        var listItem = $(this).parents("#floating-properties-"+ind).find(".list-item");

                        $(listItem).click(function(){
                            $(this).toggleClass("active");
                            $(this).children(".list-sub-item").fadeToggle();
                        });

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
            cursorAt: { top: 25, left: 175 },
            containment : "body",
            scroll : false,
            stack : ".floating-properties",
            start : function (ev, ui){
                $(this).css({
                    "transform" : "translate(0)"
                })
            }
        });

        $(".close-element-properties").click(function(){
            $(this).parents(".floating-properties").fadeOut();
            var prop_id = $(this).parents(".floating-properties").attr("prop_id");

            $(".flow-diagram .element-item").each(function(i){
                if($(this).attr("data_id") == prop_id){
                    $(this).children(".element-box").attr("ondblclick", "elementProperties(this)");
                }
            })
            
            setTimeout(() => {
                $(this).parents(".floating-properties").remove();
            }, 500);


        })
        
        if ($(".floating-properties").length > 3) {
            var elementDeleted = $(".floating-properties").eq(0);
            var prop_id = $(elementDeleted).attr("prop_id");

            $(".flow-diagram .element-item").each(function(i){
                if ($(this).attr("data_id") == prop_id) {
                    $(this).children().attr("ondblclick", "elementProperties(this)");
                }
            });
            setTimeout(() => {
                $(".floating-properties")[0].remove();
                $(".list-properties")[0].remove();
            }, 100);
            
        }

    }, 100);

    function recurJsonFlow(jsonFlowIndex){
        var components = jsonFlowIndex.components;
        for (let x = 0; x < components.length; x++) {
            const comp = components[x];
            var name = comp.name;
            var type = comp.type;
            var uuid = comp.uuid;
            var attribut = comp.attribut;
            var log = comp.log;
            
            if(data_id == uuid){
                console.log("name:", name, "| type:", type, "| uuid:", uuid, "| attribut:", attribut, "| log: ", log);
                // fill properties/atribut
                for (const key in attribut) {
                    var value = attribut[key];
                    // console.log('key', key, 'attribut', attribut[key]);
                    var finalData = type + '-' + key;
                    var typeValue = typeof value;
                    console.log('finalData. value:', value, '| type:', typeValue);

                   if(typeValue == 'boolean'){
                        if(value == true){
                            $('[prop_id="'+data_id+'"]').find("#"+finalData).attr('checked', true);
                        } else {
                            $('[prop_id="'+data_id+'"]').find("#"+finalData).attr('checked', false);
                        }
                    } else {
                        $('[prop_id="'+data_id+'"]').find("#"+finalData).val(value);
                    }
                }

                // fill log
                for (const key in log) {
                    var value = log[key];
                    // console.log('key', key, 'attribut', attribut[key]);
                    var typeValue = typeof value;
                    var finalData = 'log' + '-' + key;
                    console.log('fill log. value:', value, '| type:', typeValue, '| key:', key);

                   if(typeValue == 'boolean'){
                        if(value == true){
                            $('[prop_id="'+data_id+'"]').find("#"+finalData).attr('checked', true);
                        } else {
                            $('[prop_id="'+data_id+'"]').find("#"+finalData).attr('checked', false);
                        }
                    } else {
                        $('[prop_id="'+data_id+'"]').find("#"+finalData).val(value);
                    }
                }

                if(type == 'object-mapping'){
                    let mapping = comp.mapping;
                    let path = comp.path;
                    console.log("object-mapping:", comp);
                    $('[prop_id="'+data_id+'"]').find("#object-mapping-mapping").val(mapping);
                    $('[prop_id="'+data_id+'"]').find("#object-mapping-path").val(path);
                }
            }

            if(type == 'object-switching'){
                recurJsonFlow(comp);
            }
        }
    }

    setTimeout(function(){
        // isi data ke properties
        var indexFlow = liComp.parent().parent().children("ul").index(liComp.parent());
        var jsonTabThis = JSON.parse(localStorage.getItem("jsonTab"));
        let getProjectId = liComp.closest(".project-container").attr("project_id");
        for (let z = 0; z < jsonTabThis.length; z++) {
            const tab = jsonTabThis[z];
            if(tab.project_id == getProjectId){
                let flow = tab.jsonData[indexFlow];
                recurJsonFlow(flow);
            }
        }

        // edit properties (sekarang pindah ke save properties)
        $('#'+getTypeComp+"-page").attr("prop_id", data_id);
    }, 300);
}

function renameComponent(compo){
    var data_id = compo.parent().attr("data_id");
    var compName = compo.children("span");
    var compNameText = compName.text();
    let project_id = compo.closest(".project-container").attr("project_id");
    
    $("#renameComponentModal").modal('show');
    $("#renameComponentModal").find("#input-component-name").val(compNameText);
    
    $("#saveComponentName").off('click').on('click', function(){
        
    var newName = $("#input-component-name").val();
    
    // let rootProp = $(saveProp).closest(".floating-properties");
    // let propId = rootProp.attr("prop_id");
    let jsonTabThis = JSON.parse(localStorage.getItem("jsonTab"));
    
    for (let i = 0; i < jsonTabThis.length; i++) {
        let tab = jsonTabThis[i];
        let jsonData = tab.jsonData;
        for (let j = 0; j < jsonData.length; j++) {
            const flow = jsonData[j];
            let components = flow.components;
            console.log(components)
            for (let x = 0; x < components.length; x++) {
                const comp = components[x];
                let name = comp.name;
                let type = comp.type;
                let uuid = comp.uuid;
                let attribut = comp.attribut;
                let log = comp.log;
                
                if(data_id == uuid){
                    comp.name = newName; // Change JSON
                    $(compName).text(newName); // Change UI Canvas

                    iziToast.success({
                        timeout : 2000,
                        title: 'Success',
                        message: "Successfully rename Component",
                        position : "topRight",
                        transitionIn : "fadeInDown",
                        transitionOut : "fadeOutUp",
                        pauseOnHover: false,
                    });

                    $("#renameComponentModal").modal('hide');
                    $("#renameComponentModal").find("#input-component-name").val("");
                }
            }
        }
    }

    localStorage.setItem("jsonTab", JSON.stringify(jsonTabThis));


    });

}

function deleteComponent(comp) {    
    // validasi hapus properties
    var data_id = comp.parent().attr("data_id");
    var prop_id = $("#properties").children(":first").attr("prop_id");
    var switchElementParent = $(comp).parents(".switch-flow-element");
    var switchElementLength = $(comp).parents(".switch-flow-element").length;
    let project_id = comp.closest(".project-container").attr("project_id");

    // hapus element
    comp.parent().remove(); 

    setTimeout(() => {
        $(".switch-flow-element").each(function(i) {
            if ($(this).children().length == 0) {
                $(this).remove()
            }
        });
    }, 100);

    if(data_id != undefined){
        if ($(".floating-properties").length > 0) {
            $(".floating-properties").each(function(i){
                if ($(this).attr("prop_Id") == data_id) {
                    $(this).remove();
                }
            })
        }

        if($(".list-properties").length > 0){
            $(".list-properties").each(function(i){
                if($(this).attr("prop_id") == data_id){
                    $(this).remove();
                }
            })
        }
            
        // hapus component di localStorage
        deleteJsonFlow(data_id, project_id);
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
            let project_id = getEl.closest(".project-container").attr("project_id");

            // hapus element
            $(".element-item.focus").remove();
            if ($(".flow-diagram").children().length == 0) {
                $(".flow-diagram, br").remove();
            }
            
            if(data_id != undefined){
                $("#properties").empty();
                
                // hapus component di localStorage
                deleteJsonFlow(data_id, project_id);
            }
        }
    });
   
    $(document).click(function(a){
      if (!e.contains(a.target)) {
        $(".flow-diagram .element-item, .flow-diagram .element-box").removeClass("focus");
      }
    });
}

function deleteJsonFlow(data_id, project_id) {
    var jsonTabThis = JSON.parse(localStorage.getItem("jsonTab"));
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
                        // console.log("findComp del. name:", name, "| type:", type, "| uuid:", uuid, "| attribut:", attribut);
                        components.splice(j, 1);
                        localStorage.setItem("jsonTab", JSON.stringify(jsonTabThis));
                    }
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

    if ($this.parents("#flow-map-section").hasClass("minimized")) {
        $this.parents("#flow-map-section").toggleClass("minimized");
        $this.parents("#flow-map-section").siblings("#properties-section").toggleClass("minimized");
        $this.parents("#flow-map-section").siblings("#flow-section, #palette-section").toggleClass("maximize");
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
    var jsonTabThis = JSON.parse(localStorage.getItem("jsonTab"));
    let getProjectId = $(thisClose).closest(".project-container").attr("project_id");
    console.log("flow_id:", flow_id, "| getProjectId: ", getProjectId);
    for (let i = 0; i < jsonTabThis.length; i++) {
        const tab = jsonTabThis[i];
        if(tab.project_id == getProjectId){
            let jsonData = tab.jsonData;
            for (let j = 0; j < jsonData.length; j++) {
                let flow = jsonData[j];
                if(flow_id == flow.uuid){
                    jsonTabThis[i].jsonData.splice(j, 1);
                    localStorage.setItem("jsonTab", JSON.stringify(jsonTabThis));
                }
            }
        }
    }

    $(thisClose).parent().parent().next().remove();
    $(thisClose).parent().parent().remove();
}

function renameFlow(flowName){
    $(flowName).removeAttr("readonly");
}

function renameFlowModal(flowName){
    $("#renameFlowModal").modal('show');
    
    var flow_name = $(flowName).val();
    $("#renameFlowModal #input-flow-name").val(flow_name);
    
    $("#saveFlowName").click(function(){
        // edit json flow name    
        let flow_id = $(flowName).parent().parent().attr("flow_id")
        var jsonTabThis = JSON.parse(localStorage.getItem("jsonTab"));
        for (let i = 0; i < jsonTabThis.length; i++) {
            let jsonData = jsonTabThis[i].jsonData;
            for (let j = 0; j < jsonData.length; j++) {
                const flow = jsonData[j];
                if(flow_id == flow.uuid){
                    let newName = $("#renameFlowModal #input-flow-name").val();
                    flow.name = newName;
                    localStorage.setItem("jsonTab", JSON.stringify(jsonTabThis));
                    // $(flowName).val(newName);
                    setTimeout(() => {
                        $(flowName).val(newName);
                        $(flowName).attr("size", newName.length);
                    }, 100);
                }
            }
        }

        $("#renameFlowModal").modal('hide');
    })
}

function toReadonly(flowName){
    $(flowName).attr("readonly", "true");

    // edit json flow name    
    let flow_id = $(flowName).parent().parent().attr("flow_id")
    var jsonTabThis = JSON.parse(localStorage.getItem("jsonTab"));
    for (let i = 0; i < jsonTabThis.length; i++) {
        let jsonData = jsonTabThis[i].jsonData;
        for (let j = 0; j < jsonData.length; j++) {
            const flow = jsonData[j];
            if(flow_id == flow.uuid){
                let newName = $(flowName).val();
                flow.name = newName;
                localStorage.setItem("jsonTab", JSON.stringify(jsonTabThis));
                // $(flowName).val(newName);
                setTimeout(() => {
                    $(flowName).val(newName)
                }, 100);
            }
        }
    }
}

function flowTyping(e) {
    $(e).attr('size', $(e).val().length + 1);
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
