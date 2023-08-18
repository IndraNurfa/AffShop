# AffShop

AffShop (Tokopedia Play Clone) is a web application that makes it easy for affiliate marketers to market the products they sell.

Features:
- User can register, login and logout.
- User can see video list with thumbnail from YouTube in home page.
- User can click each video and go to video detail page.
- User can see list products, embed YouTube, list comment.
- User can comment in the video.
- User can search the video.
- User can see their username and profile image on the top right corner of the page.

---
# How to Run Locally

## Install Dependencies:

- Make sure you have Node.js and npm (Node Package Manager) installed on your machine.
- Navigate to the project directory in your terminal or command prompt.

## Install Required Packages

Install package in client folder
```
cd client
npm install
```

Install package in server folder
```
cd server
npm install
```

## Set Up Environment Variables:

If necessary, edit variables in the PORT .env file.

## Start the API:

Once the packages are installed and the environment variables are set, start the API server by running the following command:
Run client(Frontend):
```
cd client
npm start
```

Run server(Backend):
```
cd client
npm start
```


---
# Project Database Structure

This document outlines the database structure for the project. The project's database consists of four collections: "users," "videos," "products," and "comments."

## Users Collection

This collection stores information about registered users.

| Field       | Type           | Description                                |
|-------------|----------------|--------------------------------------------|
| _id         | ObjectId       | Unique identifier.                         |
| username    | String         | The username of the user.                  |
| email       | String         | The email address of the user.             |
| password    | String         | The password of the user (hashed).         |
| pict       | String (URL)   | The URL to the profile photo of the user.  |

## Videos Collection

This collection stores information about videos uploaded by users.

| Field       | Type           | Description                                   |
|-------------|----------------|-----------------------------------------------|
| _id         | ObjectId       | Unique identifier.                         |
| username    | String         | The username of the user who uploaded the video. |
| title       | String         | The title of the video.                      |
| description | String         | The description of the video.                |
| imageUrl    | String (URL)   | The URL to the thumbnail or image associated with the video. |
| videoUrl    | String (URL)   | The URL to the actual video file.            |

## Products Collection

This collection stores information about products associated with specific videos.

| Field       | Type             | Description                                      |
|-------------|------------------|--------------------------------------------------|
| _id         | ObjectId       | Unique identifier.                         |
| videoId     | ObjectId (Ref)   | The unique identifier of the video associated with the product. |
| link        | String (URL)     | The link to the product (e.g., a product page URL). |
| title       | String           | The title or name of the product.               |
| price       | Number           | The price of the product.                       |
| image       | String           | The image of the product.                       |

## Comments Collection

This collection stores comments posted by users on specific videos.

| Field       | Type             | Description                                      |
|-------------|------------------|--------------------------------------------------|
| _id         | ObjectId       | Unique identifier.                         |
| videoId     | ObjectId (Ref)   | The unique identifier of the video to which the comment is associated. |
| username    | String           | The username of the user who posted the comment. |
| comment     | String           | The content of the comment.                     |
| timestamp   | Date             | The timestamp indicating when the comment was posted. |

---

# Project API Documentation

This document provides an overview of the API structure for the project. The API handles various functionalities related to users, videos, products, comments, and authentication. Below are the routes and their respective functionalities:

## Routes:

### Home Page

- **GET** `/api/getThumbnails`: Retrieve a list of video thumbnails for the home page.

### Product Handler

- **POST** `/api/addProduct/:id`: Add a new product associated with a specific video (requires authentication).
- **GET** `/api/getProduct/:id`: Get product details for a specific video.

### Video Handler

- **GET** `/api/video/:id`: Get details of a specific video.
- **POST** `/api/addVideo`: Add a new video (requires authentication).

### Comment Handler

- **POST** `/api/comment`: Add a new comment to a video (requires authentication).
- **GET** `/api/getComment/:id`: Get comments for a specific video.

### Auth Handler

- **POST** `/api/register`: Register a new user.
- **POST** `/api/login`: Log in an existing user.
- **POST** `/api/logout`: Log out the currently logged-in user.
- **GET** `/api/getSession`: Check current session as cookies.

### User Handler

- **GET** `/api/getProfile`: Get the profile details of the currently logged-in user (requires authentication).
- **POST** `/api/profile`: Edit the profile details of the currently logged-in user (requires authentication).

---

## API Structure Explanation:

The API is structured into various route handlers, each responsible for specific functionalities within the application:

- **Home Page**: The `/api/getThumbnails` route allows retrieval of video thumbnails for the home page.

- **Product Handler**: The `/api/addProduct/:id` route enables adding a new product associated with a specific video. The `/api/getProduct/:id` route retrieves product details for a specific video.

- **Video Handler**: The `/api/video/:id` route fetches details of a specific video. The `/api/addVideo` route allows adding a new video (requires authentication).

- **Comment Handler**: The `/api/comment` route enables users to add new comments to videos (requires authentication). The `/api/getComment/:id` route retrieves comments for a specific video.

- **Auth Handler**: The `/api/register` route is used to register new users. The `/api/login` route facilitates logging in for existing users. The `/api/logout` route logs out the currently logged-in user. The `/api/getSession` route check current session as cookies.

- **User Handler**: The `/api/profile` route retrieves profile details of the currently logged-in user (requires authentication). The `/api/profile` route allows editing the profile details of the currently logged-in user (requires authentication).

