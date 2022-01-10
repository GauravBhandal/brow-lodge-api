# SineCloud Device Linking Service

The purpose of this service is to authenicate, authorise and link a device to a Site.

- [Getting Started](#markdown-header-get-started)

- [Open API](#markdown-header-open-api)

- [Testing and Linting](#markdown-header-testing-and-linting)

---

## Get started

To get the Care Diary Core API up and running follow these steps

1.  Clone the repo

1.  Install the node modules

         yarn

1.  Create a `.env` file and copy / update the values from `.env.example`

1.  Run the server using

        yarn start

---

## Open API

To get open-api working in a docker container, you can run one of these client:

        docker run -p 8081:80 -e SPEC_URL=https://sinedocs.s3.ap-southeast-2.amazonaws.com/open-api/device-linking-api/poc-openapi_e904f6c/openapi.yaml redocly/redoc

        docker run -p 8082:8080 -e URL=https://sinedocs.s3.ap-southeast-2.amazonaws.com/open-api/device-linking-api/poc-openapi_e904f6c/openapi.yaml -e VALIDATOR_URL=none swaggerapi/swagger-ui

---

## Testing and Linting

We usually stick to the `assert` style of unit testing coupled with function/class `stub` and/or `spy`. The frameworks are [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com) and [Sinon](https://sinonjs.org) or [Jest](https://jestjs.io)

The following commands can be used to run tests for the workflows API.

- ESLint

        npm run lint

- Unit tests

        npm run test

---

