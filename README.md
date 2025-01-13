<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description - Implementation Flow
**1. User Submits Query:**
The user submits a query, such as a keyword (e.g., "dollar"), along with optional pagination values (e.g., page number and limit). If pagination values are not provided, default values will be used.

**2. Service Calls Third-Party Webz API:**
The service makes a request to a third-party service (the Webz API) to retrieve posts related to the submitted query. The query and pagination details are passed along with the request to the API.

**3.Service Saves Posts to Database:**
Upon receiving a response from the Webz API, the service processes the retrieved posts and saves them into the local database for future use.

**4.Response Returned to User:**
After saving the posts to the database, the service returns a response to the user, which includes the fetched posts, along with metadata such as total count and any available pagination information for subsequent requests.


## Project setup
** Make sure  docker, node and nest js is installed 

### Create .env file and add necessary values.
```bash
$ cp .env.example .env
```

### run unit tests manually(usually run on CI)
```bash
$ docker-compose up --build
```

### build docker image
```bash
$ docker-compose up --build
```

### run docker image
```bash
$ docker-compose up
```

### make curl request(sample)
```bash
$ curl 'http://localhost:3080/posts?search=dollar&pagination={%22page%22%3A%201%2C%22pageSize%22%3A%2010}'
```

### stop server
```bash
$ docker-compose down
```

<!-- ```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
``` -->




## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
