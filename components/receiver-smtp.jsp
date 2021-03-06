<div class="row justify-content-center mt-2" id="receiver-smtp-page">
    <div class="col-md-11 config-box row">
        <div class="input-group mb-2 col-md-12 d-flex flex-column" id="properties-name">
            <label for="receiver-smtp-propname">Properties Name</label>
            <input type="text" class="input-field" id="receiver-smtp-propname">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="receiver-smtp-host">Host</label>
            <input type="text" class="input-field" id="receiver-smtp-host">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="receiver-smtp-port">Port</label>
            <input type="number" class="input-field" id="receiver-smtp-port">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="receiver-smtp-username">Username</label>
            <input type="text" class="input-field" id="receiver-smtp-username">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="receiver-smtp-password">Password</label>
            <input type="text" class="input-field" id="receiver-smtp-password">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="receiver-smtp-protocol">Protocol</label>
            <select class="form-select form-select-sm w-100 text-small" id="receiver-smtp-protocol">
                <option value="1" selected>IMAP4</option>
                <option value="2">POP3</option>
            </select>
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="receiver-smtp-polling">Polling (second)</label>
            <input type="number" class="input-field" id="receiver-smtp-polling">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="receiver-smtp-retry">Retry</label>
            <input type="number" class="input-field" id="receiver-smtp-retry" value="3">
        </div>
        <div class="input-group form-check mb-2 col-md-12 d-flex flex-column">
            <label for="receiver-smtp-start_tls">StartTLS</label>
            <input class="form-check-input" type="checkbox" id="receiver-smtp-start_tls" checked>
        </div>
    </div>   
</div>