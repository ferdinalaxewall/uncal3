$(document).ready(function(){
    
    $(".project-tab-container").sortable({
        refreshPositions: true,
        containment : ".project-tab-container",
        items : ".project-tab",
        opacity: 0.8,
        axis : "x",
        scroll : true,
        placeholder : ".project-tab-placeholder",
        revert : true,
        scrollSpeed: 80,
        forcePlaceholderSize: true // <--- add this
    }).disableSelection();
});


function openProjectTab(project){

    var file_id = $(project).parent().attr("file_id");
    let projectName = $(project).text();
    let FolderParentName = $(project).parents(".list-of-project").siblings(".folder-group").find(".folder-name").text();
    let folder_id = $(project).parents(".list-folder").attr("folder_id");

    var projectTabHtml = '<a href="#" class="project-tab" project_id="'+ file_id +'" onclick="openCanvasProject(this)" title="'+ FolderParentName +'/'+ projectName +'">'+
    '                      <svg width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg" id="tab-icon uncal-icon">'+
    '                        <path d="M3.88733 15.2974L2.68857 15.8989C2.52854 15.9792 2.36166 16.045 2.1899 16.0956L1.24059 16.3749C1.20152 16.3864 1.16133 16.3936 1.12071 16.3964L0.982184 16.4061C0.576402 16.4346 0.376418 16.9133 0.641414 17.2219C0.663959 17.2482 0.689197 17.272 0.716712 17.293L1.05519 17.5512L1.51948 17.8824L2.02597 18.1721L2.65909 18.5033L2.81039 18.5775C3.04616 18.6931 3.2961 18.7772 3.55379 18.8278L4.00974 18.9172L4.27586 18.9607C4.43585 18.9869 4.59769 19 4.7598 19H4.98052H5.09614C5.38326 19 5.66877 18.9572 5.94329 18.8731L6.04845 18.8409C6.15228 18.809 6.25288 18.7675 6.34891 18.7168L6.52846 18.622C6.67578 18.5442 6.80033 18.4294 6.88986 18.2889L6.95489 18.1869C6.96112 18.1771 6.96872 18.1682 6.97747 18.1606L7.07691 18.0739C7.14631 18.0134 7.25041 18.0861 7.21753 18.1721L7.05398 18.4929C7.05049 18.4998 7.0459 18.506 7.0404 18.5114C6.98354 18.5672 7.0471 18.66 7.11966 18.6272L7.85065 18.2963L8.36145 18.0063C8.55495 17.8964 8.73562 17.7654 8.90014 17.6155L9.24351 17.3028L9.7008 16.9384C9.82769 16.8373 9.8659 16.6609 9.79221 16.5163L9.53896 15.8126L9.24351 15.1503L9.16728 14.8887C9.10573 14.6774 9.06761 14.46 9.05362 14.2404L8.99026 13.2462L9.07468 12.0871L9.13058 11.7582C9.17142 11.5179 9.37963 11.342 9.62338 11.342L10.3409 11.2593L10.7381 11.2333C10.8951 11.223 11.0511 11.2004 11.2046 11.1657L11.3353 11.1361C11.4601 11.1079 11.5825 11.0702 11.7017 11.0235L11.7389 11.0089C11.8758 10.9552 12.0069 10.8875 12.13 10.807L12.1897 10.768C12.3627 10.6549 12.5143 10.512 12.6375 10.3459L12.7403 10.2072C12.7726 10.1637 12.7984 10.1158 12.8169 10.0648C12.9194 9.78331 12.783 9.47087 12.5067 9.35477L12.1136 9.18954L10.8052 8.7342L9.2013 8.19608L8.86364 8.0305C8.64049 7.92108 8.43974 7.77095 8.2717 7.58784L8.2555 7.57019C8.18267 7.49083 8.10392 7.41713 8.01991 7.34972L7.68182 7.07843L7.5652 7.00491C7.31048 6.84431 7.24859 6.4997 7.43151 6.2605C7.45758 6.2264 7.47927 6.18916 7.49606 6.14965L7.68182 5.71242L7.80344 5.42615C7.86297 5.28604 7.91174 5.14161 7.94934 4.9941L8.00676 4.76887C8.04333 4.6254 8.06923 4.47943 8.08425 4.33214L8.1461 3.72549V3.17386C8.1461 2.94421 8.05372 2.72421 7.88976 2.56341L7.82595 2.50083C7.81433 2.48943 7.80125 2.47963 7.78705 2.47167L7.65743 2.39903C7.59276 2.36279 7.51299 2.40953 7.51299 2.48366V2.91961C7.51299 3.09776 7.49712 3.27555 7.46557 3.45089L7.38636 3.89107L7.25974 4.42919L7.09091 5.05011L6.88551 5.55372C6.85381 5.63143 6.80997 5.70361 6.75563 5.76757L6.67194 5.86606C6.64219 5.90107 6.60424 5.92817 6.56147 5.94495C6.4709 5.98048 6.36834 5.96614 6.29099 5.90714L6.03571 5.71242L5.78247 5.46405L5.48036 5.13484C5.42859 5.07843 5.38099 5.01832 5.33794 4.955L5.10101 4.60645C5.0775 4.57187 5.06494 4.53102 5.06494 4.48921C5.06494 4.44999 5.07599 4.41158 5.09683 4.37836L5.30505 4.04652C5.36986 3.94324 5.42242 3.83275 5.46166 3.7173L5.61364 3.27015L5.78247 2.69063L5.86688 2.15251L5.90909 1.4488V0.869281V0.473222C5.90909 0.355877 5.86189 0.243466 5.77811 0.161302L5.73374 0.11779C5.71033 0.094828 5.6815 0.0781494 5.64992 0.069301L5.59077 0.0527271C5.49627 0.0262477 5.4026 0.0972804 5.4026 0.195419C5.4026 0.203109 5.402 0.210788 5.40081 0.218385L5.35443 0.514049C5.3303 0.667849 5.31818 0.823292 5.31818 0.978972V1.01547C5.31818 1.19362 5.30231 1.37141 5.27076 1.54675L5.19156 1.98693L5.06494 2.48366L4.8539 3.02179L4.59714 3.70527C4.57892 3.75376 4.51686 3.7675 4.47988 3.73123C4.47599 3.72742 4.47255 3.72317 4.46962 3.71858L4.37124 3.5642C4.29933 3.45137 4.24122 3.33031 4.19817 3.20362L4.09416 2.8976L3.92532 2.40087L3.75649 1.86275L3.58766 1.11765L3.52491 0.563746C3.5109 0.440063 3.45474 0.324973 3.36587 0.237817L3.25554 0.129615C3.22494 0.0996015 3.18378 0.0827887 3.14092 0.0827887C3.05851 0.0827887 2.98895 0.144047 2.97853 0.225794L2.95455 0.413943V0.95207V1.14011C2.95455 1.4271 2.99722 1.71249 3.08117 1.98693L3.33442 2.8976L3.70964 3.86776C3.76891 4.02102 3.84068 4.16915 3.92421 4.31066L4.26299 4.88453L4.8539 5.67102L5.61364 6.5403L6.25466 7.12968C6.27743 7.15062 6.30281 7.16853 6.33017 7.18298L6.57694 7.3133C6.69754 7.37698 6.71001 7.54487 6.60015 7.62568C6.53959 7.67022 6.4581 7.67366 6.394 7.63438L6.16234 7.49237L5.71646 7.12797C5.50999 6.95923 5.26745 6.84027 5.00763 6.78032L4.81897 6.73678C4.7305 6.71637 4.63896 6.71284 4.54918 6.72639L4.19476 6.77986C3.89256 6.82546 3.72015 7.14989 3.85147 7.42586C3.87243 7.46992 3.90034 7.51032 3.93412 7.54552L4.26684 7.89222C4.46013 8.09363 4.68277 8.26466 4.9272 8.39951L5.1163 8.50383C5.1943 8.54686 5.27741 8.57989 5.36366 8.60215C5.7719 8.70751 6.07902 9.04459 6.14604 9.46085L6.14854 9.4764C6.15772 9.53344 6.16234 9.59111 6.16234 9.64888V11.5184C6.16234 11.7587 6.13347 11.9981 6.07635 12.2315L6.01234 12.4931C5.94386 12.7729 5.83545 13.0414 5.69042 13.2903L5.4026 13.7843L5.14099 14.1808C5.00638 14.3849 4.84733 14.5717 4.66739 14.7371L4.57239 14.8245C4.36712 15.0132 4.13655 15.1724 3.88733 15.2974Z" fill="#c68d53"/>'+
    '                      </svg>'+
    '                      '+
    '                      <p>'+ projectName +'</p> '+
    '                      <button class="close-tab" onclick="closeCanvasProject(this)">'+
    '                        <img src="./assets/icon/close-icon.svg" alt="Close Icon">'+
    '                      </button>'+
    '                    </a>';

    var canvasHtml = '<div class="project-container" project_id="'+ file_id +'"><div class="canvas"></div></div>'
    $("#flow-section .content-box").removeClass("empty-project");
    $(".project-menu-tab .utility-group").addClass("d-flex").fadeIn();

    if ($(".sidebar").hasClass("collapsed")) {
        $("#flow-section").removeClass("col-md-12").addClass("col-md-9");
        $("#palette-section").removeClass("d-none")
    }else{
        $("#flow-section").removeClass("col-md-10").addClass("col-md-7");
        $("#palette-section").removeClass("d-none");
    }

    
    var checkExistElement = $(".project-tab-container").find("[project_id='" + file_id + "']"); 
    if ($(checkExistElement).length < 1) {
        $(".project-tab-container").append(projectTabHtml);
    
        setTimeout(() => {
            $(".project-tab").each(function(i){
                if ($(this).attr("project_id") == file_id) {
                    $(".project-tab").removeClass("active");
                    $(this).addClass("active");
                    setTimeout(() => {
                        if ($(this).attr("id") == "unsaved") {
                            $(".save-project").show();
                        }else{
                            $(".save-project").hide();
                        }
                    }, 100);
                }
            });
    
            $("#flow-container").append(canvasHtml);
            droppableFunc();
            sortableFunc();
    
            $(".project-container").each(function(i){
                if ($(this).attr("project_id") == file_id) {
                    $(".project-container").removeClass("active");
                    $(this).addClass("active")   
                }
            });

            $(".sidebar-content-header .folder-name").text(FolderParentName);
        }, 100);
        
    }else{
        $(".project-tab").each(function(i){
            if ($(this).attr("project_id") == file_id) {
                $(".project-tab").removeClass("active");
                $(this).addClass("active");
                setTimeout(() => {
                    if ($(this).attr("id") == "unsaved") {
                        $(".save-project").show();
                    }else{
                        $(".save-project").hide();
                    }
                }, 100);
            }
        });
        
        $(".project-container").each(function(i){
            if ($(this).attr("project_id") == file_id) {
                $(".project-container").removeClass("active");
                $(this).addClass("active")   
            }
        });

        $(".sidebar-content-header .folder-name").text(FolderParentName);
    }
    
    // tambah jsonTab
    let jsonTabThis = JSON.parse(localStorage.getItem("jsonTab"));
    let isExist = false;
    for (let i = 0; i < jsonTabThis.length; i++) {
        const project_id = jsonTabThis[i].project_id;
        if(project_id == file_id){
            isExist = true;
        }
    }

    if(!isExist){
        let newTab = {
            folder: FolderParentName,
            folder_id: folder_id,
            project: projectName,
            project_id: file_id,
            jsonData: [],
            tab_status: "saved"
        };
        jsonTabThis.push(newTab);
        localStorage.setItem("jsonTab", JSON.stringify(jsonTabThis));
    }
}

