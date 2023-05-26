# movies-explorer-api

Backend API for the Movies Explorer application. It allows users to search for movies, save their favorite movies, and manage user profile.

## Table of Contents

- [Project description](#project-description)
- [Project domains](#project-domains)
- [Functionality](#functionality)
  - [Data Models](#data-models)
  - [Endpoints](#endpoints)
  - [Middlewares](#middlewares)
  - [Validation](#validation)
- [Installation](#installation)

## Project description 

The Movies Explorer API is built using Node.js and Express.js. It provides various endpoints to interact with the movie database and user authentication system. The API supports user registration, login, saving movies to favorites and managing user profile information.

The backend utilizes MongoDB for data storage and Mongoose as the ODM (Object Data Modeling) library. 
It also includes user authentication and authorization using JSON Web Tokens (JWT).

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
|POST|`/signup`|Create a new user with email, password and name|
|POST|`/signin`|Log in an existing user, check email and password and return JWT|
|GET|`/signout`|Clear cookies|
|Protected Routes|
|GET|`/users/me`|Return user information|
|PATCH|`/users/me`|Update user information|
|GET|`/movies`|Get a list of movies saved by current user|
|POST|`/movies`|Save a movie to the user's favorites|
|DELETE|`/movies/:id`|Remove a movie from the user's favorites|

### Middlewares
- Central Error Handling
- Authorization
- Rate limiter for DoS Mitigation
- Requests and errors logger

### Validation
- Joi validators - bodies, parameters of requests are validated before passing information to controllers 
- MongoDB Schema Validation and Mongoose Validator

## Installation

To install and set up the project locally, follow these steps:

1. Clone the repository:
git clone https://github.com/KseniiaDzhigun/movies-explorer-api.git

2. Navigate to the project directory:
cd movies-explorer-api

3. Install the dependencies:
npm install

4. Create a `.env` file in the root directory and provide the required environment variables. 

5. Start the development server:
npm run dev

The server should now be running locally on http://localhost:3000.
