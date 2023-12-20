
**Catalog Service API Documentation (catalog.md):**


# Catalog Service API Documentation

This document outlines the API endpoints provided by the Catalog Service for browsing and retrieving catalog items.

## Endpoints

### Get All Catalog Items

`GET /catalog`

Retrieves all catalog items, with optional search, pagination, and sorting.

- **Query Parameters:**
  - `search`: Search term to filter items by name, description, etc. (optional)
  - `page`: Page number for pagination (optional)
  - `limit`: Number of items to return per page for pagination (optional)

- **Response:**

  ```json
  {
    "status": "success",
    "message": "Catalog items retrieved successfully",
    "data": [
      {
        "id": "<string>",
        "title": "<string>",
        "type": "<string>",
        "image": "<string_url>",
        "overview": "<string>",
        "color": "<string>",
        "material": "<string>",
        "short_desc": "<string>",
        "price": <number>
      }
      // ...more catalog items
    ]
  }
  
### Get Specific History Item by ID
`GET /catalog/:id`

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
        "title": "<string>",
        "type": "<string>",
        "image": "<string_url>",
        "overview": "<string>",
        "color": "<string>",
        "material": "<string>",
        "short_desc": "<string>",
        "price": <number>
      }
}