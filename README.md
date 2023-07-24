
# AI Prompts

AI Prompts is an a powerful RESTful API designed for developers who want to leverage the capabilities of the [OpenAI API](https://platform.openai.com/docs/api-reference/introduction). It allows you to create queries and save the responses.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`: The port number on which the server will run. For example: `3201`.

`DB_URI`: The connection URL for your database.

`JWT_SECRET`: The secret key used for signing and verifying JSON Web Tokens.

`OPENAI_KEY`: Your API key for the OpenAI API.



## How to use

You can make requests to the API using any method you prefer (fetch API, Axios, jQuery AJAX, etc.).

```js
const response = await axios.get('http://localhost:3201/api/prompts', {
    headers: {
        'Authorization': 'Bearer your_jwt_token_here'
    }
});
```

OR

```js
fetch('http://localhost:3201/api/prompts', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer your_jwt_token_here'
  }
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => console.error('Error:', error));
```


## API Reference

### Authenticate user and create a new session

```http
POST /api/sessions
```

Authenticate a user and create a new session.

| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `body`    | `object` | **Required**. JSON object containing user data. |

The `body` parameter should be a JSON object that contains the following fields:

- `email`: User's email for authentication **(string, required)**.
- `password`: User's password for authentication **(string, required)**.


## Prompts

### Get all prompts 

```http
GET /api/prompts
```

Retrieve all prompts from the database (Requires user authentication with user role).


### Get prompt by ID

```http
GET /api/prompts/${id}
```

Retrieve a specific prompt by its ID (Requires user authentication with user role).


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of the prompt to fetch. |

### Get all unique tags

```http
GET /api/prompts/tags
```

Retrieve a list of all unique tags used in prompts (Requires user authentication with user role).



### Get prompts by user ID

```http
GET /api/prompts/user/${id}
```

Retrieve all prompts associated with a specific user by their ID (Requires user authentication with user role).

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of the user.      |

### Add new prompt

```http
POST /api/prompts
```

Create a new prompt in the database (Requires user authentication with user role).


| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `body`    | `object` | **Required**. JSON object containing prompt data. |

The `body` parameter should be a JSON object that contains the following fields:

- `name`: The title of the prompt **(string, required)**.
- `type`: The type of the prompt **(string, required)**.
- `tags`: An array of tags associated with the prompt **(array of strings)**.
- `user_id`: The ID of the user who created the prompt **(string, required)**.
- `body`: JSON object containing the prompt data based on type **(object, required)**

Example JSON object:

```json
{
  "name": "Fix",
  "type": "edit",
  "tags": [
    "spelling",
    "grammar"
  ],
  "user_id": "123123123123123123123123",
  "body": {
    "model": "text-davinci-edit-001",
    "input": "What day of the wek is it?",
    "instruction": "Fix the spelling mistakes",
    "temperature": 1
  },
  "response": ""
}
```

Note: The `body` field within the prompt data is required and will vary depending on the type of prompt.

### Update prompt by ID

```http
PATCH /api/prompts/${id}
```

Update information for an existing prompt by its ID (Requires user authentication with user role).


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of the prompt to update. |
| `body`    | `object` | **Required**. Updated prompt data. |

Example JSON object:

```json
{
  "name": "Say Hello World!",
  "response": "Hello World!"
}
```

### Delete prompt by ID

```http
DELETE /api/prompts/${id}
```

Delete an existing prompt by its ID (Requires user authentication with user role).


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of the prompt to delete. |

## OpenAI

### Create an image

```http
POST /api/openai/image
```

Create an image using the OpenAI API (Requires user authentication with user role).

| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `body`    | `object` | **Required**. JSON object containing image data. |

The `body` parameter should be a JSON object that contains the following fields:

- `prompt`: A text description of the desired image(s) **(string, required)**.
- `n`: The number of images to generate. Must be between 1 and 5 **(number, required)**.
- `size`: The size of the generated images. Must be one of `256x256`, `512x512`, or `1024x1024` **(string, required)**.

Example JSON object:

```json
{
  "prompt": "A cute baby sea otter",
  "n": 2,
  "size": "1024x1024"
}
```

### Create a text completion

```http
POST /api/openai/completion
```

Create a completion using the OpenAI API (Requires user authentication with user role).

| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `body`    | `object` | **Required**. JSON object containing text completion data. |

The `body` parameter should be a JSON object that contains the following fields:

- `model`: ID of the model to use for completion **(string, required)**.
- `prompt`: The prompt to generate completions **(string, required)**.
- `max_tokens`: The maximum number of tokens to generate in the completion **(number, required)**.
- `temperature`: The temperature for random sampling **(number, required)**.

Example JSON object:

```json
{
  "model": "text-davinci-003",
  "prompt": "Say this is a test",
  "max_tokens": 7,
  "temperature": 0
}
```

### Create edit

```http
POST /api/openai/edit
```

Given a prompt and an instruction, the model will return an edited version of the prompt using the OpenAI API (Requires user authentication with user role).

| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `body`    | `object` | **Required**. JSON object containing edited text data. |

The `body` parameter should be a JSON object that contains the following fields:

- `model`: The ID of the model to use for edit, you can use the `text-davinci-edit-001` or `code-davinci-edit-001` **(string, required)**.
- `input`: The input text to use as a starting point for the edit **(string, required)**.
- `instruction`: he instruction that tells the model how to edit the prompt. **(string, required)**.

Example JSON object:

```json
{
  "model": "text-davinci-edit-001",
  "input": "What day of the wek is it?",
  "instruction": "Fix the spelling mistakes"
}
```

Note: The specific fields within the JSON objects may vary based on the requirements of the OpenAI API and the data needed for each operation. Make sure to refer to the [OpenAI API documentation](https://platform.openai.com/docs/api-reference/introduction) for the correct parameters and data formats.

## Users

### Get all users

```http
GET /api/users
```

Retrieve all registered users from the database (Requires user authentication with administrator role).

### Get user by ID

```http
GET /api/users/${id}
```

Retrieve a specific user by their ID (Requires user authentication with administrator role).

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of the user to fetch. |

### Add new user

```http
POST /api/users
```

Create a new user in the database (No authentication required).

| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `body`    | `object` | **Required**. JSON object containing user data. |

The `body` parameter should be a JSON object that contains the following fields:

- `email`: The email address of the user **(string, required)**.
- `username`: The username of the user **(string, required)**.
- `first_name`: The first name of the user **(string, required)**.
- `last_name`: The last name of the user **(string, required)**.
- `password`: The password for the user **(string, required)**.
- `active`: A boolean value indicating whether the user is active or not **(boolean, required)**.
- `role`: The role of the user (e.g., "user" or "admin") **(string, required)**.


Example JSON object:

```json
{
  "email": "example@example.com",
  "username": "john_1",
  "first_name": "John",
  "last_name": "Doe"
  "password": "securepassword",
  "active": false,
  "role": "user"
}
```

### Update user by ID

```http
PATCH /api/users/${id}
```

Update information for an existing user by their ID (Requires user authentication with administrator role).

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of the user to update. |
| `body`    | `object` | **Required**. Updated user data. |

Example JSON object:

```json
{
  "first_name": "Jane",
  "active": true
}
```

### Delete user by ID

```http
DELETE /api/users/${id}
```

Delete an existing user by their ID (Requires user authentication with administrator role).

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of the user to delete. |
