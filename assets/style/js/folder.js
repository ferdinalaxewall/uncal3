// folder
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
        }];
        localStorage.setItem("jsonFolder", JSON.stringify(dataFolder));
    }

    // buat html folder
    function addFolderHtml(name, uuid, files) {
        let classFolder = files.length > 0 ? "has-child" : "";
        let result = '' +
        '<li class="list-folder '+classFolder+'" folder_id="'+uuid+'">'+
            '<div class="folder-group">'+
                '<img src="./assets/icon/chevron-icon.svg" id="chevron-icon" alt="Chevron Icon">'+
                '<img src="./assets/icon/uncal-folder-icon.svg" alt="Uncal Folder Icon">'+
                '<p class="folder-name" title="Right Click for More">'+name+'</p>'+
            '</div>'+
        '</li>';

        return result;
    }

    // buat html file/project
    function addFileHtml(files) {
        let result = '<ul class="list-of-project" style="display: none;">';
        for (let x = 0; x < files.length; x++) {
            const item = files[x];
            result += '<li class="list-project" file_id="'+item.uuid+'">'+
                '<a href="#" class="project-name">'+
                '<img src="./assets/icon/uncal-icon.svg" alt="Uncal Icon" loading="lazy">'+
                '<span class="project-name">'+item.name+'</span>'+
                '</a>'+
            '</li>';
        }
        result += '</ul>';
        return result;
    }

    // show jsonFolder ke sidebar
    let jsonFolder = JSON.parse(localStorage.getItem("jsonFolder"));
    // $(".list-group-folder").empty();
    
    for (let i = 0; i < jsonFolder.length; i++) {
        let listHtml = "";
        const folder = jsonFolder[i];
        let name = folder.name;
        let uuid = folder.uuid;
        let files = folder.files;

        // tambah folder
        listHtml += addFolderHtml(name, uuid, files);
        $(".list-group-folder").append(listHtml);

        // tambah file
        $('[folder_id="'+ uuid +'"]').append(addFileHtml(files));
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
        $(".list-group-folder").append(addFolderHtml(newName, uuid, newJson.files));
        $("#createProjectModal").modal("hide");
    });

    
    openFolderGroup();
});