# Social Media API

## Description
This project is a **Social Media API** built using **Node.js, Express, and MongoDB**. It allows users to create accounts, post thoughts, add friends, and react to thoughts. The API follows RESTful principles and is tested using **Insomnia**.

## Walkthrough Video
[Click here to watch the walkthrough video](https://www.loom.com/share/818449919d1c46fab80d04892ec4e939?sid=966d2bf1-5de3-4409-92ca-a4da6994c960)

## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB** & **Mongoose**
- **Insomnia** (for API testing)

## Installation

1. Clone the repository:
   git clone <repository_url>
   cd social-media-api

2. Install dependencies:
   npm install

3. Start the server:
   npm run dev

## API Routes

### **User Routes**
- `GET /api/users` - Retrieve all users
- `GET /api/users/:id` - Retrieve a single user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user by ID
- `DELETE /api/users/:id` - Delete a user by ID

### **Thought Routes**
- `GET /api/thoughts` - Retrieve all thoughts
- `GET /api/thoughts/:id` - Retrieve a single thought by ID
- `POST /api/thoughts` - Create a new thought
- `PUT /api/thoughts/:id` - Update a thought by ID
- `DELETE /api/thoughts/:id` - Delete a thought by ID

### **Friend Routes**
- `POST /api/users/:userId/friends/:friendId` - Add a friend
- `DELETE /api/users/:userId/friends/:friendId` - Remove a friend

### **Reaction Routes**
- `POST /api/thoughts/:thoughtId/reactions` - Add a reaction
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId` - Remove a reaction

## Testing the API with Insomnia
1. Open **Insomnia**.
2. Create a new request and select the **method** (GET, POST, PUT, DELETE).
3. Enter the corresponding **URL** (e.g., `http://localhost:3001/api/users`).
4. For POST and PUT requests, add the required **JSON body**.
5. Click **Send** to test the API.

## License
This project is open source and available under the **MIT License**.

## Author
Created by **ValidAI**
