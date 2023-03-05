# Runing the application

### Local Dependencies

- Node.js
- MongoDB

### Env setup

The `.env` file in the root folder contains the values for:

- `MONGODB_URI`: the connection string for the database;
- `JWT_SECRET`: the secret for generating JWT tokens.

The application comes with a `.env` with values for a local setup.

### Running

```
npm i
npm run start
```

# Product API Documentation

# User entity

| Property  | Type   | Description            |
|-----------|--------|------------------------|
| `_id`     | ObjectId | Unique identifier of the user |
| `name`    | String | Name of the user |
| `email`   | String | Email of the user |
| `password`| String | Password of the user |
| `createdAt` | Date | Date when the user was created |
| `updatedAt` | Date | Date when the user was last updated |

## Endpoints

### `POST /api/users/register`

Registers a new user.

### Request Body

| Field  | Type   | Required | Description                  |
| ------ | ------ | -------- | ---------------------------- |
| name   | String | Yes      | User's name                  |
| email  | String | Yes      | User's email address         |
| password  | String | Yes      | User's password              |
* Example:
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "mysecretpassword"
}
```
### Response

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```json
    {
      "user": {
        "_id": "615a6d43f8c96f6e9a6f5d1a",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "createdAt": "2021-10-03T10:00:35.000Z",
        "updatedAt": "2021-10-03T10:00:35.000Z"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTVhNmQ0M2Y4Yzk2ZjZlOWE2ZjVkMWEiLCJpYXQiOjE2MzQzMDU5ODUsImV4cCI6MTYzNDMxMjM4NX0.pRnHXQ28M7d0tTbTtYiRt0QxEV0x8PzLZDpOZ3zJLW4"
    }
    ```
* **Error Response:**
  * **Code:** 400 <br />
    **Content:** `{ error : "Invalid request body" }`
  
  OR

  * **Code:** 400 <br />
    **Content:** `{ error : "User already exists" }`
  
  OR

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal server error" }`

### `POST /api/users/login`

User login.

### Request Body

| Field  | Type   | Required | Description                  |
| ------ | ------ | -------- | ---------------------------- |
| email  | String | Yes      | User's email address         |
| password  | String | Yes      | User's password              |
* Example:
```json
{
  "email": "johndoe@example.com",
  "password": "mysecretpassword"
}
```

### Response

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    {
      "user": {
        "_id": "615a6d43f8c96f6e9a6f5d1a",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "createdAt": "2021-10-03T10:00:35.000Z",
        "updatedAt": "2021-10-03T10:00:35.000Z"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTVhNmQ0M2Y4Yzk2ZjZlOWE2ZjVkMWEiLCJpYXQiOjE2MzQzMDU5ODUsImV4cCI6MTYzNDMxMjM4NX0.pRnHXQ28M7d0tTbTtYiRt0QxEV0x8PzLZDpOZ3zJLW4"
    }
    ```
* **Error Response:**
  * **Code:** 400 <br />
    **Content:** `{ error : "Invalid request body" }`
  
  OR

  * **Code:** 401 <br />
    **Content:** `{ error : "Invalid credentials" }`
  
  OR

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal server error" }`

# Product entity

| Field        | Type     | Description              |
|--------------|----------|--------------------------|
| `_id`        | ObjectId | Unique identifier        |
| `name`       | String   | Product name             |
| `description`| String   | Product description      |
| `price`      | Number   | Product price            |
| `createdAt`  | Date     | Date of creation         |
| `updatedAt`  | Date     | Date of last update      |


## Endpoints

### `POST /api/products`

Creates a new product.

### Request Headers

* Authorization: Bearer token

### Request body

| Field  | Type   | Required | Description                  |
| ------ | ------ | -------- | ---------------------------- |
| name   | String | Yes      | Product's name                  |
| description  | String | Yes      | Product's description address         |
| price  | Number | Yes      | Product's price |
* Example:
```json
{
  "name": "Product 1",
  "description": "This is a sample product",
  "price": 19.99
}
```

### Response

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```json
    {
      "product": {
        "_id": "609d989a9f26db53f036ab08",
        "name": "Product 1",
        "description": "This is a sample product",
        "price": 19.99,
        "createdAt": "2022-02-20T18:00:00.000Z",
        "updatedAt": "2022-02-20T18:00:00.000Z"
      }
    }
    ```
* **Error Response:**
  * **Code:** 400 <br />
    **Content:** `{ error : "Invalid request body" }`

  OR

  * **Code:** 401 <br />
    **Content:** `{ error: "Invalid token" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal server error" }`

### `GET /api/products`

Returns a list of products.

### Query parameters

- `page` (number, optional): page number of the results. Default is 1.
- `limit` (number, optional): number of products per page. Default is 10.
- `sort` (string, optional): property to sort the results by. Default is `name`.
- `order` (string, optional): sorting order, either `asc` or `desc`. Default is `asc`.
- `search` (string, optional): search term to filter the results by name and description.

### Response

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    {
      "docs": [
        {
          "_id": "5f8a29fa3d1b1520e89832a8",
          "name": "Product A",
          "description": "This is product A",
          "price": 9.99,
          "createdAt": "2022-03-10T10:00:00.000Z",
          "updatedAt": "2022-03-10T10:01:00.000Z"
        },
        {
          "_id": "5f8a2a273d1b1520e89832a9",
          "name": "Product B",
          "description": "This is product B",
          "price": 19.99,
          "createdAt": "2022-03-11T15:30:00.000Z",
          "updatedAt": "2022-03-11T15:32:00.000Z"
        }
        ...
      ],
      "totalDocs": 5,
      "limit": 10,
      "totalPages": 1,
      "page": 1,
      "pagingCounter": 1,
      "hasPrevPage": false,
      "hasNextPage": false,
      "prevPage": null,
      "nextPage": null
    }
    ```
 
* **Error Response:**
  
  * **Code:** 500 <br />
    **Content:** `{ error : "Internal server error" }`

### `GET /api/products/:id`

Get a single product by its ID.

### URL Params

* `id` (ObjectId, required): product unique id

### Response

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "product": {
        "_id": "5f9d30993c627f129807b92a",
        "name": "Product 1",
        "description": "This is the first product.",
        "price": 19.99,
        "createdAt": "2021-10-31T12:30:45.000Z",
        "updatedAt": "2021-10-31T14:25:12.000Z"
      }
    }
    ```
 
- **Error Response:**

  - **Code:** 404 <br />
    **Content:** `{ error : "Product not found" }`

  OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal server error" }`

### `PATCH /api/products/:id`

Update a single product by its ID.

### Request Headers

* Authorization: Bearer token

### URL Params

* `id` (ObjectId, required): product unique id

### Request body

| Field  | Type   | Required | Description                  |
| ------ | ------ | -------- | ---------------------------- |
| name   | String | No      | Product's name                  |
| description  | String | No      | Product's description address         |
| price  | Number | No      | Product's price |

* Example:
```json
{
  "name": "Product 1",
  "description": "This is a sample product",
  "price": 19.99
}
```

### Response

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "product": {
        "_id": "5f9d30993c627f129807b92a",
        "name": "Product 1",
        "description": "This is the first product.",
        "price": 19.99,
        "createdAt": "2021-10-31T12:30:45.000Z",
        "updatedAt": "2021-10-31T14:25:12.000Z"
      }
    }
    ```
 
- **Error Response:**
  - **Code:** 400 <br />
    **Content:** `{ error : "Invalid request body" }`

  OR

  - **Code:** 401 <br />
    **Content:** `{ error : "Invalid token" }`

  OR
  
  - **Code:** 404 <br />
    **Content:** `{ error : "Product not found" }`

  OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal server error" }`

### `DELETE /api/products/:id`

Delete a single product by its ID.

### Request Headers

* Authorization: Bearer token

### URL Params

* `id` (ObjectId, required): product unique id

### Response

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "product": {
        "_id": "5f9d30993c627f129807b92a",
        "name": "Product 1",
        "description": "This is the first product.",
        "price": 19.99,
        "createdAt": "2021-10-31T12:30:45.000Z",
        "updatedAt": "2021-10-31T14:25:12.000Z"
      }
    }
    ```
 
- **Error Response:**
  - **Code:** 401 <br />
    **Content:** `{ error : "Invalid token" }`

  OR

  - **Code:** 404 <br />
    **Content:** `{ error : "Product not found" }`

  OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal server error" }`