function openCanvasProject(projectTab){
    var project_id = $(projectTab).attr("project_id");
    var fileDirectory = $(projectTab).attr("title");
    var splitFileDirectory = fileDirectory.split("/");
    var folderName = splitFileDirectory.shift();
    
    $(".project-tab").each(function(i){
        if ($(this).attr("project_id") == project_id) {
            $(".project-tab").removeClass("active");
            $(this).addClass("active");

            setTimeout(() => {
                if ($(this).hasClass("active")) {
                    $(".sidebar-content-header .folder-name").text(folderName)
                }

                if ($(this).attr("id") == "unsaved") {
                    $(".save-project").show();
                }else{
                    $(".save-project").hide();
                }
            }, 100);
        }
    });
    
    $(".project-container").each(function(i){
        if ($(this).attr("project_id") == project_id) {
            $(".project-container").removeClass("active");
            $(this).addClass("active")
        }
    });
    
}

function closeCanvasProject(closeProject){
    var projectTab = $(closeProject).parent();
    var project_id = $(projectTab).attr("project_id");
    var prevElement = $(projectTab).prev();
    var indexProjectTab = $(projectTab).index();
    var nextElement = $(projectTab).next();
    
    if ($(projectTab).attr("id") == "unsaved") {
        $("#closeTabModal").modal('show');

        $("#dont-save-project-tab").off('click').on('click', function(){
            $(projectTab).remove();

            $("#closeTabModal").modal('hide')

            if ($(".project-tab").length > 0) {
                if ($(projectTab).hasClass("active")) {
                    if (indexProjectTab == 0) {
                        fileDirectory = $(nextElement).attr("title");
                        splitFileDirectory = fileDirectory.split("/");
                        folderName = splitFileDirectory.shift();
                        
                        $(nextElement).addClass("active")
                        $(prevElement).addClass("active");
        
                        $(".project-container").each(function(i){
                            if ($(this).attr("project_id") == project_id) { 
                                if($(this).hasClass("active")){
                                    $(this).next().addClass("active");
                                }
                                $(this).remove();
                            }
                        });
        
                        setTimeout(() => {
                            $(".sidebar-content-header .folder-name").text(folderName);
                        }, 100);
                    }else{
                        var fileDirectory = $(prevElement).attr("title");
                        var splitFileDirectory = fileDirectory.split("/");
                        var folderName = splitFileDirectory.shift();
            
                        $(prevElement).addClass("active");
        
                        
                        setTimeout(() => {
                            $(".sidebar-content-header .folder-name").text(folderName);
                        }, 100);
                    }
                }
            }else{
                setTimeout(() => {
                    $(".sidebar-content-header .folder-name").text("Uncal BPM Workspace");
                    $("#flow-section .content-box").addClass("empty-project");
                    $(".project-menu-tab .utility-group").removeClass("d-flex").fadeOut();
        
                    if ($(".sidebar").hasClass("collapsed")) {
                        $("#flow-section").removeClass("col-md-9").addClass("col-md-12");
                        $("#palette-section").addClass("d-none")
                    }else{
                        $("#flow-section").removeClass("col-md-7").addClass("col-md-10");
                        $("#palette-section").addClass("d-none");
                    }
                
                }, 100);
            }
            
            $(".project-container").each(function(i){
                if ($(this).attr("project_id") == project_id) { 
                    var elementItem = $(this).find(".element-item");
                    $(elementItem).each(function(){
                        var data_id = $(this).attr("data_id");
                        $(".floating-properties").each(function(){
                            if ($(this).attr("prop_id") == data_id) {
                                $(this).fadeOut().remove(); 
                            }
                        });
                        $(".list-properties").each(function(){
                            if ($(this).attr("prop_id") == data_id) {
                                $(this).fadeOut().remove();
                            }
                        })
                    })
                    if($(this).hasClass("active")){
                        $(this).prev().addClass("active");
                    }
                    $(this).remove();
                }
            });
            
            // hapus jsonTab
            let jsonTabThis = JSON.parse(localStorage.getItem("jsonTab"));
            for (let i = 0; i < jsonTabThis.length; i++) {
                const projectId = jsonTabThis[i].project_id;
                if(projectId == project_id){
                    jsonTabThis.splice(i, 1);
                }
            }
            localStorage.setItem("jsonTab", JSON.stringify(jsonTabThis));
        });

        $("#save-project-tab").off('click').on('click', function(){
            saveProject();
            $(projectTab).remove();

            $("#closeTabModal").modal('hide');

            if ($(".project-tab").length > 0) {
                if ($(projectTab).hasClass("active")) {
                    if (indexProjectTab == 0) {
                        fileDirectory = $(nextElement).attr("title");
                        splitFileDirectory = fileDirectory.split("/");
                        folderName = splitFileDirectory.shift();
                        
                        $(nextElement).addClass("active")
                        $(prevElement).addClass("active");
        
                        $(".project-container").each(function(i){
                            if ($(this).attr("project_id") == project_id) { 
                                if($(this).hasClass("active")){
                                    $(this).next().addClass("active");
                                }
                                $(this).remove();
                            }
                        });
        
                        setTimeout(() => {
                            $(".sidebar-content-header .folder-name").text(folderName);
                        }, 100);
                    }else{
                        var fileDirectory = $(prevElement).attr("title");
                        var splitFileDirectory = fileDirectory.split("/");
                        var folderName = splitFileDirectory.shift();
            
                        $(prevElement).addClass("active");
        
                        
                        setTimeout(() => {
                            $(".sidebar-content-header .folder-name").text(folderName);
                        }, 100);
                    }
                }
            }else{
                setTimeout(() => {
                    $(".sidebar-content-header .folder-name").text("Uncal BPM Workspace");
                    $("#flow-section .content-box").addClass("empty-project");
                    $(".project-menu-tab .utility-group").removeClass("d-flex").fadeOut();
        
                    if ($(".sidebar").hasClass("collapsed")) {
                        $("#flow-section").removeClass("col-md-9").addClass("col-md-12");
                        $("#palette-section").addClass("d-none")
                    }else{
                        $("#flow-section").removeClass("col-md-7").addClass("col-md-10");
                        $("#palette-section").addClass("d-none");
                    }
                
                }, 100);
            }
            
            $(".project-container").each(function(i){
                if ($(this).attr("project_id") == project_id) { 
                    var elementItem = $(this).find(".element-item");
                    $(elementItem).each(function(){
                        var data_id = $(this).attr("data_id");
                        $(".floating-properties").each(function(){
                            if ($(this).attr("prop_id") == data_id) {
                                $(this).fadeOut().remove(); 
                            }
                        });
                        $(".list-properties").each(function(){
                            if ($(this).attr("prop_id") == data_id) {
                                $(this).fadeOut().remove();
                            }
                        })
                    })
                    if($(this).hasClass("active")){
                        $(this).prev().addClass("active");
                    }
                    $(this).remove();
                }
            });
            
            // hapus jsonTab
            let jsonTabThis = JSON.parse(localStorage.getItem("jsonTab"));
            for (let i = 0; i < jsonTabThis.length; i++) {
                const projectId = jsonTabThis[i].project_id;
                if(projectId == project_id){
                    jsonTabThis.splice(i, 1);
                }
            }
            localStorage.setItem("jsonTab", JSON.stringify(jsonTabThis));

        });
    }else{
        $(projectTab).remove();
        
        if ($(".project-tab").length > 0) {
            if ($(projectTab).hasClass("active")) {
                if (indexProjectTab == 0) {
                    fileDirectory = $(nextElement).attr("title");
                    splitFileDirectory = fileDirectory.split("/");
                    folderName = splitFileDirectory.shift();
                    
                    $(nextElement).addClass("active")
                    $(prevElement).addClass("active");
    
                    $(".project-container").each(function(i){
                        if ($(this).attr("project_id") == project_id) { 
                            if($(this).hasClass("active")){
                                $(this).next().addClass("active");
                            }
                            $(this).remove();
                        }
                    });
    
                    setTimeout(() => {
                        $(".sidebar-content-header .folder-name").text(folderName);
                    }, 100);
                }else{
                    var fileDirectory = $(prevElement).attr("title");
                    var splitFileDirectory = fileDirectory.split("/");
                    var folderName = splitFileDirectory.shift();
        
                    $(prevElement).addClass("active");
    
                    
                    setTimeout(() => {
                        $(".sidebar-content-header .folder-name").text(folderName);
                    }, 100);
                }
            }
        }else{
            setTimeout(() => {
                $(".sidebar-content-header .folder-name").text("Uncal BPM Workspace");
                $("#flow-section .content-box").addClass("empty-project");
                $(".project-menu-tab .utility-group").removeClass("d-flex").fadeOut();
    
                if ($(".sidebar").hasClass("collapsed")) {
                    $("#flow-section").removeClass("col-md-9").addClass("col-md-12");
                    $("#palette-section").addClass("d-none")
                }else{
                    $("#flow-section").removeClass("col-md-7").addClass("col-md-10");
                    $("#palette-section").addClass("d-none");
                }
            
            }, 100);
        }
        
        $(".project-container").each(function(i){
            if ($(this).attr("project_id") == project_id) { 
                var elementItem = $(this).find(".element-item");
                $(elementItem).each(function(){
                    var data_id = $(this).attr("data_id");
                    $(".floating-properties").each(function(){
                        if ($(this).attr("prop_id") == data_id) {
                            $(this).fadeOut().remove(); 
                        }
                    });
                    $(".list-properties").each(function(){
                        if ($(this).attr("prop_id") == data_id) {
                            $(this).fadeOut().remove();
                        }
                    })
                })
                if($(this).hasClass("active")){
                    $(this).prev().addClass("active");
                }
                $(this).remove();
            }
        });
        
        // hapus jsonTab
        let jsonTabThis = JSON.parse(localStorage.getItem("jsonTab"));
        for (let i = 0; i < jsonTabThis.length; i++) {
            const projectId = jsonTabThis[i].project_id;
            if(projectId == project_id){
                jsonTabThis.splice(i, 1);
            }
        }
        localStorage.setItem("jsonTab", JSON.stringify(jsonTabThis));

    }

    // $(projectTab).remove();
    
    // if ($(".project-tab").length > 0) {
    //     if ($(projectTab).hasClass("active")) {
    //         if (indexProjectTab == 0) {
    //             fileDirectory = $(nextElement).attr("title");
    //             splitFileDirectory = fileDirectory.split("/");
    //             folderName = splitFileDirectory.shift();
                
    //             $(nextElement).addClass("active")
    //             $(prevElement).addClass("active");

    //             $(".project-container").each(function(i){
    //                 if ($(this).attr("project_id") == project_id) { 
    //                     if($(this).hasClass("active")){
    //                         $(this).next().addClass("active");
    //                     }
    //                     $(this).remove();
    //                 }
    //             });

    //             setTimeout(() => {
    //                 $(".sidebar-content-header .folder-name").text(folderName);
    //             }, 100);
    //         }else{
    //             var fileDirectory = $(prevElement).attr("title");
    //             var splitFileDirectory = fileDirectory.split("/");
    //             var folderName = splitFileDirectory.shift();
    
    //             $(prevElement).addClass("active");

                
    //             setTimeout(() => {
    //                 $(".sidebar-content-header .folder-name").text(folderName);
    //             }, 100);
    //         }
    //     }
    // }else{
    //     setTimeout(() => {
    //         $(".sidebar-content-header .folder-name").text("Uncal BPM Workspace");
    //         $("#flow-section .content-box").addClass("empty-project");
    //         $(".project-menu-tab .utility-group").removeClass("d-flex").fadeOut();

    //         if ($(".sidebar").hasClass("collapsed")) {
    //             $("#flow-section").removeClass("col-md-9").addClass("col-md-12");
    //             $("#palette-section").addClass("d-none")
    //         }else{
    //             $("#flow-section").removeClass("col-md-7").addClass("col-md-10");
    //             $("#palette-section").addClass("d-none");
    //         }
        
    //     }, 100);
    // }
    
    // $(".project-container").each(function(i){
    //     if ($(this).attr("project_id") == project_id) { 
    //         var elementItem = $(this).find(".element-item");
    //         $(elementItem).each(function(){
    //             var data_id = $(this).attr("data_id");
    //             $(".floating-properties").each(function(){
    //                 if ($(this).attr("prop_id") == data_id) {
    //                     $(this).fadeOut().remove(); 
    //                 }
    //             });
    //             $(".list-properties").each(function(){
    //                 if ($(this).attr("prop_id") == data_id) {
    //                     $(this).fadeOut().remove();
    //                 }
    //             })
    //         })
    //         if($(this).hasClass("active")){
    //             $(this).prev().addClass("active");
    //         }
    //         $(this).remove();
    //     }
    // });
    
    // // hapus jsonTab
    // let jsonTabThis = JSON.parse(localStorage.getItem("jsonTab"));
    // for (let i = 0; i < jsonTabThis.length; i++) {
    //     const projectId = jsonTabThis[i].project_id;
    //     if(projectId == project_id){
    //         jsonTabThis.splice(i, 1);
    //     }
    // }
    // localStorage.setItem("jsonTab", JSON.stringify(jsonTabThis));
}

