# Backend Standardization with Express

---

## Dependencies

## System

- git

- node v14.17.3

- npm v6.14.13

- postgresql (psql) v12.11

## Library Packages

- express v4.18.1

- sequelize v6.20.1

- sequelize-cli v6.4.1

> For complete dependency list, checkout package.json

## Getting Started

### Quick Installation

Run npx command

```console
$ npx-create-paraexpress-app <app-target-directory>

$ # EXAMPLES:
$ npx-create-paraexpress-app backend-app
$ # or
$ npx-create-paraexpress-app .
```

### Manual Installation

1. Clone IT Paragon express standard repository:

```console
$ git clone https://gitlab.com/paragon-is/solution-delivery-operations/backend-standard-express.js
```

2. Rename and change current directory to cloned repository

3. Install dependencies:

```console
$ npm install
```

### Setup Remote Repository

```console
$ git remote set-url origin <your-repository>
```

### Setup database and start application

1. Configure database connections at config/database.js

2. Create and migrate database:

```console
$ npx sequelize-cli db:create
```

3. Create migration then run migration command:

```console
$ npx sequelize-cli db:migrate
```

4. Create seeders then run seed command (optional):

```console
$ npx sequelize-cli db:seed:all
```

5. Start the server:

```console
$ # development server
$ npm run watch

$ # or for production server
$ npm run start
```

## Folder Structures

### app.js

Entry point for express application

### Root Directory Configuration Files

- #### .env

(_private, should be included in .gitgnore for public repositories_)

File to store environment variables like secret keys

- #### .env-example

File to store example of .env structure without including the value (for public repositories)

- #### .sequelizerc

Sequelize file structure configuration

- #### .eslintrc

Eslint configuration, can be changed according to needs

- #### package.json

Holds metadata relevant to the project and it is used for managing the project's dependencies, scripts, version and a whole lot more.

> Also include folder aliasing with link-module-alias library. For full documentation, checkout [link-module-alias npm registry](https://www.npmjs.com/package/link-module-alias)

### config/

- #### database.js

Database configuration with sequelize

### db/

- #### migrations

Contain files with commands to alter database with Sequelize ORM, like create new table, edit table column, etc

- #### seeders

Contain files with commands to pre-insert data to database like address master data

### secret/

(_private, should be included in .gitgnore for public repositories_)

Contain secret files that too long to be included in .env

### src/

Primary directory to store source files for the application

- #### commands/

Executable commands that can be run with node. Usually used for job scheduler on ./src/scheduler.js

- #### controllers/

Contain modules to process incoming request and return the response to the client

Each controller includes Controller itself, schema for request validation (sanitizing) with Ajv library (ending with _-schema.js), and testing files (ending with _-spec.js).

- #### errors/

Handle how the application will response if errors happen from incoming request.

- #### helpers/

Reusable utilities to help processing tasks on other parts of the application. Usually works as facade from used third party libraries.

- #### middlewares/

Intercept incoming request from endpoints before sent to Controller. Usually used for user authentication.

- #### models/

Explain how data will be processed (read/write) by database using Sequelize ORM.

- #### routers/

Define endpoints which client or other application interact with our application. Each endpoints will forward the request to defined Controllers.

- #### services/

Layer between Controller and Model, define how data will be processed (read/write). This layer use Sequelize queries to make request to model and database or axios to communicate with 3rd party appications.

> For complete sequelize documentation, visit [Official Sequelize Documetation](https://sequelize.org/docs/v6/getting-started/)

- #### scheduler.js

Run commands that will be excecuted every within certain period of time. Commands stored in ./src/commands directory.

## RESTful API

### HTTP Methods

| Method | Description                                                                                                                                                                                                                                                                                                                                                                |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | The HTTP GET method is used to read (or retrieve) a representation of a resource. In case of success (or non-error), GET returns a representation in JSON and an HTTP response status code of 200 (OK). In an error case, it most often returns a 404 (NOT FOUND) or 400 (BAD REQUEST).                                                                                    |
| POST   | The POST method is most often utilized to create new resources. In particular, it is used to create subordinate resources. That is subordinate to some other (e.g. parent) resource. In other words, when creating a new resource, POST to the parent and the service takes care of associating the new resource with the parent, assigning an ID (new resource URI), etc. |
| PATCH  | PATCH is used to modify resources. The PATCH request only needs to contain the changes to the resource, not the complete resource. In other words, the body should contain a set of instructions describing how a resource currently residing on the server should be modified to produce a new version.                                                                   |
| DELETE | DELETE is quite easy to understand. It is used to delete a resource identified by filters or ID.                                                                                                                                                                                                                                                                           |

### HTTP Status Codes

| Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200  | The request succeeded. The result meaning of "success" depends on the HTTP method                                                                                                                                                                                                                                                                                                                                                  |
| 201  | The request succeeded, and a new resource was created as a result. This is typically the response sent after POST requests, or some PUT requests.                                                                                                                                                                                                                                                                                  |
| 400  | The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).                                                                                                                                                                                                                         |
| 401  | The request succeeded, and a new resource was created as a result. This is typically the response sent after POST requests, or some PUT requests.                                                                                                                                                                                                                                                                                  |
| 404  | The server can not find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 Forbidden to hide the existence of a resource from an unauthorized client. This response code is probably the most well known due to its frequent occurrence on the web. |
| 500  | The server has encountered a situation it does not know how to handle.                                                                                                                                                                                                                                                                                                                                                             |

## References

https://github.com/expressjs

https://developer.mozilla.org

https://doc.oroinc.com

https://sequelize.org/docs/v6/getting-started

https://www.npmjs.com
