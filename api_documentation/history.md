# History Service API Documentation

This document provides an overview of the API endpoints available in the History Service, which allows retrieval of user history records.

## Endpoints

### Get User History

`GET /history/:username`

Retrieves the history for a specific user.

- **URL Parameters:**
  - `username`: The username of the user whose history is to be retrieved.

- **Response:**

  ```json
  {
    "status": "success",
    "message": "History retrieved successfully",
    "data": [
      {
        "id": "<string>",
        "color_bottom": "<string>",
        "datetime": "<string datetime>",
        "filename": "<string_url>",
        "color_skin": "<string>",
        "percentage_skin_clothes": <number>,
        "percentage_clothes_pants": <number>,
        "predict_image": "<string>",
        "color_top": "<string>"
      }
      // ...more history items
    ]
  }

### Get Specific History Item by ID
`GET /history/:username/:historyId`

Retrieves a specific history item by its ID for a given user.

- **Query Parameters:**
    - username: The username of the user.
    - historyId: The ID of the history item to retrieve.

- **Response:**

```json
{
  "status": "success",
  "message": "History item retrieved successfully",
  "data": 
      {
        "id": "<string>",
        "color_bottom": "<string>",
        "datetime": "<string datetime>",
        "filename": "<string_url>",
        "color_skin": "<string>",
        "percentage_skin_clothes": <number>,
        "percentage_clothes_pants": <number>,
        "predict_image": "<string>",
        "color_top": "<string>"
      }
}

