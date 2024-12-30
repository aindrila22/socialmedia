
Social Media POC Application

This is a simplified social media Proof of Concept (POC) application where users can:
	•	Register and log in securely.
	•	Create, read, update, and delete posts.
	•	Like and comment on posts.
	•	View a list of created posts and liked posts in their profile section.

The application is built with React for the frontend, Node.js + Express for the backend, and MongoDB for the database.

Features

Frontend (React + Vite)
	•	User Interface: A user-friendly interface styled with TailwindCSS and Shadcn/ui.
	•	User Authentication: Register and log in functionality with secure token-based sessions.
	•	Post Components: Display posts, like, comment, and delete posts with interactive UI components.
	•	State Management: Managed application state using Redux Toolkit.

Backend (Node.js + Express)
	•	API Setup: A RESTful API for user authentication and post management.
	•	JWT Authentication: Secure session handling using JSON Web Tokens (JWT).
	•	Middleware:
	•	Authentication: Protects specific routes to ensure only authenticated users can perform certain actions.

API Endpoints

User Authentication
	•	POST /api/auth/register: Registers a new user.
	•	POST /api/auth/login: Logs in a user and returns a JWT token.
	•	GET /api/auth/profile: Retrieves the profile of the currently authenticated user.
	•	GET /api/auth/profile/:id: Retrieves the profile of a specific user by their ID.
	•	GET /api/auth/profile/:id/likes: Retrieves the list of likes associated with a specific user.

Post CRUD Operations
	•	GET /api/posts: Fetch all posts. (Public)
	•	POST /api/posts: Create a new post. (Protected - Requires Authentication)
	•	PUT /api/posts/:id: Update a post. (Protected - Requires Authentication)
	•	DELETE /api/posts/:id: Delete a post. (Protected - Requires Authentication)

Like and Comment Operations
	•	POST /api/posts/:id/like: Like/unlike a post. (Protected - Requires Authentication)
	•	POST /api/posts/:id/comment: Add a comment to a post. (Protected - Requires Authentication)

Database (MongoDB)

Schema Design
	•	User Schema: Includes fields like firstName, lastName, email, password, and timestamps.
	•	Post Schema: Includes fields like content, author, likes, comments, and timestamps.

Features
	•	Data Validation: Validates data at the schema level using Mongoose.
	•	Relationships: Maintains relationships between users and posts.

Installation and Setup

Prerequisites
	•	Node.js (v20+)
	•	MongoDB Atlas cluster link
	•	Vite CLI for React

Steps to Run the Project
	1.	Clone the Repository

git clone https://github.com/your-username/social-media-poc.git
cd social-media-poc


	2.	Install Dependencies
	•	Backend:

cd backend
npm install


	•	Frontend:

cd frontend
npm install


	3.	Set Up Environment Variables
	•	Backend: Create a .env file in the backend folder with the following:

PORT=5000
MONGO_URI=your-mongodb-atlas-uri
JWT_SECRET=your-secret-key


	•	Frontend: Create a .env file in the frontend folder with the following:

VITE_BACKEND_URL=backend deployed link
VITE_BACKEND_LOCALHOST=http://localhost:5000


	4.	Start the Application
	•	Backend:

cd backend
npm run dev


	•	Frontend:

cd frontend
npm run dev


	5.	Access the Application
Open the browser and go to: http://localhost:5173

Author

Aindrila Bhattacharjee

