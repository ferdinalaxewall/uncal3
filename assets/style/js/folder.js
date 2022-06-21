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
            '<span class="project-name">'+file.name+'</span>'+
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
            "name": "folder A",
            "uuid": generateUUID(),
            "files": [ {
                name : "file a", 
                uuid : generateUUID(), 
            }, {
                name : "file b", 
                uuid : generateUUID(), 
            }, {
                name : "file c", 
                uuid : generateUUID(), 
            }]
        }, {
            "name": "folder B",
            "uuid": generateUUID(),
            "files": [ {
                name : "file a", 
                uuid : generateUUID(), 
            }]
        }, {
            "name": "Default Folder",
            "uuid": generateUUID(),
            "files": [ {
                name : "Default Project", 
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
    $("#createFolderName").click(function (e) { 
        let newName = $("#input-folder-name").val();
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
        $("#createFolderModal").modal('hide');
    });
    openFolderGroup();
});
