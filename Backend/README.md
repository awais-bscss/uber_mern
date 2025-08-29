# Backend API Documentation

## POST /users/register

Description

- Registers a new user account and returns an authentication token and the created user object.

Route

- POST /users/register

Request body (JSON)

- fullname: object (required)
  - firstname: string (required, minimum 3 characters)
  - lastname: string (optional)
- email: string (required, must be a valid email)
- password: string (required, minimum 6 characters)

Notes on field names

- The API expects `fullname.firstname` and `fullname.lastname` in the request body. Internally the user record stores these under `fullName.firstName` / `fullName.lastName`.

Validation rules

- `email` must be a valid email address.
- `fullname.firstname` must be at least 3 characters long.
- `password` must be at least 6 characters long.

Responses / Status codes

- 201 Created

  - Description: User was created successfully.
  - Body: { message: "User registered", token: <jwt>, user: <userObject> }

- 400 Bad Request

  - Description: Validation failed for the input data.
  - Body: { errors: [ { msg, param, location, value? } ] }

- 500 Internal Server Error
  - Description: Server-side error (for example: failed to hash password or database error).
  - Body: { message: "Error hashing password" } or an error forwarded by the server.

Example request

```
POST /users/register
Content-Type: application/json

{
	"fullname": { "firstname": "Jane", "lastname": "Doe" },
	"email": "jane.doe@example.com",
	"password": "s3cret!"
}
```

Example successful response (201)

```
{
	"message": "User registered",
	"token": "<JWT_TOKEN>",
	"user": {
		"_id": "64d...",
		"fullName": { "firstName": "Jane", "lastName": "Doe" },
		"email": "jane.doe@example.com",
		"socketID": null
	}
}
```

Example validation error (400)

```
{
	"errors": [
		{ "msg": "Invalid email", "param": "email", "location": "body" },
		{ "msg": "First name must be at least 3 characters long", "param": "fullname.firstname", "location": "body" }
	]
}
```

Usage notes

- No Authorization header is required for registration.
- The route will create the user and return a JWT token valid for 1 day (signed with the server's `JWT_SECRET`).
- Make sure to send Content-Type: application/json and a JSON body following the shape above.

If you need more endpoints documented or want examples for other responses, tell me which route to add next.

## POST /users/login

Description

- Authenticates an existing user using email and password. On success the endpoint returns a JWT and the user object.

Route

- POST /users/login

Request body (JSON)

- email: string (required, must be a valid email)
- password: string (required, minimum 6 characters)

Validation rules

- `email` must be a valid email address.
- `password` must be at least 6 characters long.

Responses / Status codes

- 200 OK

  - Description: Login successful.
  - Body: { message: "Login successful", token: <jwt>, user: <userObject> }

- 400 Bad Request

  - Description: Validation failed for the input data.
  - Body: { errors: [ { msg, param, location, value? } ] }

- 401 Unauthorized

  - Description: Invalid credentials or user not found.
  - Body: { message: "User not found" } or { message: "Invalid credentials" }

- 500 Internal Server Error
  - Description: Server-side error (database, hashing, etc.).

Example request

```
POST /users/login
Content-Type: application/json

{
  "email": "jane.doe@example.com",
  "password": "s3cret!"
}
```

Example successful response (200)

```
{
  "message": "Login successful",
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "64d...",
    "fullName": { "firstName": "Jane", "lastName": "Doe" },
    "email": "jane.doe@example.com",
    "socketID": null
  }
}
```

Example invalid credentials (401)

```
{ "message": "Invalid credentials" }
```

Usage notes

- No Authorization header is required to call this endpoint.
- The controller looks up the user and compares the provided password; on success it returns a JWT (1 day expiry).
- Make sure to send Content-Type: application/json and a JSON body following the shape above.

If you want more routes documented (for example: profile, logout, or socket updates), tell me which one to add next.

## GET /users/profile

Description

- Returns the authenticated user's profile information.

Route

- GET /users/profile

Authentication

- Requires a valid JWT. The project uses an `authUser` middleware which expects the token in the Authorization header as `Bearer <token>` or in an HTTP-only cookie named `token`.

Responses / Status codes

- 200 OK

  - Description: Profile retrieved successfully.
  - Body: { user: <userObject> }

- 401 Unauthorized

  - Description: Missing or invalid token.
  - Body: { message: "Authentication required" } or middleware-provided error.

- 500 Internal Server Error
  - Description: Server-side error.

Example request

```
GET /users/profile
Authorization: Bearer <JWT_TOKEN>
```

Example successful response (200)

```
{
  "user": {
    "_id": "64d...",
    "fullName": { "firstName": "Jane", "lastName": "Doe" },
    "email": "jane.doe@example.com",
    "socketID": null
  }
}
```

## GET /users/logout

Description

- Logs the user out by blacklisting the current token and clearing the `token` cookie.

Route

- GET /users/logout

Authentication

- Requires a valid JWT (same as `/users/profile`) because the controller reads the token and saves it to a blacklist collection.

Responses / Status codes

- 200 OK

  - Description: Logout successful.
  - Body: { message: "Logout successful" }

- 400 Bad Request

  - Description: No token was provided.
  - Body: { message: "No token provided" }

- 500 Internal Server Error
  - Description: Server-side error while blacklisting token or clearing cookie.

Example request

```
GET /users/logout
Authorization: Bearer <JWT_TOKEN>
```

Example successful response (200)

```
{ "message": "Logout successful" }
```

Example missing token response (400)

```
{ "message": "No token provided" }
```

Usage notes

- Both `/users/profile` and `/users/logout` require authentication. The middleware supports tokens sent via `Authorization: Bearer <token>` or via the `token` cookie.
- The logout route creates a `blacklistToken` document; ensure your token-checking middleware checks that blacklist when validating tokens if you want the blacklist to prevent reuse.
