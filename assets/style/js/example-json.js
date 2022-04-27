// == FLAT LEVEL ==
// [
// 	{
// 		"name": "flow1",
// 		"index": 0,
// 		"components": [
// 			{
// 				"id": "0-1",
// 				"type": "sender-tcp",
// 				"name": "tcp-test",
// 				"level": 0,
// 				"pid": "0-0",
// 				"index": 0,
// 				"properties": {
// 					"port": 8080,
// 					"name": "xxx",
// 					"thread": 1,
// 					"keepopen": true,
// 					"wait": 60
// 				}
// 			},
// 			{
// 				"id": "0-2",
// 				"type": "receiver-nfs",
// 				"name": "nfs-test",
// 				"level": 1,
// 				"pid": "0-1",
// 				"index": 0,
// 				"properties": {
// 					"path": "/opt/xxnx",
// 					"polling": 10,
// 					"retry": 60,
// 					"filename": "getfucked.3gp"
// 				}
// 			},
// 			{
// 				"id": "0-3",
// 				"type": "receiver-jdbc",
// 				"name": "nfs-jdbc",
// 				"level": 2,
// 				"pid": "0-2",
// 				"index": 0,
// 				"properties": {
// 					"host": "192.168.1.56",
// 					"port": "3306",
// 					"username": "sa",
// 					"password": "test",
// 					"dbname": "databaseku",
// 					"dbtype": "mysql",
// 					"polling": 20,
// 					"retry": 60
// 				}
// 			}
// 		]
// 	},
// 	{
// 		"name": "flow2",
// 		"index": 1,
// 		"components": [
// 			{
// 				"id": "1-1",
// 				"type": "sender-nfs",
// 				"name": "nfs-test",
// 				"level": 0,
// 				"pid": "1-0",
// 				"index": 0,
// 				"properties": {
// 					"port": 8080,
// 					"name": "xxx",
// 					"thread": 1,
// 					"keepopen": true,
// 					"wait": 60
// 				}
// 			},
// 			{
// 				"id": "1-2",
// 				"type": "object-switching",
// 				"name": "my-switching",
// 				"level": 1,
// 				"pid": "1-1",
// 				"index": 0,
// 				"properties": {
// 					"switch-case": "object",
// 					"if-else": "object",
// 					"customization": "java-code"
// 				}
// 			},
// 			{
// 				"id": "1-3",
// 				"type": "receiver-jdbc",
// 				"name": "jdbc-mysql",
// 				"level": 2,
// 				"pid": "1-2",
// 				"index": 0,
// 				"properties": {
// 					"host": "192.168.1.56",
// 					"port": "3306",
// 					"username": "sa",
// 					"password": "test",
// 					"dbname": "databaseku",
// 					"dbtype": "mysql",
// 					"polling": 20,
// 					"retry": 60
// 				}
// 			},
// 			{
// 				"id": "1-4",
// 				"type": "receiver-jdbc",
// 				"name": "jdbc-mssql",
// 				"level": 2,
// 				"pid": "1-2",
// 				"index": 1,
// 				"properties": {
// 					"host": "192.168.1.39",
// 					"port": "1433",
// 					"username": "sa",
// 					"password": "password",
// 					"dbname": "db-server",
// 					"dbtype": "mssql",
// 					"polling": 20,
// 					"retry": 60
// 				}
// 			}
// 		]
// 	}
// ]

// == LEVELING SWITCH ==
[
    {
        "name": "flow1",
        "index": 0,
        "components": [
            {
                "id": "0-1",
                "type": "sender-tcp",
                "name": "tcp-test",
                "level": 0,
                "pid": "0-0",
                "index": 0,
                "properties": {
                    "port": 8080,
                    "name": "xxx",
                    "thread": 1,
                    "keepopen": true,
                    "wait": 60
                }
            },
            {
                "id": "0-2",
                "type": "receiver-nfs",
                "name": "nfs-test",
                "level": 1,
                "pid": "0-1",
                "index": 0,
                "properties": {
                    "path": "/opt/xxnx", 
                    "polling": 10,
                    "retry": 60, 
                    "filename": "getfucked.3gp"
                }
            },
            {
                "id": "0-3",
                "type": "receiver-jdbc",
                "name": "nfs-jdbc",
                "level": 2,
                "pid": "0-2",
                "index": 0,
                "properties": {
                    "host": "192.168.1.56",
                    "port": "3306",
                    "username": "sa",
                    "password": "test",
                    "dbname": "databaseku",
                    "dbtype": "mysql",
                    "polling": 20,
                    "retry": 60
                }
            }
        ]
    },
    {
        "name": "flow2",
        "index": 1,
        "components": [
            {
                "id": "1-1",
                "type": "sender-nfs",
                "name": "nfs-test",
                "level": 0,
                "pid": "1-0",
                "index": 0,
                "properties": {
                    "port": 8080,
                    "name": "xxx",
                    "thread": 1,
                    "keepopen": true,
                    "wait": 60
                }
            },
            {
                "id": "1-2",
                "type": "object-switching",
                "name": "my-switching",
                "level": 1,
                "pid": "1-1",
                "index": 0,
                "properties": {
                    "switch-case": "object",
                    "if-else": "object",
                    "customization": "java-code"
                },
                "components": [
                    {
                        "id": "1-2-1",
                        "type": "receiver-jdbc",
                        "name": "jdbc-mysql",
                        "level": 2,
                        "pid": "1-2",
                        "index": 0,
                        "properties": {
                            "host": "192.168.1.56",
                            "port": "3306",
                            "username": "sa",
                            "password": "test",
                            "dbname": "databaseku",
                            "dbtype": "mysql",
                            "polling": 20,
                            "retry": 60
                        }
                    },
                    {
                        "id": "1-2-2",
                        "type": "receiver-jdbc",
                        "name": "jdbc-mssql",
                        "level": 2,
                        "pid": "1-2",
                        "index": 1,
                        "properties": {
                            "host": "192.168.1.39",
                            "port": "1433",
                            "username": "sa",
                            "password": "password",
                            "dbname": "db-server",
                            "dbtype": "mssql",
                            "polling": 20,
                            "retry": 60
                        }
                    }, 
                ],
            },
        ],
    }
]