<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
 
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## PostgreSQL Setup

Before running this project, you'll need to have PostgreSQL installed and running on your local machine or a remote server. If you haven't already set up PostgreSQL, you can download and install it from the official website: [PostgreSQL Downloads](https://www.postgresql.org/download/).

Once PostgreSQL is installed, you'll need to create a new database and update the database connection configuration in the project accordingly. Here are the steps:

1. Start PostgreSQL service.
2. Create a new database.
3. Update the database connection configuration in the project to point to the newly created database.

After setting up PostgreSQL, you can proceed to run the project.


## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
