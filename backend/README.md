
# User Registration Endpoint

## Endpoint: `/users/register`

### Method: POST

### Description:
 This endpoint is used to register a new user. It requires the user's first name, last name, email, and password.

## HTTP Method
`POST`

## Request Body:
 The request body should be a JSON object containing the following fields:
 - fullName :(object)
   - `firstName` (string, required): The first name of the user. Must be at least 3 characters long.

   - `lastName` (string, optional): The last name of the user.
 - `email` (string, required): The email address of the user. Must be a valid email format.
 - `password` (string, required): The password for the user. Must be at least 5 characters long.

## Example Request:
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#  Responses:
 
 - fullName :(object)
   - `firstName` (string): The first name of the user. Must be at least 3 characters long.

   - `lastName` (string): The last name of the user.
 - `email` (string): The email address of the user. Must be a valid email format.
 - `password` (string): The password for the user. Must be at least 5 characters long.
 - `token` (string): JWT token for the user

## Success (201):
### - **Description**: User registered successfully.
### - **Body**:
```json
{
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "createdAt": "2023-10-01T00:00:00.000Z",
    "updatedAt": "2023-10-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Client Error (400):
### - **Description**: Validation errors or missing required fields.
### - **Body**:
```json
{
  "errors": [
    {
      "msg": "Name must be at least 3 characters long",
      "param": "fullName.firstName",
      "location": "body"
    },
    {
      "msg": "Please enter a valid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 5 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

## Server Error (500):
### - **Description**: Internal server error.
### - **Body**:
```json
{
  "error": "Internal Server Error"
}
```

## Notes:
### - Ensure that the email provided is unique and not already registered.
### - Passwords are hashed before being stored in the database.