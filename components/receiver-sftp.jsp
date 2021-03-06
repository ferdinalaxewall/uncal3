<div class="row justify-content-center mt-2" id="receiver-sftp-page">
    <div class="col-md-11 config-box row">
        <div class="input-group mb-2 col-md-12 d-flex flex-column" id="properties-name">
            <label for="receiver-sftp-propname">Properties Name</label>
            <input type="text" class="input-field" id="receiver-sftp-propname">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="receiver-sftp-path">Path</label>
            <input type="text" class="input-field" id="receiver-sftp-path">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="receiver-sftp-polling">Polling (second)</label>
            <input type="number" class="input-field" id="receiver-sftp-polling">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="receiver-sftp-retry">Retry</label>
            <input type="number" class="input-field" id="receiver-sftp-retry">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="receiver-sftp-ip">IP</label>
            <input type="text" class="input-field" id="receiver-sftp-ip">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="receiver-sftp-port">Port</label>
            <input type="number" class="input-field" id="receiver-sftp-port">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="receiver-sftp-username">Username</label>
            <input type="text" class="input-field" id="receiver-sftp-username">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="receiver-sftp-password">Password</label>
            <input type="text" class="input-field" id="receiver-sftp-password">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="receiver-sftp-mode">Mode</label>
            <select class="form-select form-select-sm w-100 text-small" id="receiver-sftp-mode">
                <option value="sftp" selected>sftp</option>
                <option value="exec">exec</option>
                <option value="shell">shell</option>
            </select>
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="receiver-sftp-file_name">Filename</label>
            <input type="text" class="input-field" id="receiver-sftp-file_name">
        </div>
    </div>
</div>