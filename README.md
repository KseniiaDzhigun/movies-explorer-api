# movies-explorer-api

Backend of the service where you can find films on request and save them in your personal account

## Project domains
- Frontend - https://dzhigun.movies.nomoredomainsclub.ru/
- Backend - https://api.dzhigun.movies.nomoredomainsclub.ru/

## Functionality
### Data Models
- `movie` — saved movies
- `user` — users

### Endpoints

|Method|Endpoint|Description|
|-|-|-|
|POST|`/signup`|Creates user with email, password and name|
|POST|`/signin`|Checks email and password and returns JWT|
|GET|`/signout`|Clears cookies|
|Protected Routes|
|GET|`/users/me`|Returns user information|
|PATCH|`/users/me`|Updates user information|
|GET|`/movies`|Returns all movies saved by current user|
|POST|`/movies`|Creates a film with country, director, duration, year, description, image, trailer, nameRU, nameEN and thumbnail, movieId|
|DELETE|`/movies/:id`|Deletes saved movie by id|

### Middlewares
- Central Error Handling
- Authorization
- Rate limiter for DoS Mitigation
- Requests and errors logger

### Validation
- Joi validators - bodies, parameters of requests are validated before passing information to controllers 
- MongoDB Schema Validation and Mongoose Validator
