// buat html folder
function addFolderHtml(name, uuid, files) {
    let classFolder = files.length > 0 ? "has-child" : "";
    let result = '' +
    '<li class="list-folder '+classFolder+'" folder_id="'+uuid+'">'+
        '<div class="folder-group" onclick="openFolderGroup(this)">'+
            '<img src="./assets/icon/chevron-icon.svg" id="chevron-icon" alt="Chevron Icon">'+
            '<img src="./assets/icon/uncal-folder-icon.svg" alt="Uncal Folder Icon">'+
            '<p class="folder-name" title="Right Click for More">'+name+'</p>'+
        '</div>'+
    '</li>';
    $(".list-group-folder").append(result);
}

// buat html file/project
function fileHtmlString(file){
    let result = '<li class="list-project" file_id="'+file.uuid+'">'+
            '<a href="#" class="project-name" ondblclick="openProjectTab(this)">'+
            '<img src="./assets/icon/uncal-icon.svg" alt="Uncal Icon" loading="lazy">'+
            '<span class="project-name" id="project-text">'+file.name+'</span>'+
            '</a>'+
        '</li>';
    return result;
}

function addFileHtmlUl(files, uuid) {
    let result = '<ul class="list-of-project" style="display: none;">';
    for (let x = 0; x < files.length; x++) {
        const file = files[x];
        result += fileHtmlString(file);
    }
    result += '</ul>';
    $('[folder_id="'+ uuid +'"]').append(result);
}

function addFileHtmlLi(file, uuid, length) {
    if(length == 1){
        let result = '<ul class="list-of-project" style="display: none;">'+fileHtmlString(file)+'</ul>';
        $('[folder_id="'+ uuid +'"]').append(result);
        $('[folder_id="'+ uuid +'"]').addClass("has-child");
        setTimeout(() => {
            $('[folder_id="'+ uuid +'"]').find("#chevron-icon").click();
        }, 300);
    } else {
        let result = fileHtmlString(file);
        $('[folder_id="'+ uuid +'"]').find("ul").append(result);
    }

    openFolderGroup();
}

$(document).ready(function () {
    // contoh json project auto fill
    let getJsonFolder = localStorage.getItem("jsonFolder");
    console.log("getJsonFolder: ", getJsonFolder);
    if(getJsonFolder == "" || getJsonFolder == null /* || getJsonFolder == "[]" */){
        console.log("jsonFolder empty");
        let dataFolder = [{
            "name": "folder-a",
            "uuid": generateUUID(),
            "files": [ {
                name : "file-a1", 
                uuid : generateUUID(), 
            }, {
                name : "file-a2", 
                uuid : generateUUID(), 
            }, {
                name : "file-a3", 
                uuid : generateUUID(), 
            }]
        }, {
            "name": "folder-b",
            "uuid": generateUUID(),
            "files": [ {
                name : "file-b1", 
                uuid : generateUUID(), 
            }]
        }, {
            "name": "default-folder",
            "uuid": generateUUID(),
            "files": [ {
                name : "default-project", 
                uuid : generateUUID(), 
            }]
        }];
        localStorage.setItem("jsonFolder", JSON.stringify(dataFolder));
    }

    // show jsonFolder ke sidebar
    let jsonFolder = JSON.parse(localStorage.getItem("jsonFolder"));
    $(".list-group-folder").empty();
    
    for (let i = 0; i < jsonFolder.length; i++) {
        let listHtml = "";
        const folder = jsonFolder[i];
        let name = folder.name;
        let uuid = folder.uuid;
        let files = folder.files;

        // tambah folder
        addFolderHtml(name, uuid, files);
        
        // tambah file
        addFileHtmlUl(files, uuid);
    }
    
    // new folder
    $("#createFolderName").off('click').on('click', function (e) { 
        let newName = $("#createFolderModal #input-folder-name").val();
        var inputValue = $("#createFolderModal #input-folder-name");
        var inputValueLength = newName.length;
        var button = $(this);
        let checkReturn = validateReturnInput(inputValue, newName, inputValueLength, button);
        let checkAlreadyExistFolder = checkExistFolder(inputValue, newName, button)

        if (checkReturn == true) {
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
                let uuid = generateUUID();
                console.log("createFolderName. newName:", newName);
                
                let newJson = {
                    "name": newName,
                    "uuid": uuid,
                    "files": []
                };
        
                let jsonFolderLocal = JSON.parse(localStorage.getItem("jsonFolder"));
                jsonFolderLocal.push(newJson);
                localStorage.setItem("jsonFolder", JSON.stringify(jsonFolderLocal));
                addFolderHtml(newName, uuid, newJson.files);

                iziToast.success({
                    timeout : 2000,
                    title: 'Success',
                    message: "Successfully created a new folder",
                    position : "topRight",
                    transitionIn : "fadeInDown",
                    transitionOut : "fadeOutUp",
                    pauseOnHover: false,
                });

                $("#createFolderModal").modal('hide');
                $("#createFolderModal").find("input").val("");
                $("#createFolderModal").find(".input-group").removeClass("is-invalid").removeClass("is-valid");
                $("#createFolderModal").find(".btn-primary").attr("disabled", true);
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

    openFolderGroup();

    // setTimeout(() => {
    //     $(".list-folder").each(function(i){
    //         var folder_id = $(this).attr("folder_id");
    //         $(this).children(".folder-group").attr("folder_id", folder_id)
    //     });
    // }, 250);

    // $(".list-folder.has-child").each(function(i){
    //     var folder_id = $(this).attr("folder_id")
    //     var localFolderValue = localStorage.getItem(folder_id);

    //     if (localFolderValue == "active") {
    //         $(this).addClass("active");
    //         $(this).find(".list-of-project").fadeIn();
    //     }
    // })
});
