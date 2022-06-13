<div class="row justify-content-center mt-2" id="sender-ftp-page">
    <div class="col-md-11 config-box row">
        <div class="input-group mb-2 col-md-12 d-flex flex-column" id="properties-name">
            <label for="sender-ftp-propname">Properties Name</label>
            <input type="text" class="input-field" id="sender-ftp-propname">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-ftp-path">Path</label>
            <input type="text" class="input-field" id="sender-ftp-path">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-ftp-polling">Polling (second)</label>
            <input type="number" class="input-field" id="sender-ftp-polling">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-ftp-retry">Retry (second)</label>
            <input type="number" class="input-field" id="sender-ftp-retry">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-ftp-ip">IP</label>
            <input type="text" class="input-field" id="sender-ftp-ip">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-ftp-port">Port</label>
            <input type="number" class="input-field" id="sender-ftp-port">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-ftp-username">Username</label>
            <input type="text" class="input-field" id="sender-ftp-username">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-ftp-password">Password</label>
            <input type="text" class="input-field" id="sender-ftp-password">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-ftp-file_name">Filename</label>
            <input type="text" class="input-field" id="sender-ftp-file_name">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-ftp-file_event">FileEvent</label>
            <select class="form-select form-select-sm w-100 text-small" id="sender-ftp-file_event" onchange="changeSenderFtp(this)">
                <option value="1" selected>Remove</option>
                <option value="2">Move</option>
                <option value="3">Rename</option>
            </select>
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column d-none">
            <label for="sender-ftp-folder_name">FolderName</label>
            <input type="text" class="input-field" id="sender-ftp-folder_name">
        </div>
        <div class="input-group form-check mb-2 col-md-12 d-flex flex-column">
            <label for="sender-ftp-ssl">SSL (FTPS)</label>
            <input class="form-check-input" type="checkbox" id="sender-ftp-ssl" checked>
        </div>
        <div class="input-group form-check mb-2 col-md-12 d-flex flex-column">
            <label for="sender-ftp-explicit">Explicit (FTPe)</label>
            <input class="form-check-input" type="checkbox" id="sender-ftp-explicit" checked>
        </div>
    </div>
</div>

<script>
    // fileEvent
    function changeSenderFtp(e) {
        if(e.value==2){
            $(e).closest(".config-box").find("#sender-nfs-folder_name").parent().attr('style','display: block !important');
        } else {
            $(e).closest(".config-box").find("#sender-nfs-folder_name").parent().attr('style','display: none !important');
        }
    }
</script>