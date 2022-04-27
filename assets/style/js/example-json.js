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

// == LEVELING SWITCH (LEVEL 1) ==
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


// == LEVELING SWITCH (++ ) 
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
                    "path": "/opt/hamster/video",
                    "polling": 10,
                    "retry": 60,
                    "filename": "video.mp4",
                    "fileEvent": 2,
                    "folderName": "assets",
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
                        "level": 0,
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
                        "level": 0,
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
                    {
                        "id": "1-2-3",
                        "type": "receiver-ftp",
                        "name": "ftp-rec",
                        "level": 1,
                        "pid": "1-2-1",
                        "index": 0,
                        "properties": {
                            "path": "/opt/xfantasy/assets",
                            "polling": 20,
                            "retry": 60,
                            "ip": "192.168.1.56",
                            "port": 21,
                            "username" : "testuser",
                            "password" : "testing111",
                            "ssl": true,
                            "explicit": false,
                            "filename": "lolz"
                        }
                    },
                ],
            },
            {
                "id": "1-3",
                "type": "receiver-ftp",
                "name": "ftp-test",
                "level": 2,
                "pid": "1-2",
                "index": 0,
                "properties": {
                    "path": "/home/nudetube/img",
                    "polling": 20,
                    "retry": 60,
                    "ip": "192.168.1.666",
                    "port": 21,
                    "username" : "admin",
                    "password" : "1234",
                    "ssl": false,
                    "explicit": true,
                    "filename": "finalCrime.img"
                }
            },
        ],
    }
]