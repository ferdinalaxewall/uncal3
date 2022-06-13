<div class="row justify-content-center mt-2" id="sender-nfs-page">
    <div class="col-md-11 config-box row">
        <div class="input-group mb-2 col-md-12 d-flex flex-column" id="properties-name">
            <label for="sender-nfs-propname">Properties Name</label>
            <input type="text" class="input-field" id="sender-nfs-propname">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-nfs-path">Path</label>
            <input type="text" class="input-field" id="sender-nfs-path">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-nfs-polling">Polling (second)</label>
            <input type="number" class="input-field" id="sender-nfs-polling">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-nfs-retry">Retry (second)</label>
            <input type="number" class="input-field" id="sender-nfs-retry">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-nfs-file_name">Filename</label>
            <input type="text" class="input-field" id="sender-nfs-file_name">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-nfs-file_event">FileEvent</label>
            <select class="form-select form-select-sm w-100 text-small" id="sender-nfs-file_event" onchange="changeSenderNfs(this)">
                <option value="1" selected>Remove</option>
                <option value="2">Move</option>
                <option value="3">Rename</option>
            </select>
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column d-none">
            <label for="sender-nfs-folder_name">FolderName</label>
            <input type="text" class="input-field" id="sender-nfs-folder_name">
        </div>
    </div>
</div>

<script>
    // fileEvent
    function changeSenderNfs(e) {
        if(e.value==2){
            $(e).closest(".config-box").find("#sender-nfs-folder_name").parent().attr('style','display: block !important');
        } else {
            $(e).closest(".config-box").find("#sender-nfs-folder_name").parent().attr('style','display: none !important');
        }
    }
</script>