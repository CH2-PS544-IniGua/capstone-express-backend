# API Documentation for User Service
This document provides a brief overview of the user service API and its routes.

The User Service provides basic CRUD (Create, Read, Update, Delete) operations for users in an Elevarm database.

# POST /user
Create a new user.

Request Body
json
```
{
  "name": "<string>",
  "password": "<string>",
  "username": "<string>",
  "email": "<string>"
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
      "_id": "<ObjectId>",
      "id": "<string>",
      "name": "<string>",
      "password": "<string>",
      "username": "<string>",
      "email": "<string>"
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
  "name": "<string>",
  "username": "<string>",
  "email": "<string>"
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
    "_id": "<ObjectId>",
    "id": "<string>",
    "name": "<string>",
    "password": "<string>",
    "username": "<string>",
    "email": "<string>"
  }
}
```
POST /users/register
Register a new user.

Request Body
json
```
{
  "name": "<string>",
  "password": "<string>",
  "username": "<string>",
  "email": "<string>",
  "account_type": "<string>"
}
```
All fields are required.

Response
json
```
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "insertedId": "<ObjectId>"
  }
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
  "message": "User logged in successfully",
  "data": {
    "_id": "<ObjectId>",
    "name": "<string>",
    "username": "<string>",
    "email": "<string>",
    "account_type": "<string>"
  },
  "token": "<JWT>"
}
```