// show jsonTab
setTimeout(() => {
    jsonTabExample();
    readJsonTab();
}, 300);

// jsonTab example
function jsonTabExample(){
    var jsonFolderExam = JSON.parse(localStorage.getItem("jsonFolder"));
    console.log("jsonFolderExam: ", jsonFolderExam);
    if (jsonFolderExam.length != 0) {
        let jsonTab = [{
            folder: jsonFolderExam[0].name,
            folder_id: jsonFolderExam[0].uuid,
            project: jsonFolderExam[0].files[0].name,
            project_id: jsonFolderExam[0].files[0].uuid,
            jsonData: jsonData,
            tab_status: "unsaved"
        }, {
            folder: jsonFolderExam[1].name,
            folder_id: jsonFolderExam[1].uuid,
            project: jsonFolderExam[1].files[0].name,
            project_id: jsonFolderExam[1].files[0].uuid,
            jsonData: jsonData2,
            tab_status: "saved"
        }];
    
        var getJsonTab = localStorage.getItem("jsonTab");
        console.log("getJsonTab: ", getJsonTab);
        if(getJsonTab == "" || getJsonTab == null /* || getLocal == "[]" */){
            localStorage.setItem("jsonTab", JSON.stringify(jsonTab));
        } 
    }
}

// baca jsonTab
function readJsonTab(){
    var readJsonTab = JSON.parse(localStorage.getItem("jsonTab"));
    if(readJsonTab.length != 0){
        for (let h = 0; h < readJsonTab.length; h++) {
            const tab = readJsonTab[h];
            let projectUuid = tab.project_id;
            let jsonData = tab.jsonData;
        
            setTimeout(() => {
                // tambah tab
                let projectHtml = $('[file_id="'+ projectUuid +'"]').find("a");
                projectHtml.dblclick();

                removeUnsavedStatus();
                if(tab.tab_status == "unsaved"){
					toggleSaveProjectButton(tab.project_id)									
				}
    
                // isi canvas di tab
                for (let i = 0; i < jsonData.length; i++) {
                    setTimeout(() => {
                        const flow = jsonData[i];
                        var flow_name = flow.name;
                        var flow_id = flow.uuid;
                        var type_com0 = flow.components[0].type;
                        var id_com0 = flow.components[0].uuid;
    
                        var components = flow.components;
                        var firstCompId = components[0].uuid;
                        var firstCompName = components[0].name;
                        
                        addFlow('#'+type_com0, id_com0, firstCompName, projectUuid);
                        let flowDg = $(".project-container[project_id='"+projectUuid+"']").find(".flow-diagram");
                        $(flowDg).eq(i).attr("flow_id",flow_id);
                        $(flowDg).eq(i).find("input").val(flow_name);
                    
                        // recurComp(components, firstCompId, i);
                        flatComp(components, i, projectUuid);
                    }, 300*(i+1));
                }
            }, 300*(h+1));
        }
    }
}