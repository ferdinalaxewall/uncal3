<div class="row justify-content-center mt-2" id="sender-imap-page">
    <div class="col-md-11 config-box row">
        <div class="input-group mb-2 col-md-12 d-flex flex-column" id="properties-name">
            <label for="sender-imap-propname">Properties Name</label>
            <input type="text" class="input-field" id="sender-imap-propname">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-imap-host">Host</label>
            <input type="text" class="input-field" id="sender-imap-host">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-imap-port">Port</label>
            <input type="number" class="input-field" id="sender-imap-port">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-imap-username">Username</label>
            <input type="text" class="input-field" id="sender-imap-username">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-imap-password">Password</label>
            <input type="text" class="input-field" id="sender-imap-password">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-imap-protocol">Protocol</label>
            <select class="form-select form-select-sm w-100 text-small" id="sender-imap-protocol">
                <option value="1" selected>IMAP4</option>
                <option value="2">POP3</option>
            </select>
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-imap-title">Title</label>
            <input type="text" class="input-field" id="sender-imap-title">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-imap-polling">Polling (second)</label>
            <input type="number" class="input-field" id="sender-imap-polling">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-imap-retry">Retry (second)</label>
            <input type="number" class="input-field" id="sender-imap-retry">
        </div>
        <div class="input-group form-check mb-2 col-md-12 d-flex flex-column pr-0">
            <label for="sender-imap-start_tls">StartTLS</label>
            <input class="form-check-input" type="checkbox" id="sender-imap-start_tls" checked>
        </div>
        <div class="input-group form-check mb-2 col-md-12 d-flex flex-column pr-0">
            <label for="sender-imap-delete">Delete</label>
            <input class="form-check-input" type="checkbox" id="sender-imap-delete" checked>
        </div>
    </div>
</div>