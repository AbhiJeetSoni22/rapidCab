# Backend API Documentation

## Authentication Endpoints

### Register User
Create a new user account.

**Endpoint:** `/users/register`  
**Method:** `POST`  


#### Request Body
```json
{
  "fullName": {
    "firstName": "string",   // minimum 3 characters
    "lastName": "string"     // optional, minimum 3 characters
  },
  "email": "string",         // valid email format
  "password": "string"       // minimum 5 characters
}
```

#### Success Response
**Status Code:** `201 Created`

```json
{
  "user": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com",
    "socketId": null,
    "_id": "65f1a2b3c4d5e6f7g8h9i0j",
    "createdAt": "2024-03-15T12:00:00.000Z",
    "updatedAt": "2024-03-15T12:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Error Responses
**Status Code:** `400 Bad Request`

```json
{
  "errors": [
    {
      "msg": "Name must be at least 3 characters long",
      "path": "fullName.firstName"
    }
  ]
}
```

#### Common Error Cases
- Missing required fields
- Email already exists
- Invalid email format
- Password too short (< 5 characters)
- First name too short (< 3 characters)

#### Security Features
- Passwords are hashed using bcrypt
- JWT token expires in 1 day
- Emails are stored in lowercase
- Password field is excluded from queries

---

### Login User
Authenticate an existing user.

**Endpoint:** `/users/login`  
**Method:** `POST`  


#### Request Body
```json
{
  "email": "string",        
  "password": "string"      
}
```

#### Validation Rules
- `email`: Required, valid email format
- `password`: Required, minimum 5 characters

#### Success Response
**Status Code:** `200 OK`

```json
{
  "msg": "User login successful",
  "user": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com",
    "socketId": null,
    "_id": "65f1a2b3c4d5e6f7g8h9i0j",
    "createdAt": "2024-03-15T12:00:00.000Z",
    "updatedAt": "2024-03-15T12:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Error Responses
**Status Code:** `400 Bad Request`

```json
{
  "errors": [
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

**Status Code:** `401 Unauthorized`

```json
{
  "msg": "Invalid email or password"
}
```

---

### Change Password
Change the password for an existing user.

**Endpoint:** `/users/changePassword`  
**Method:** `PATCH`  
**Content-Type:** `application/json`

#### Request Body
```json
{
  "email": "string",         
  "oldPassword": "string",   
  "newPassword": "string"    
}
```



#### Success Response
**Status Code:** `200 OK`

```json
{
  "success": true,
  "msg": "Password updated successfully"
}
```

#### Error Responses


**Status Code:** `401 Unauthorized`

```json
{
  "error": "User not found"
}
```

**Status Code:** `401 Unauthorized`

```json
{
  "error": "Incorrect old password"
}
```

## Notes:
- Ensure that the email provided is unique and not already registered.
- Passwords are hashed before being stored in the database.
- JWT token is generated with 1 day expiration.
- Emails are stored in lowercase.