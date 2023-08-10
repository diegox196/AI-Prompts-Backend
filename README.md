
# AI Prompts

AI Prompts is an a powerful RESTful API designed for developers who want to leverage the capabilities of the [OpenAI API](https://platform.openai.com/docs/api-reference/introduction). It allows you to create queries and save the responses.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- `PORT`: The port number on which the server will run. For example: `3201`.

- `DB_URI`: The connection URL for your database.

- `JWT_SECRET`: The secret key used for signing and verifying JSON Web Tokens.

- `OPENAI_KEY`: Your API key for the OpenAI API.

- `MAILJET_API_PUBLIC_KEY`: Your Mailjet API public key.

- `MAILJET_API_SECRET_KEY`: Your Mailjet API secret key.

- `MAILJET_EMAIL_FROM_ADDRESS`: Your authorized mailjet email address.

- `MAILJET_EMAIL_FROM_NAME`: The name associated with the email address used in Mailjet.

- `TWILIO_ACCOUNT_SID`: Your Twilio account SID.

- `TWILIO_PHONE_NUMBER`: Your Twilio phone number.

- `TWILIO_AUTH_TOKEN`: Your Twilio authentication token.



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

## API endpoints

**Authentication:**
- `POST` [/api/sessions](#authenticate-user-and-create-a-new-session)

**Prompts:**
- `GET` [/api/prompts](#get-all-prompts)
- `GET` [/api/prompts/${id}](#get-prompt-by-id)
- `GET` [/api/prompts/user/${id}](#get-prompts-by-user-id)
- `GET` [/api/prompts/user/${id}/tags](#get-prompt-tags-by-user-id)
- `POST` [/api/prompts](#add-new-prompt)
- `PATCH` [/api/prompts/${id}](#update-prompt-by-id)
- `DELETE` [/api/prompts/${id}](#delete-prompt-by-id)

**OpenAI:**
- `POST` [/api/openai/image](#create-an-image)
- `POST` [/api/openai/completion](#create-a-completion)
- `POST` [/api/openai/edit](#create-edit)

**Users:**
- `GET` [/api/users](#get-all-users)
- `GET` [/api/users/${id}](#get-user-by-id)
- `POST` [/api/users](#add-new-user)
- `PATCH` [/api/users/${id}](#update-user-by-id)
- `PATCH` [/api/users/${id}/update-password](#update-user-password)
- `DELETE` [/api/users/${id}](#delete-user-by-id)

**Two-Factor Authentication (2FA):**
- `POST` [/api/2fa/send](#send-code)
- `POST` [/api/2fa/verify](#verify-code)

**Account:**
- `POST` [/api/accounts/register](#register-new-user)
- `PATCH` [/api/accounts/${token}/verify-email](#verify-email)
- `POST` [/api/accounts/forgot-password](#forgot-password)
- `PATCH` [/api/accounts/${token}/reset-password](#verify-reset-password)


## API Reference

### Authenticate user and create a new session

```http
POST /api/sessions
```

Authenticate a user and create a new session.

| Parameter | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `body`    | `object` | **Required**. JSON object containing user data. |

The `body` parameter should be a JSON object that contains the following fields:

- `email`: User's email for authentication **(string, required)**.
- `password`: User's password for authentication **(string, required)**.

**Example JSON object:**

```json
{
  "email": "user@domain.com",
  "password": "my_secret_password",
}
```

**Example response:**

```json
{
  "user": {
    "active": true,
    "user_id": "1234567890abcdef",
    "name": "John Doe",
    "role": "user",
    "two_factor_enabled": true
  },
  "tokenSession": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAxMjM0NTY3ODkiLCJyb2xlIjoidXNlciIsImlhdCI6MTYzMzA1NjI5MywiZXhwIjoxNjMzMTQyNjkzfQ.5G2TFPQMXusdoRwS9N2v3FC2vyzIF-e6w_FCEh6E3bs"
}
```

---

## Prompts
The Prompts section of the API deals with managing prompts, which are user-defined instructions or queries used to interact with the OpenAI API. It provides various endpoints to perform CRUD (Create, Read, Update, Delete) operations on prompts.

### Get all prompts 

```http
GET /api/prompts
```

Retrieve all prompts from the database (Requires user authentication with user role).

**Example response:**

```json
[
  {
    "_id": "61346492f7348c1df02a1001",
    "name": "Fix",
    "type": "edit",
    "tags": ["spelling", "grammar"],
    "user_id": "52346492f7348c1df02a1882",
    "body": {
      "model": "text-davinci-edit-001",
      "input": "What day of the week is it?",
      "instruction": "Fix the spelling mistakes",
      "temperature": 1
    },
    "response": "{\"object\":\"edit\",\"created\":1689807422,\"choices\":[{\"text\":\"What day of the week is it?\\n\",\"index\":0}],\"usage\":{\"prompt_tokens\":25,\"completion_tokens\":28,\"total_tokens\":53}}"
  },
  {
    "_id": "61346492f7348c1df02a1002",
    "name": "Astronaut",
    "type": "image",
    "tags": ["art", "3d", "image"],
    "user_id": "52346492f7348c1df02a1862",
    "body": {
        "prompt": "A 3D render of an astronaut walking in a blue desert",
        "n": 1,
        "size": "256x256"
    },
    "response": "{\"data\":[{\"url\":\"https://oaidalleapiprodscus.blob.core.windows.net/private/org-js4DAHm9u6nYFpbj3HyK5db8/user-nilNLWt66rCAwJ38kRXTGF3w/img-QiA90hJn6tvTtNH9NuYT7BLV.png?st=2023-07-16T22%3A46%3A29Z&se=2023-07-17T00%3A46%3A29Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-07-16T16%3A54%3A39Z&ske=2023-07-17T16%3A54%3A39Z&sks=b&skv=2021-08-06&sig=LeTvfAxDi7xAytaOhENaEuwGuCLVwtItm/oe9oSKfRw%3D\"}]}",
    "__v": 3
  },
  {
    "_id": "61346492f7348c1df02a1003",
    "name": "App like uber",
    "type": "completion",
    "tags": ["app", "ios", "android"],
    "user_id": "52346492f7348c1df02a1862",
    "body": {
        "model": "text-davinci-003",
        "prompt": "I need to know what requirements you think an uber-style application for pets should meet.",
        "max_tokens": 256,
        "temperature": 1
    },
    "response": "",
    "__v": 0
  },
  // More prompts...
]
```

---

### Get prompt by ID

```http
GET /api/prompts/${id}
```

Retrieve a specific prompt by its ID (Requires user authentication with user role).


| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `id`      | `string` | **Required**. ID of the prompt to fetch. |

**Example response:**

```json
{
  "_id": "61346492f7348c1df02a1001",
  "name": "Fix",
  "type": "edit",
  "tags": ["spelling", "grammar"],
  "user_id": "52346492f7348c1df02a1882",
  "body": {
    "model": "text-davinci-edit-001",
    "input": "What day of the week is it?",
    "instruction": "Fix the spelling mistakes",
    "temperature": 1
  },
  "response": "{\"object\":\"edit\",\"created\":1689807422,\"choices\":[{\"text\":\"What day of the week is it?\\n\",\"index\":0}],\"usage\":{\"prompt_tokens\":25,\"completion_tokens\":28,\"total_tokens\":53}}"
}
```

---

### Get prompts by user ID

```http
GET /api/prompts/user/${id}
```

Retrieve all prompts associated with a specific user by their ID (Requires user authentication with user role).

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `id`      | `string` | **Required**. ID of the user. |

**Example response:**

```json
[
  {
    "_id": "61346492f7348c1df02a1002",
    "name": "Astronaut",
    "type": "image",
    "tags": ["art", "3d", "image"],
    "user_id": "52346492f7348c1df02a1862",
    "body": {
        "prompt": "A 3D render of an astronaut walking in a blue desert",
        "n": 1,
        "size": "256x256"
    },
    "response": "{\"data\":[{\"url\":\"https://oaidalleapiprodscus.blob.core.windows.net/private/org-js4DAHm9u6nYFpbj3HyK5db8/user-nilNLWt66rCAwJ38kRXTGF3w/img-QiA90hJn6tvTtNH9NuYT7BLV.png?st=2023-07-16T22%3A46%3A29Z&se=2023-07-17T00%3A46%3A29Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-07-16T16%3A54%3A39Z&ske=2023-07-17T16%3A54%3A39Z&sks=b&skv=2021-08-06&sig=LeTvfAxDi7xAytaOhENaEuwGuCLVwtItm/oe9oSKfRw%3D\"}]}",
    "__v": 3
  },
  {
    "_id": "61346492f7348c1df02a1003",
    "name": "App like uber",
    "type": "completion",
    "tags": ["app", "ios", "android"],
    "user_id": "52346492f7348c1df02a1862",
    "body": {
        "model": "text-davinci-003",
        "prompt": "I need to know what requirements you think an uber-style application for pets should meet.",
        "max_tokens": 256,
        "temperature": 1
    },
    "response": "",
    "__v": 0
  },
  // More prompts...
]
```

---

### Get Prompt Tags by User ID

```http
GET /api/prompts/user/${id}/tags
```

Retrieve a list of unique tags used in prompts (Requires user authentication with user role).

**Example response:**

``` json
["spelling", "grammar", "language", "translation"]
```

---

### Add new prompt

```http
POST /api/prompts
```

Create a new prompt in the database (Requires user authentication with user role).


| Parameter | Type     | Description                                       |
| :-------- | :------- | :------------------------------------------------ |
| `body`    | `object` | **Required**. JSON object containing prompt data. |

The `body` parameter should be a JSON object that contains the following fields:

- `name`: The title of the prompt **(string, required)**.
- `type`: The type of the prompt **(string, required)**.
- `tags`: An array of tags associated with the prompt **(array of strings)**.
- `user_id`: The ID of the user who created the prompt **(string, required)**.
- `body`: JSON object containing the prompt data based on type **(object, required)**

**Example JSON object:**

```json
{
  "name": "Fix",
  "type": "edit",
  "tags": ["spelling", "grammar"],
  "user_id": "52346492f7348c1df02a1882",
  "body": {
    "model": "text-davinci-edit-001",
    "input": "What day of the wek is it?",
    "instruction": "Fix the spelling mistakes",
    "temperature": 1  
  }
}
```

Note: The `body` field within the prompt data is required and will vary depending on the type of prompt.

> #### Edit Type
> To learn more about the data to fill in, please refer to the [OpenAI API Reference for Edits](https://platform.openai.com/docs/api-reference/edits/create)

```json
{
  "model": "text-davinci-edit-001",
  "input": "What day of the wek is it?",
  "instruction": "Fix the spelling mistakes"
}
```

> #### Image Type
> To learn more about the data to fill in, please refer to the [OpenAI API Reference for Images](https://platform.openai.com/docs/api-reference/images/create)

```json
{
  "prompt": "A cute baby sea otter",
  "n": 2,
  "size": "1024x1024"
}
```

> #### Completions Type
> To learn more about the data to fill in, please refer to the [OpenAI API Reference for Completions](https://platform.openai.com/docs/api-reference/completions)

```json
{
  "model": "text-davinci-003",
  "prompt": "Say this is a test",
  "max_tokens": 7,
  "temperature": 0
}
```

**Example response:**

``` json
{
  "_id": "61346492f7348c1df02a1001",
  "name": "Fix",
  "type": "edit",
  "tags": ["spelling", "grammar"],
  "user_id": "52346492f7348c1df02a1882",
  "body": {
    "model": "text-davinci-edit-001",
    "input": "What day of the week is it?",
    "instruction": "Fix the spelling mistakes",
    "temperature": 1
  },
  "response": ""
}
```

---

### Update prompt by ID

```http
PATCH /api/prompts/${id}
```

Update information for an existing prompt by its ID (Requires user authentication with user role).


| Parameter | Type     | Description                               |
| :-------- | :------- | :---------------------------------------- |
| `id`      | `string` | **Required**. ID of the prompt to update. |
| `body`    | `object` | **Required**. Updated prompt data.        |

**Example JSON object:**

```json
{
  "name": "Say Hello World!",
  "response": "Hello World!"
}
```

**Example response:**

``` json
{
  "_id": "61346492f7348c1df02a1001",
  "name": "Say Hello World!",
  "type": "edit",
  "tags": ["spelling", "grammar"],
  "user_id": "52346492f7348c1df02a1882",
  "body": {
    "model": "text-davinci-edit-001",
    "input": "What day of the week is it?",
    "instruction": "Fix the spelling mistakes",
    "temperature": 1
  },
  "response": "Hello World!"
}
```

---

### Delete prompt by ID

```http
DELETE /api/prompts/${id}
```

Delete an existing prompt by its ID (Requires user authentication with user role).


| Parameter | Type     | Description                               |
| :-------- | :------- | :---------------------------------------- |
| `id`      | `string` | **Required**. ID of the prompt to delete. |

**Example response:**

``` json
{
  "message": "Prompt deleted successfully"
}
```

---

## OpenAI
The OpenAI section of the API is dedicated to interacting with the OpenAI API and utilizing its powerful capabilities for tasks such as image creation, completions, and edits.


> Note: The specific fields within the JSON objects may vary based on the requirements of the OpenAI API and the data needed for each operation. Make sure to refer to the [OpenAI API documentation](https://platform.openai.com/docs/api-reference/introduction) for the correct parameters and data formats.

### Create an image

```http
POST /api/openai/image
```

Create an image using the OpenAI API (Requires user authentication with user role).

| Parameter | Type     | Description                                      |
| :-------- | :------- | :----------------------------------------------- |
| `body`    | `object` | **Required**. JSON object containing image data. |

The `body` parameter should be a JSON object that contains the following fields:

- `prompt`: A text description of the desired image(s) **(string, required)**.
- `n`: The number of images to generate. Must be between 1 and 5 **(number, required)**.
- `size`: The size of the generated images. Must be one of `256x256`, `512x512`, or `1024x1024` **(string, required)**.

**Example JSON object:**

```json
{
  "prompt": "A cute baby sea otter",
  "n": 2,
  "size": "1024x1024"
}
```

**Example response:**

``` json
{
  "created": 1589478378,
  "data": [
    {
      "url": "https://..."
    },
    {
      "url": "https://..."
    }
  ]
}

```

---

### Create a completion

```http
POST /api/openai/completion
```

Create a completion using the OpenAI API (Requires user authentication with user role).

| Parameter | Type     | Description                                                |
| :-------- | :------- | :--------------------------------------------------------- |
| `body`    | `object` | **Required**. JSON object containing text completion data. |

The `body` parameter should be a JSON object that contains the following fields:

- `model`: ID of the model to use for completion **(string, required)**.
- `prompt`: The prompt to generate completions **(string, required)**.
- `max_tokens`: The maximum number of tokens to generate in the completion **(number, required)**.
- `temperature`: The temperature for random sampling **(number, required)**.

**Example JSON object:**

```json
{
  "model": "text-davinci-003",
  "prompt": "Say this is a test",
  "max_tokens": 7,
  "temperature": 0
}
```

**Example response:**

``` json
{
  "id": "cmpl-uqkvlQyYK7bGYrRHQ0eXlWi7",
  "object": "text_completion",
  "created": 1589478378,
  "model": "text-davinci-003",
  "choices": [
    {
      "text": "\n\nThis is indeed a test",
      "index": 0,
      "logprobs": null,
      "finish_reason": "length"
    }
  ],
  "usage": {
    "prompt_tokens": 5,
    "completion_tokens": 7,
    "total_tokens": 12
  }
}
```

---

### Create edit

```http
POST /api/openai/edit
```

Given a prompt and an instruction, the model will return an edited version of the prompt using the OpenAI API (Requires user authentication with user role).

| Parameter | Type     | Description                                            |
| :-------- | :------- | :----------------------------------------------------- |
| `body`    | `object` | **Required**. JSON object containing edited text data. |

The `body` parameter should be a JSON object that contains the following fields:

- `model`: The ID of the model to use for edit, you can use the `text-davinci-edit-001` or `code-davinci-edit-001` **(string, required)**.
- `input`: The input text to use as a starting point for the edit **(string, required)**.
- `instruction`: he instruction that tells the model how to edit the prompt. **(string, required)**.

**Example JSON object:**

```json
{
  "model": "text-davinci-edit-001",
  "input": "What day of the wek is it?",
  "instruction": "Fix the spelling mistakes"
}
```

**Example response:**

``` json
{
  "object": "edit",
  "created": 1589478378,
  "choices": [
    {
      "text": "What day of the week is it?",
      "index": 0,
    }
  ],
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 32,
    "total_tokens": 57
  }
}
```

---

## Users
The Users section of the API provides a CRUD (Create, Read, Update, Delete) interface for managing user-related data.

### Get all users

```http
GET /api/users
```

Retrieve all registered users from the database (Requires user authentication with administrator role).

**Example response:**

``` json
[
  {
    "_id": "612e7f2a6c8b926730e7b6b9",
    "email": "user1@example.com",
    "username": "user1",
    "first_name": "John",
    "last_name": "Doe",
    "phone_number": "+1234567890",
    "two_factor_enabled": true,
    "active": true,
    "role": "user"
  },
  {
    "_id": "612e7f2a6c8b926730e7b6ba",
    "email": "user2@example.com",
    "username": "user2",
    "first_name": "Jane",
    "last_name": "Smith",
    "phone_number": "+9876543210",
    "two_factor_enabled": false,
    "active": false,
    "role": "admin"
  },
  // More users...
]
```

---

### Get user by ID

```http
GET /api/users/${id}
```

Retrieve a specific user by their ID (Requires user authentication with administrator role or user role but the ID in the token must be the same as the ${id}).

| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `id`      | `string` | **Required**. ID of the user to fetch. |

**Example response:**

``` json
{
  "_id": "612e7f2a6c8b926730e7b6b9",
  "email": "user1@example.com",
  "username": "user1",
  "first_name": "John",
  "last_name": "Doe",
  "phone_number": "+1234567890",
  "two_factor_enabled": true,
  "active": true,
  "role": "user"
}
```

---

### Add new user

```http
POST /api/users
```

Create a new user in the database (Requires user authentication with administrator role).

| Parameter | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `body`    | `object` | **Required**. JSON object containing user data. |

The `body` parameter should be a JSON object that contains the following fields:

- `email`: The email address of the user **(string, required)**.
- `username`: The username of the user **(string, required)**.
- `first_name`: The first name of the user **(string, required)**.
- `last_name`: The last name of the user **(string, required)**.
- `password`: The password for the user **(string, required)**.
- `phone_number`: The phone number of the user **(string, required)**.
- `two_factor_enabled`: A boolean value indicating whether the user has active the two-factor authentication or not **(boolean, required)**.
- `active`: A boolean value indicating whether the user is active or not **(boolean, required)**.
- `role`: The role of the user (e.g., "user" or "admin") **(string, required)**.


**Example JSON object:**

```json
{
  "email": "user1@example.com",
  "username": "user1",
  "first_name": "John",
  "last_name": "Doe",
  "password": "securepassword",
  "phone_number": "+1234567890",
  "two_factor_enabled": true,
  "active": true,
  "role": "user"
}
```

**Example response:**

``` json
{
  "_id": "612e7f2a6c8b926730e7b6b9",
  "email": "user1@example.com",
  "username": "user1",
  "first_name": "John",
  "last_name": "Doe",
  "phone_number": "+1234567890",
  "two_factor_enabled": true,
  "active": true,
  "role": "user"
}
```

---

### Update user by ID

```http
PATCH /api/users/${id}
```

Update information for an existing user by their ID (Requires user authentication with administrator role or user role but the ID in the token must be the same as the ${id}).

| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `id`      | `string` | **Required**. ID of the user to update. |
| `body`    | `object` | **Required**. Updated user data.        |

**Example JSON object:**

```json
{
  "first_name": "Jane",
  "last_name": "Smith",
}
```

**Example response:**

``` json
{
  "_id": "612e7f2a6c8b926730e7b6b9",
  "email": "user1@example.com",
  "username": "user1",
  "first_name": "Jane",
  "last_name": "Smith",
  "phone_number": "+1234567890",
  "two_factor_enabled": true,
  "active": true,
  "role": "user"
}
```

---

### Update user password

```http
PATCH /api/users/${id}/update-password
```

Update password for an existing user by their ID (Requires user authentication with administrator role or user role but the ID in the token must be the same as the ${id}).

| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `id`      | `string` | **Required**. ID of the user to update. |
| `body`    | `object` | **Required**. Updated user data.        |

**Example JSON object:**

```json
{
  "current_password": "oldpassword",
  "new_password": "newpassword",
  "confirm_password": "newpassword"
}
```

**Example response:**

``` json
{
  "message": "Password updated successfully"
}
```

---


### Delete user by ID

```http
DELETE /api/users/${id}
```

Delete an existing user by their ID (Requires user authentication with administrator role).

| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `id`      | `string` | **Required**. ID of the user to delete. |

**Example response:**

``` json
{
  "message": "User deleted successfully"
}
```

---

## Two-Factor Authentication (2FA)
The 2FA section of the API provides a code via SMS to authenticate a user.

### Send code

```http
POST /api/2fa/send
```

Create a 6-digit code and send it to the user's associate number (No authentication required).

| Parameter | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `body`    | `object` | **Required**. JSON object containing user data. |

The `body` parameter should be a JSON object that contains the following fields:

- `email`: The email address of the user **(string, required)**.

**Example JSON object:**

```json
{
  "email": "user1@example.com"
}
```

**Example response:**

``` json
{
  "message": "2FA code sent by SMS"
}
```

---

### Verify code

```http
POST /api/2fa/verify
```

Check if the code entered is correct (Requires user authentication with administrator role).

| Parameter | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `body`    | `object` | **Required**. JSON object containing user data. |

The `body` parameter should be a JSON object that contains the following fields:

- `email`: The email address of the user **(string, required)**.
- `code`: The code received by message **(string, required)**.

**Example JSON object:**

```json
{
  "email": "user1@example.com",
  "code": "023852"
}
```

**Example response:**

``` json
{
  "message": "Valid 2FA code"
}
```

---

## Accout
The Account section handles new user registration, email verification, sending password reset emails and password reset token verification.

### Register new user

```http
POST /api/accounts/register
```

Register a new user account (No authentication required).

| Parameter | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `body`    | `object` | **Required**. JSON object containing user data. |

The `body` parameter should be a JSON object that contains the following fields:

- `email`: The email address of the user **(string, required)**.
- `username`: The username of the user **(string, required)**.
- `first_name`: The first name of the user **(string, required)**.
- `last_name`: The last name of the user **(string, required)**.
- `password`: The password for the user **(string, required)**.
- `phone_number`: The phone number of the user **(string, required)**.


**Example JSON object:**

```json
{
  "email": "user1@example.com",
  "username": "user1",
  "first_name": "John",
  "last_name": "Doe",
  "password": "securepassword",
  "phone_number": "+1234567890"
}
```

**Example response:**

``` json
{
  "message": "User successfully registered"
}
```

---

### Verify email

```http
PATCH /api/accounts/${token}/verify-email
```

Verifies the email address of a new registered user. (No authentication required).

| Parameter | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `token`      | `string` | **Required**. Token with the necessary data to authorize the action. |

**Example response:**

``` json
{
  "message": "Account activated"
}
```

---

### Forgot password

```http
POST /api/accounts/forgot-password
```

Sending an email to reset the user's password. (No authentication required).

| Parameter | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `body`    | `object` | **Required**. JSON object containing user data. |

The `body` parameter should be a JSON object that contains the following fields:

- `email`: The email associated with the user's account **(string, required)**.


**Example JSON object:**

```json
{
  "email": "user1@example.com"
}
```

**Example response:**

``` json
{
  "message": "Reset password email sent successfully."
}
```

---

### Verify Reset Password

```http
PATCH /api/accounts/${token}/reset-password
```

Sending an email to reset the user's password. (No authentication required).

| Parameter | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `token`      | `string` | **Required**. Token with the necessary data to authorize the action. |
| `body`    | `object` | **Required**. JSON object containing user data. |

The `body` parameter should be a JSON object that contains the following fields:

- `password`: The new user password **(string, required)**.

**Example JSON object:**

```json
{
  "password": "mynewsecretpassword",
}
```

**Example response:**

``` json
{
  "message": "Password has been changed successfully."
}
```