# API Documentation for User Service
This document provides a brief overview of the user service API and its routes.

The User Service provides Login/Register services and also basic CRUD (Create, Read, Update, Delete) operations for users.

# POST /users/register
Register a new user.

Request Body
json
```
{
  "password": "<string>",
  "username": "<string>",
}
```
All fields are required.

Response
json
```
{
  "status": "success",
  "message": "User registered successfully",
  "data": "<JWT Token>"
  "username": "<string>"
}
```
# POST /users/login
Login a user.

Request Body
json
```
{
  "username": "<string>",
  "password": "<string>"
}
```
All fields are required.

Response
json
```
{
  "status": "success",
  "message": "User registered successfully",
  "data": "<JWT Token>"
  "username": "<string>"
}
```

# POST /user
Create a new user.

Request Body
json
```
{
  "name": "<string>",
  "username": "<string>",
}
```
All fields are required.

Response
json
```
{
  "status": "success",
  "message": "User created successfully",
  "data": {
    "insertedId": "<ObjectId>"
  }
}
```
## GET /users
Get a list of all users.

Response
json
```
{
  "status": "success",
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": "<string>",
      "hashed_password": "<string>",
      "username": "<string>",
    }
  ]
}
```
# DELETE /users/:id
Delete a user by ID.

Response
json
```
{
  "status": "success",
  "message": "User deleted successfully",
  "data": {
    "deletedCount": 1
  }
}
```
# PUT /users/:id
Update a user by ID.

Request Body
json
```
{
  "username": "<string>",
  "password": "<string>",
}
```
All fields are optional.

Response
json
```
{
  "status": "success",
  "message": "User updated successfully",
  "data": {
    "modifiedCount": 1
  }
}
```
# GET /users/:id
Get a user by ID.

Response
json
```
{
  "status": "success",
  "message": "User retrieved successfully",
  "data": {
    "id": "<string>",
    "hashed_password": "<string>",
    "username": "<string>",
  }
}
```
