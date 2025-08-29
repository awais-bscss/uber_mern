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