The API structure is designed to efficiently manage user-related actions, video-related actions, product-related actions, and commenting on videos. Some routes require authentication to ensure secure access to specific functionalities.

---

# List API request and response

#Users
- User object
```
{
  _id: ObjectId,
  username: string,
  email: string(hashed),
  photo: string
}
```
**POST /api/register**
---
  Create new acoount.
* **URL Params**  
  None
* **Data Params**
  ```
  {
    username: string,
    email: string,
    password: string
  }
  ```
* **Headers**  
  Content-Type: application/json
* **Code:** 200  
  **Content:** 
  ```
  {
  message: 'User registered successfully!',
  <user_object>
  }
  ```
* **Error Response:**
  * **Code:** 409 
  **Content:** `{ error : 'User with this email already exists.' }`  
  OR  
  * **Code:** 409  
  **Content:** `{ error : 'User with this username already exists.' }`

**POST /api/login**
---
  Login with existing user data.
* **URL Params**  
  None
* **Data Params**
  ```
  {
    email: string,
    password: string
  }
  ```
* **Headers**  
  Content-Type: application/json
* **Code:** 200  
  **Content:** ` { message: 'Login successful!' } `
* **Error Response:**
  * **Code:** 401 
  **Content:** `{ error : 'Invalid credentials. Please try again.' }`  

**POST /api/logout**
---
  Logout.
* **URL Params**  
  None
* **Data Params**
  None
* **Headers**  
  Content-Type: application/json
* **Code:** 200  
  **Content:** ` { message: 'Logged out successfully!' } `

**GET /api/getSession**
----
Returns the current cookies.
* **URL Params**  
  None
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**
  ```
  {
  loggedIn: true,
  <user_object>
  }
  ``` 
* **Error Response:**
  **Content:** `{ loggedIn: false}`

**GET /api/profile**
----
Returns the specified user that based on session login.
* **URL Params**  
  None
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <user_object> }` 
* **Error Response:**  
  * **Code:** 500  
  **Content:** `{ error : error.message}`


**POST /api/profile**
---
  Update the user account.
* **URL Params**  
  None
* **Data Params**
  ```
  {
    username: string,
    email: string,
    password: string,
    photo: string
  }
  ```
* **Headers**  
  Content-Type: application/json
* **Code:** 200  
  **Content:**  `{ <user_object> }` 
* **Error Response:**
  * **Code:** 400 
  **Content:** `{ error : error.message }`
    
#Videos
- Video object
```
{
  _id: ObjectId,
  username: string,
  title: string,
  description: string,
  imageUrl: string,
  videoUrl: string
}
```
**GET /api/getThumbnails**
---
Return all videos in the system.
* **URL Params**  
  None
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  
```
{
  videos: [
           {<video_object>},
           {<video_object>},
           {<video_object>}
         ]
}
```

**GET /api/videos/:id**
----
  Returns the specified video, products, comments that related to the Specific id.
* **URL Params**  
  *Required:* `id=[objectId]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**
  ```
  {
    videos: [
      username: string,
      title: string,
      description: string,
      imageUrl: string,
      videoUrl: string,
      views: number,
      like: array
      ].
    products: [
      {<product_object>},
      {<product_object>},
      {<product_object>}
    ],
    comments : [
    {<comment_object>},
    {<comment_object>},
    {<comment_object>},
    ]
  }
  ```
* **Error Response:**  
  * **Code:** 500  
  **Content:** `{ error : "Internal Server error" }`  

**POST /api/addVideo**
----
  Creates a new Video and returns the new object.
* **URL Params**  
  None
* **Data Params**  
```
  {
  username: string,
  title: string,
  description: string,
  imageUrl: string,
  videoUrl: string,
  }
```
* **Headers**  
  Content-Type: application/json
  Authorization: Bearer `<OAuth Token>`
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <product_object> }` 

#Products
- Product object
```
{
  _id: ObjectId,
  videoId: ObjectId(ref),
  link: string,
  title: string,
  price: number
}
```
**POST /api/addProduct/:id**
----
  Creates a new Product and returns the new object.
* **URL Params**  
  *Required:* `id=[objectId]`
* **Data Params**  
```
  {
  videoId: id,
  link: string,
  title: string,
  price: number
  }
```
* **Headers**  
  Content-Type: application/json
  Authorization: Bearer `<OAuth Token>`
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <product_object> }` 

**GET /api/getProduct/:id**
----
  Returns the specified Product.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <product_object> }` 
* **Error Response:**  
  * **Code:** 500  
  **Content:** `{ error :  error.message }` 

#Comments
- Comment object
```
{
  _id: ObjectId,
  videoId: ObjectId(ref),
  username: string,
  comment: string,
  timestamp: datetime(iso 8601)
}
```
**GET /api/getComment/:id**
----
Returns the specified comments that related to the Specific video id.
* **URL Params**  
  *Required:* `id=[objectId]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <comment_object> }` 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : error.message}`  

**POST /api/comment**
---
Creates a new comment and returns the new object.
* **URL Params**  
  None
* **Data Params**  
```
  {
  	username: string
  	comment: string
  }
```
* **Headers**  
  Content-Type: application/json
  Authorization: Bearer `<OAuth Token>`
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <order_object> }` 
