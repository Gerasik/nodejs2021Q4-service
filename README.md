# Final Task NodeJS2021Q4 service

## Downloading

```bash
git clone -b "task10(nest)" https://github.com/Gerasik/nodejs2021Q4-service
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ docker-compose up --build
```

## Test

```bash
$ npm run test:auth
```

## Authorization

This application uses Bearer JWT token authentication for authentication to all routes besides `/`, `api` and `/files` (GET method).

To get the JWT token you must send the login and password in http request to `/login`.

# Performance comparsion

## Express

|                    |        |
| ------------------ | ------ |
| http.codes.200:    | 249    |
| http.codes.201:    | 41     |
| http.request_rate: | 36/sec |
| http.requests:     | 220    |
| http.response_time:||
| min: | 5|
| max: | 1556|
| median: | 40|
| p95: | 1274.3|
| p99: | 1495.5|
| http.responses: | 290|
| vusers.completed: | 112|
| vusers.created: | 42|
| vusers.created_by_name.test /boards: | 42|
| vusers.session_length:||
| min: | 70|
| max: | 6235.7|
| median: | 5168|
| p95: | 6187.2|
| p99: | 6187.2|

## Fastify

|                    |        |
| ------------------ | ------ |
| http.codes.200:    | 852    |
| http.codes.201:    | 213    |
| http.request_rate: | 90/sec |
| http.requests:     | 1065   |
| http.response_time:||
| min: | 4|
| max: | 1103|
| median: | 106.7|
| p95: | 907|
| p99: | 1085.9|
| http.responses: | 1065|
| vusers.completed: | 213|
| vusers.created: | 213|
| vusers.created_by_name.test /boards: | 213|
| vusers.session_length:||
| min: | 61.8|
| max: | 3230|
| median: | 713.5|
| p95: | 3134.5|
| p99: | 3197.8|
