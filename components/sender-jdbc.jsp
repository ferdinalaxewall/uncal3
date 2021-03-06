<div class="row justify-content-center mt-2" id="sender-jdbc-page">
    <div class="col-md-11 config-box row">
        <div class="input-group mb-2 col-md-12 d-flex flex-column" id="properties-name">
            <label for="sender-jdbc-propname">Properties Name</label>
            <input type="text" class="input-field" id="sender-jdbc-propname">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-jdbc-host">Host</label>
            <input type="text" class="input-field" id="sender-jdbc-host">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-jdbc-port">Port</label>
            <input type="number" class="input-field" id="sender-jdbc-port">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-jdbc-username">Username</label>
            <input type="text" class="input-field" id="sender-jdbc-username">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-jdbc-password">Password</label>
            <input type="text" class="input-field" id="sender-jdbc-password">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-jdbc-db_name">DBName</label>
            <input type="text" class="input-field" id="sender-jdbc-db_name">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-jdbc-db_type">DBType</label>
            <select class="form-select form-select-sm w-100 text-small" id="sender-jdbc-db_type">
                <option value="MYSQL" selected>MYSQL</option>
                <option value="MSSQL">MSSQL</option>
                <option value="ORACLE">ORACLE</option>
                <option value="POSTGRE">POSTGRE</option>
            </select>
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-jdbc-query">Query</label>
            <input type="text" class="input-field" id="sender-jdbc-query">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-jdbc-polling">Polling (second)</label>
            <input type="number" class="input-field" id="sender-jdbc-polling">
        </div>
        <div class="input-group mb-2 col-md-12 d-flex flex-column">
            <label for="sender-jdbc-retry">Retry (second)</label>
            <input type="number" class="input-field" id="sender-jdbc-retry">
        </div>
    </div>
</div>