define({ "api": [
  {
    "type": "post",
    "url": "/login",
    "title": "Login",
    "name": "Login",
    "group": "Authorization",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username login</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password login</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "JSON",
            "optional": false,
            "field": "400/BadRequest",
            "description": "<p><code>Response.message</code> : Please provide 'username' and 'password'</p>"
          },
          {
            "group": "Error 4xx",
            "type": "JSON",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p><code>Response.message</code> : The given combination of password and username did not exist.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "data",
            "description": "<p><a href=\"#api-User-Model\">User</a> that has been logged in</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The JWT-token for your user</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Indicates if request has been succesfully handled (<code>status === 200</code>)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "description": "<p>Response status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>null</code> on success</p>"
          }
        ]
      }
    },
    "filename": "components/login/routers/login.doc.js",
    "groupTitle": "Authorization"
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Register",
    "name": "Register",
    "group": "Authorization",
    "version": "0.0.1",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username login</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password login</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>emailadress for you account</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "JSON",
            "optional": false,
            "field": "400/BadRequest",
            "description": "<p><code>Response.message</code> : Please provide 'username', 'password' and 'email'</p>"
          },
          {
            "group": "Error 4xx",
            "type": "JSON",
            "optional": false,
            "field": "409/ConflictMail",
            "description": "<p><code>Response.message</code> : An account has already been registrated to this mailadress.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "JSON",
            "optional": false,
            "field": "409/ConflictUsername",
            "description": "<p><code>Response.message</code> : This username is already in use.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "data",
            "description": "<p><a href=\"#api-User-Model\">User</a> that has been logged in</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The JWT-token for your user</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Indicates if request has been succesfully handled (<code>status === 200</code>)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "description": "<p>Response status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>null</code> on success</p>"
          }
        ]
      }
    },
    "filename": "components/login/routers/login.doc.js",
    "groupTitle": "Authorization"
  },
  {
    "type": "delete",
    "url": "/obstacles/:id",
    "title": "Delete Obstacle",
    "version": "0.0.1",
    "name": "Delete",
    "group": "Obstacle",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>MongoID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Obstacle",
            "optional": false,
            "field": "data",
            "description": "<p><a href=\"#api-Obstacle-Model\">Obstacle</a> that has been deleted</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Indicates if request has been succesfully handled (<code>status === 200</code>)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "description": "<p>Response status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>null</code> on success</p>"
          }
        ]
      }
    },
    "filename": "components/obstacle/routes/obstacle.doc.js",
    "groupTitle": "Obstacle",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The JWT-token header: &quot;JWT {{ TOKEN }}&quot;.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p><code>Response.message</code> : Token is invalid or not provided</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/obstacles",
    "title": "Get Obstacles",
    "version": "0.0.1",
    "name": "Get",
    "group": "Obstacle",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Obstacle[]",
            "optional": false,
            "field": "data",
            "description": "<p>Array of <a href=\"#api-Obstacle-Model\">Obstacle</a>s</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Indicates if request has been succesfully handled (<code>status === 200</code>)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "description": "<p>Response status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>null</code> on success</p>"
          }
        ]
      }
    },
    "filename": "components/obstacle/routes/obstacle.doc.js",
    "groupTitle": "Obstacle",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The JWT-token header: &quot;JWT {{ TOKEN }}&quot;.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p><code>Response.message</code> : Token is invalid or not provided</p>"
          }
        ]
      }
    }
  },
  {
    "type": "none",
    "url": "/",
    "title": "Model Structure",
    "version": "0.0.1",
    "name": "Model",
    "group": "Obstacle",
    "deprecated": {
      "content": "This is only used to define the model."
    },
    "filename": "components/obstacle/routes/obstacle.doc.js",
    "groupTitle": "Obstacle",
    "success": {
      "fields": {
        "Model Autogenerated": [
          {
            "group": "Model Autogenerated",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>MongoID this is autogenerated depending on the HTTP method</p>"
          },
          {
            "group": "Model Autogenerated",
            "type": "String",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Indicated when the document has been updated</p>"
          },
          {
            "group": "Model Autogenerated",
            "type": "String",
            "optional": false,
            "field": "created_at",
            "description": "<p>Indicated when the document has been created</p>"
          }
        ],
        "Model": [
          {
            "group": "Model",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": ""
          },
          {
            "group": "Model",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": ""
          },
          {
            "group": "Model",
            "type": "GeoJSON",
            "optional": true,
            "field": "geometry",
            "description": ""
          },
          {
            "group": "Model",
            "type": "String",
            "optional": false,
            "field": ".type",
            "description": "<p>default &quot;Point&quot;</p>"
          },
          {
            "group": "Model",
            "type": "Double[]",
            "optional": false,
            "field": ".coordinates",
            "description": "<p>containing long and lang double</p>"
          },
          {
            "group": "Model",
            "type": "User",
            "optional": false,
            "field": "created_by",
            "description": ""
          },
          {
            "group": "Model",
            "type": "String[]",
            "optional": true,
            "field": "images",
            "description": ""
          },
          {
            "group": "Model",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>enum <code>[ NEW, REPORTED, DECLINED, IN_PORGRESS, SOLVED ]</code></p>"
          },
          {
            "group": "Model",
            "type": "String",
            "optional": false,
            "field": "factor",
            "description": "<p>enum <code>[ HIGH, MEDIUM, LOW ]</code></p>"
          }
        ]
      }
    }
  },
  {
    "type": "patch",
    "url": "/obstacles/:id",
    "title": "Patch Obstacle",
    "version": "0.0.1",
    "name": "Patch",
    "group": "Obstacle",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>MongoID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Obstacle",
            "optional": false,
            "field": "data",
            "description": "<p><a href=\"#api-Obstacle-Model\">Obstacle</a> that has been patched</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Indicates if request has been succesfully handled (<code>status === 200</code>)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "description": "<p>Response status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>null</code> on success</p>"
          }
        ]
      }
    },
    "filename": "components/obstacle/routes/obstacle.doc.js",
    "groupTitle": "Obstacle",
    "description": "<p>Patch is used to update certain parts of a document, it is thus not threatened as a whole document.</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "400/BadId",
            "description": "<p><code>Response.message</code> : Please provide a valid 'id'</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "204/NoContent",
            "description": "<p><code>Response.message</code> : Please provide values with your PATCH request</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "400/BadParameter",
            "description": "<p><code>Response.message</code> : Please provide a valid parameter to this PATCH request</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "404/NotFound",
            "description": "<p><code>Response.message</code> : Could not find entity with <code>{req.params}</code></p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p><code>Response.message</code> : Token is invalid or not provided</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The JWT-token header: &quot;JWT {{ TOKEN }}&quot;.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/obstacles",
    "title": "Post Obstacle",
    "version": "0.0.1",
    "name": "Post",
    "group": "Obstacle",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Obstacle",
            "optional": false,
            "field": "data",
            "description": "<p><a href=\"#api-Obstacle-Model\">Obstacle</a> that has been posted</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Indicates if request has been succesfully handled (<code>status === 200</code>)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "description": "<p>Response status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>null</code> on success</p>"
          }
        ]
      }
    },
    "filename": "components/obstacle/routes/obstacle.doc.js",
    "groupTitle": "Obstacle",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The JWT-token header: &quot;JWT {{ TOKEN }}&quot;.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p><code>Response.message</code> : Token is invalid or not provided</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/obstacles/:id",
    "title": "Put Obstacle",
    "version": "0.0.1",
    "name": "Put",
    "group": "Obstacle",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>MongoID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Obstacle",
            "optional": false,
            "field": "data",
            "description": "<p><a href=\"#api-Obstacle-Model\">Obstacle</a> that has been 'put'</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Indicates if request has been succesfully handled (<code>status === 200</code>)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "description": "<p>Response status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>null</code> on success</p>"
          }
        ]
      }
    },
    "filename": "components/obstacle/routes/obstacle.doc.js",
    "groupTitle": "Obstacle",
    "description": "<p>Put is used to <b>replace</b> the selected document completely. This request <b>expects</b> you to give a whole document and is threatened that way. <br /> When the selected documented does not exist, it will create a new one.</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "400/BadId",
            "description": "<p><code>Response.message</code> : Please provide a valid 'id'</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "204/NoContent",
            "description": "<p><code>Response.message</code> : Please provide values with your PUT request</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "400/BadParameter",
            "description": "<p><code>Response.message</code> : Please provide a valid parameter to this PUT request</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p><code>Response.message</code> : Token is invalid or not provided</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The JWT-token header: &quot;JWT {{ TOKEN }}&quot;.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Delete User",
    "version": "0.0.1",
    "name": "Delete",
    "group": "User",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>MongoID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "data",
            "description": "<p><a href=\"#api-User-Model\">User</a> that has been deleted</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Indicates if request has been succesfully handled (<code>status === 200</code>)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "description": "<p>Response status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>null</code> on success</p>"
          }
        ]
      }
    },
    "filename": "components/user/routes/user.doc.js",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The JWT-token header: &quot;JWT {{ TOKEN }}&quot;.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p><code>Response.message</code> : Token is invalid or not provided</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Get Users",
    "version": "0.0.1",
    "name": "Get",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User[]",
            "optional": false,
            "field": "data",
            "description": "<p>Array of <a href=\"#api-User-Model\">User</a>s</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Indicates if request has been succesfully handled (<code>status === 200</code>)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "description": "<p>Response status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>null</code> on success</p>"
          }
        ]
      }
    },
    "filename": "components/user/routes/user.doc.js",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The JWT-token header: &quot;JWT {{ TOKEN }}&quot;.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p><code>Response.message</code> : Token is invalid or not provided</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Get User",
    "version": "0.0.1",
    "name": "Getone",
    "group": "User",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>MongoID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "data",
            "description": "<p><a href=\"#api-User-Model\">User</a> that has been patched</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Indicates if request has been succesfully handled (<code>status === 200</code>)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "description": "<p>Response status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>null</code> on success</p>"
          }
        ]
      }
    },
    "filename": "components/user/routes/user.doc.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "400/BadId",
            "description": "<p><code>Response.message</code> : Please provide a valid 'id'</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p><code>Response.message</code> : Token is invalid or not provided</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The JWT-token header: &quot;JWT {{ TOKEN }}&quot;.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "none",
    "url": "/",
    "title": "Model Structure",
    "version": "0.0.2",
    "name": "Model",
    "group": "User",
    "deprecated": {
      "content": "This is only used to define the model."
    },
    "success": {
      "fields": {
        "Model Autogenerated": [
          {
            "group": "Model Autogenerated",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>MongoID this is autogenerated depending on the HTTP method</p>"
          },
          {
            "group": "Model Autogenerated",
            "type": "String",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Indicated when the document has been updated</p>"
          },
          {
            "group": "Model Autogenerated",
            "type": "String",
            "optional": false,
            "field": "created_at",
            "description": "<p>Indicated when the document has been created</p>"
          }
        ],
        "Model": [
          {
            "group": "Model",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": ""
          },
          {
            "group": "Model",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Model",
            "type": "String",
            "optional": true,
            "field": "firstname",
            "description": ""
          },
          {
            "group": "Model",
            "type": "String",
            "optional": true,
            "field": "lastname",
            "description": ""
          },
          {
            "group": "Model",
            "type": "String",
            "optional": true,
            "field": "tel",
            "description": ""
          },
          {
            "group": "Model",
            "type": "Object",
            "optional": true,
            "field": "address",
            "description": ""
          },
          {
            "group": "Model",
            "type": "String",
            "optional": false,
            "field": ".street",
            "description": ""
          },
          {
            "group": "Model",
            "type": "String",
            "optional": false,
            "field": ".house_number",
            "description": ""
          },
          {
            "group": "Model",
            "type": "String",
            "optional": false,
            "field": ".city",
            "description": ""
          },
          {
            "group": "Model",
            "type": "String",
            "optional": false,
            "field": ".zip_code",
            "description": ""
          },
          {
            "group": "Model",
            "type": "Object[]",
            "optional": true,
            "field": "roles",
            "description": "<p>A user can have multiple roles in multiple departments. <br /><b>Default: </b> one Role <code>{&quot;role&quot;: &quot;GUEST&quot;, &quot;department&quot;: null}</code></p>"
          },
          {
            "group": "Model",
            "type": "String",
            "optional": false,
            "field": ".role",
            "description": "<p>enum <code>[ &quot;ADMIN&quot;, &quot;MODERATOR&quot;, &quot;CONTROLER&quot;, &quot;VOLUNTEER&quot;, &quot;GUEST&quot;]</code></p>"
          },
          {
            "group": "Model",
            "type": "Department",
            "optional": true,
            "field": ".department",
            "description": ""
          },
          {
            "group": "Model",
            "type": "String",
            "optional": true,
            "field": "profile_image",
            "description": ""
          },
          {
            "group": "Model",
            "type": "Boolean",
            "optional": true,
            "field": "is_active",
            "description": ""
          }
        ]
      }
    },
    "filename": "components/user/routes/user.doc.js",
    "groupTitle": "User"
  },
  {
    "type": "none",
    "url": "/",
    "title": "Model Structure",
    "version": "0.0.1",
    "name": "Model",
    "group": "User",
    "deprecated": {
      "content": "This is only used to define the model."
    },
    "success": {
      "fields": {
        "Model Autogenerated": [
          {
            "group": "Model Autogenerated",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>MongoID this is autogenerated depending on the HTTP method</p>"
          },
          {
            "group": "Model Autogenerated",
            "type": "String",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Indicated when the document has been updated</p>"
          },
          {
            "group": "Model Autogenerated",
            "type": "String",
            "optional": false,
            "field": "created_at",
            "description": "<p>Indicated when the document has been created</p>"
          }
        ],
        "Model": [
          {
            "group": "Model",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": ""
          },
          {
            "group": "Model",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Model",
            "type": "String",
            "optional": true,
            "field": "firstname",
            "description": ""
          },
          {
            "group": "Model",
            "type": "String",
            "optional": true,
            "field": "lastname",
            "description": ""
          },
          {
            "group": "Model",
            "type": "String",
            "optional": true,
            "field": "tel",
            "description": ""
          },
          {
            "group": "Model",
            "type": "Object",
            "optional": true,
            "field": "address",
            "description": ""
          },
          {
            "group": "Model",
            "type": "String",
            "optional": false,
            "field": ".street",
            "description": ""
          },
          {
            "group": "Model",
            "type": "String",
            "optional": false,
            "field": ".house_number",
            "description": ""
          },
          {
            "group": "Model",
            "type": "String",
            "optional": false,
            "field": ".city",
            "description": ""
          },
          {
            "group": "Model",
            "type": "String",
            "optional": false,
            "field": ".zip_code",
            "description": ""
          },
          {
            "group": "Model",
            "type": "Object[]",
            "optional": true,
            "field": "roles",
            "description": "<p>A user can have multiple roles in multiple departments</p>"
          },
          {
            "group": "Model",
            "type": "String",
            "optional": false,
            "field": ".role",
            "description": "<p>enum <code>[ &quot;ADMIN&quot;, &quot;MODERATOR&quot;, &quot;CONTROLER&quot;, &quot;VOLUNTEER&quot; ]</code></p>"
          },
          {
            "group": "Model",
            "type": "Department",
            "optional": false,
            "field": ".department",
            "description": ""
          },
          {
            "group": "Model",
            "type": "String",
            "optional": true,
            "field": "profile_image",
            "description": ""
          },
          {
            "group": "Model",
            "type": "Boolean",
            "optional": true,
            "field": "is_active",
            "description": ""
          }
        ]
      }
    },
    "filename": "components/user/routes/user.doc.js",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/users/:id",
    "title": "Patch User",
    "version": "0.0.1",
    "name": "Patch",
    "group": "User",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>MongoID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "data",
            "description": "<p><a href=\"#api-User-Model\">User</a> that has been patched</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Indicates if request has been succesfully handled (<code>status === 200</code>)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "description": "<p>Response status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>null</code> on success</p>"
          }
        ]
      }
    },
    "filename": "components/user/routes/user.doc.js",
    "groupTitle": "User",
    "description": "<p>Patch is used to update certain parts of a document, it is thus not threatened as a whole document.</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "400/BadId",
            "description": "<p><code>Response.message</code> : Please provide a valid 'id'</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "204/NoContent",
            "description": "<p><code>Response.message</code> : Please provide values with your PATCH request</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "400/BadParameter",
            "description": "<p><code>Response.message</code> : Please provide a valid parameter to this PATCH request</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "404/NotFound",
            "description": "<p><code>Response.message</code> : Could not find entity with <code>{req.params}</code></p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p><code>Response.message</code> : Token is invalid or not provided</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The JWT-token header: &quot;JWT {{ TOKEN }}&quot;.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Post User",
    "version": "0.0.1",
    "name": "Post",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "data",
            "description": "<p><a href=\"#api-User-Model\">User</a> that has been posted</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Indicates if request has been succesfully handled (<code>status === 200</code>)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "description": "<p>Response status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>null</code> on success</p>"
          }
        ]
      }
    },
    "filename": "components/user/routes/user.doc.js",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The JWT-token header: &quot;JWT {{ TOKEN }}&quot;.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p><code>Response.message</code> : Token is invalid or not provided</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/users/:id",
    "title": "Put User",
    "version": "0.0.1",
    "name": "Put",
    "group": "User",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>MongoID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "data",
            "description": "<p><a href=\"#api-User-Model\">User</a> that has been 'put'</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Indicates if request has been succesfully handled (<code>status === 200</code>)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "description": "<p>Response status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>null</code> on success</p>"
          }
        ]
      }
    },
    "filename": "components/user/routes/user.doc.js",
    "groupTitle": "User",
    "description": "<p>Put is used to <b>replace</b> the selected document completely. This request <b>expects</b> you to give a whole document and is threatened that way. <br /> When the selected documented does not exist, it will create a new one.</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "400/BadId",
            "description": "<p><code>Response.message</code> : Please provide a valid 'id'</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "204/NoContent",
            "description": "<p><code>Response.message</code> : Please provide values with your PUT request</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "400/BadParameter",
            "description": "<p><code>Response.message</code> : Please provide a valid parameter to this PUT request</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p><code>Response.message</code> : Token is invalid or not provided</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The JWT-token header: &quot;JWT {{ TOKEN }}&quot;.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/users/me",
    "title": "Get Me",
    "version": "0.0.1",
    "name": "me",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "data",
            "description": "<p><a href=\"#api-User-Model\">User</a> that is defined by the given JWT-token</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Indicates if request has been succesfully handled (<code>status === 200</code>)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "description": "<p>Response status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>null</code> on success</p>"
          }
        ]
      }
    },
    "filename": "components/user/routes/user.doc.js",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The JWT-token header: &quot;JWT {{ TOKEN }}&quot;.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p><code>Response.message</code> : Token is invalid or not provided</p>"
          }
        ]
      }
    }
  }
] });