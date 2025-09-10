# Backend API Documentation

## POST /users/register

Description

- Registers a new account and returns an authentication token and the created user object.

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

## POST /captain/register (assumed mount: /captain)

Description

- Registers a new captain (driver) with vehicle details and returns an authentication token and the created captain object.

Note on route mount

- The `captain.routes.js` router defines `POST /register`. This documentation assumes the router is mounted at `/captain` (resulting in `/captain/register`). Adjust the base path if your app mounts it differently (for example `/captains/register`).

Route

- POST /captain/register

Request body (JSON)

- fullname: object (required)
  - firstname: string (required, minimum 3 characters)
  - lastname: string (optional)
- email: string (required, must be a valid email)
- password: string (required, minimum 6 characters)
- vehicle: object (required)
  - color: string (required, minimum 3 characters)
  - model: string (optional)
  - licensePlate: string (required)
  - vehicleType: string (required, one of: "car", "bike", "auto")
  - capacity: integer (required, between 1 and 8)

Validation rules

- `email` must be a valid email address and unique.
- `fullname.firstname` must be at least 3 characters long.
- `password` must be at least 6 characters long.
- `vehicle.color` must be at least 3 characters long.
- `vehicle.licensePlate` is required.
- `vehicle.capacity` must be an integer between 1 and 8.
- `vehicle.vehicleType` must be one of: `car`, `bike`, `auto`.

Responses / Status codes

- 201 Created

  - Description: Captain was created successfully.
  - Body: { message: "Captain registered", token: <jwt>, captain: <captainObject> }

- 400 Bad Request

  - Description: Validation failed or email already exists.
  - Body examples:
    - Validation errors: { errors: [ { msg, param, location, value? } ] }
    - Email exists: { message: "Email already exists" }

- 500 Internal Server Error
  - Description: Server-side error (for example: failed to hash password or database error).

Example request

```
POST /captain/register
Content-Type: application/json

{
  "fullname": { "firstname": "John", "lastname": "Smith" },
  "email": "john.smith@example.com",
  "password": "driver123",
  "vehicle": {
    "color": "Blue",
    "model": "Toyota Prius",
    "licensePlate": "ABC-1234",
    "vehicleType": "car",
    "capacity": 4
  }
}
```

Example successful response (201)

```
{
  "message": "Captain registered",
  "token": "<JWT_TOKEN>",
  "captain": {
    "_id": "64d...",
    "fullName": { "firstName": "John", "lastName": "Smith" },
    "email": "john.smith@example.com",
    "vehicle": { "color": "Blue", "model": "Toyota Prius", "licensePlate": "ABC-1234", "vehicleType": "car", "capacity": 4 },
    "socketID": null,
    "status": "inactive"
  }
}
```

Example validation error (400)

```
{
  "errors": [
    { "msg": "Invalid email", "param": "email", "location": "body" },
    { "msg": "Color must be at least 3 characters long", "param": "vehicle.color", "location": "body" }
  ]
}
```

Usage notes

- No Authorization header is required for registration.
- The route will create the captain and return a JWT token valid for 1 day (signed with the server's `JWT_SECRET`).
- Ensure the server checks email uniqueness (the controller already queries for existing emails).
- If you want this mounted under a different base path (for example `/captains`), update the examples accordingly.

## POST /captain/login (assumed mount: /captain)

Description

- Authenticates a captain (driver) using email and password. On success returns a JWT, sets an HTTP-only cookie `token`, and returns the captain object.

Route

- POST /captain/login

Request body (JSON)

- email: string (required, must be a valid email)
- password: string (required, minimum 6 characters)

Validation rules

- `email` must be a valid email address.
- `password` must be at least 6 characters long.

Responses / Status codes

- 201 Created

  - Description: Login successful (controller currently returns 201 on captain login).
  - Body: { message: "Login successful", token: <jwt>, captain: <captainObject> }

- 400 Bad Request

  - Description: Validation failed for the input data.
  - Body: { errors: [ { msg, param, location, value? } ] }

- 401 Unauthorized

  - Description: Invalid credentials or captain not found.
  - Body: { message: "Captain not found" } or { message: "Invalid credentials" }

- 500 Internal Server Error
  - Description: Server-side error (database, hashing, etc.).

Example request

```
POST /captain/login
Content-Type: application/json

{
  "email": "john.smith@example.com",
  "password": "driver123"
}
```

Example successful response (201)

```
{
  "message": "Login successful",
  "token": "<JWT_TOKEN>",
  "captain": {
    "_id": "64d...",
    "fullName": { "firstName": "John", "lastName": "Smith" },
    "email": "john.smith@example.com",
    "vehicle": { "color": "Blue", "model": "Toyota Prius", "licensePlate": "ABC-1234", "vehicleType": "car", "capacity": 4 },
    "socketID": null,
    "status": "inactive"
  }
}
```

## GET /captain/profile (assumed mount: /captain)

Description

- Returns the authenticated captain's profile information.

Route

- GET /captain/profile

Authentication

- Requires a valid JWT. The project uses an `authCaptain` middleware which accepts tokens in the `Authorization: Bearer <token>` header or an HTTP-only cookie named `token`.
- If the token is missing, invalid, or blacklisted, the middleware will respond with 401.

Responses / Status codes

- 200 OK

  - Description: Profile retrieved successfully.
  - Body: { captain: <captainObject> }

- 401 Unauthorized

  - Description: Missing/invalid token or captain not found.
  - Body: { message: "No token, authorization denied" } or { message: "Token is not valid" } or { message: "Captain not found" }

- 500 Internal Server Error
  - Description: Server-side error.

Example request

```
GET /captain/profile
Authorization: Bearer <JWT_TOKEN>
```

Example successful response (200)

```
{
  "captain": {
    "_id": "64d...",
    "fullName": { "firstName": "John", "lastName": "Smith" },
    "email": "john.smith@example.com",
    "vehicle": { "color": "Blue", "model": "Toyota Prius", "licensePlate": "ABC-1234", "vehicleType": "car", "capacity": 4 },
    "socketID": null,
    "status": "inactive"
  }
}
```

## GET /captain/logout (assumed mount: /captain)

Description

- Logs the captain out by blacklisting the current token and clearing the `token` cookie.

Route

- GET /captain/logout

Authentication

- Requires a valid JWT (same as `/captain/profile`) because the controller reads the token and saves it to a blacklist collection.

Responses / Status codes

- 200 OK

  - Description: Logout successful.
  - Body: { message: "Logout successful" }

- 400 Bad Request

  - Description: No token was provided to logout (controller returns 400 in that case).
  - Body: { message: "No token provided" }

- 401 Unauthorized

  - Description: If middleware runs first and token is missing/invalid, it may return 401.

- 500 Internal Server Error
  - Description: Server-side error while blacklisting token or clearing cookie.

Example request

```
GET /captain/logout
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

- The `authCaptain` middleware checks for blacklisted tokens using the `blacklistToken` collection; ensure your token validation checks the blacklist on every protected route.
- The login endpoint sets an HTTP-only `token` cookie; clients can rely on the cookie or use the returned JWT in the `Authorization` header.
