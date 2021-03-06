<div class="row justify-content-center mt-2" id="receiver-ftp-page">
    <div class="col-md-11 config-box row">
        <div class="input-group mb-2 col-md-12 d-flex flex-column" id="properties-name">
            <label for="receiver-ftp-propname">Properties Name</label>
            <input type="text" class="input-field" id="receiver-ftp-propname">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="receiver-ftp-path">Path</label>
            <input type="text" class="input-field" id="receiver-ftp-path">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="receiver-ftp-polling">Polling (second)</label>
            <input type="number" class="input-field" id="receiver-ftp-polling">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="receiver-ftp-retry">Retry</label>
            <input type="number" class="input-field" id="receiver-ftp-retry" value="3">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="receiver-ftp-ip">IP</label>
            <input type="text" class="input-field" id="receiver-ftp-ip">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="receiver-ftp-port">Port</label>
            <input type="number" class="input-field" id="receiver-ftp-port">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="receiver-ftp-username">Username</label>
            <input type="text" class="input-field" id="receiver-ftp-username">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="receiver-ftp-password">Password</label>
            <input type="text" class="input-field" id="receiver-ftp-password">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="receiver-ftp-file_name">Filename</label>
            <input type="text" class="input-field" id="receiver-ftp-file_name">
        </div>
        <div class="input-group form-check mb-2 col-md-12 d-flex flex-column">
            <label for="receiver-ftp-ssl">SSL (FTPS)</label>
            <!-- <input type="text" class="input-field" id="receiver-ftp-ssl"> -->
            <input class="form-check-input" type="checkbox" id="receiver-ftp-ssl" checked>
        </div>
        <div class="input-group form-check mb-2 col-md-12 d-flex flex-column">
            <label for="receiver-ftp-explicit">Explicit (FTPe)</label>
            <!-- <input type="text" class="input-field" id="receiver-ftp-explicit"> -->
            <input class="form-check-input" type="checkbox" id="receiver-ftp-explicit" checked>
        </div>
    </div>
</div>