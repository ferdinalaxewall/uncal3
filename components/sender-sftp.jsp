<div class="row justify-content-center mt-2" id="sender-sftp-page">
    <div class="col-md-11 config-box row">
        <div class="input-group mb-2 col-md-12 d-flex flex-column" id="properties-name">
            <label for="sender-sftp-propname">Properties Name</label>
            <input type="text" class="input-field" id="sender-sftp-propname">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-sftp-path">Path</label>
            <input type="text" class="input-field" id="sender-sftp-path">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-sftp-polling">Polling (second)</label>
            <input type="number" class="input-field" id="sender-sftp-polling">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-sftp-retry">Retry (second)</label>
            <input type="number" class="input-field" id="sender-sftp-retry">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-sftp-ip">IP</label>
            <input type="text" class="input-field" id="sender-sftp-ip">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-sftp-port">Port</label>
            <input type="number" class="input-field" id="sender-sftp-port">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-sftp-username">Username</label>
            <input type="text" class="input-field" id="sender-sftp-username">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-sftp-password">Password</label>
            <input type="text" class="input-field" id="sender-sftp-password">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-sftp-mode">Mode</label>
            <select class="form-select form-select-sm w-100 text-small" id="sender-sftp-mode">
                <option value="1" selected>sftp</option>
                <option value="2">exec</option>
                <option value="3">shell</option>
            </select>
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-sftp-file_name">Filename</label>
            <input type="text" class="input-field" id="sender-sftp-file_name">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-sftp-file_event">FileEvent</label>
            <select class="form-select form-select-sm w-100 text-small" id="sender-sftp-file_event" onchange="changeSenderSftp(this)">
                <option value="1" selected>Remove</option>
                <option value="2">Move</option>
                <option value="3">Rename</option>
            </select>
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column d-none">
            <label for="sender-sftp-folder_name">FolderName</label>
            <input type="text" class="input-field" id="sender-sftp-folder_name">
        </div>
    </div>
</div>

<script>
    // fileEvent
    function changeSenderSftp(e) {
        if(e.value==2){
            $(e).closest(".config-box").find("#sender-nfs-folder_name").parent().attr('style','display: block !important');
        } else {
            $(e).closest(".config-box").find("#sender-nfs-folder_name").parent().attr('style','display: none !important');
        }
    }
</script>