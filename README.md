# BlogApp — Full-Stack Blogging Platform

A full-stack blogging platform built with the **MERN stack**, providing a structured content management workflow with authentication, authorization, RESTful APIs, and complete CRUD operations.

## Overview

**BlogApp** is a modern full-stack web application designed to provide an end-to-end blogging experience. The application separates the frontend presentation layer from backend API and data-management services, enabling users to interact with blog content through a responsive React interface.

The backend exposes RESTful APIs using Node.js and Express.js, while MongoDB provides persistent storage for application data.

## Key Features

* **User Authentication & Authorization**

  * Secure authentication workflow
  * Protected administrative functionality
  * Role-based access for content management

* **Blog Management**

  * Create blog posts
  * Retrieve published content
  * Update existing posts
  * Delete blog posts
  * Manage blog content through administrative interfaces

* **Comment Management**

  * View and manage comments
  * Administrative comment controls
  * Persistent comment data

* **RESTful API Architecture**

  * Structured API endpoints using Express.js
  * Separation of routes, controllers, middleware, and models
  * API-driven communication between frontend and backend

* **Administrative Dashboard**

  * Centralized blog management
  * Blog listing and management
  * Comment management
  * Administrative navigation and controls

* **Database Integration**

  * MongoDB-based persistent storage
  * Structured data models for blogs and comments

## Technology Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS
* Tailwind CSS

### Backend

* Node.js
* Express.js
* RESTful APIs

### Database

* MongoDB

### Development & Deployment

* Git
* GitHub
* Vite
* Vercel

## Architecture

```text
                    ┌──────────────────────┐
                    │      React Client    │
                    │   Vite + Tailwind    │
                    └──────────┬───────────┘
                               │
                         HTTP / REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Express.js Server  │
                    │      Node.js          │
                    └──────────┬───────────┘
                               │
                 ┌─────────────┼─────────────┐
                 │             │             │
                 ▼             ▼             ▼
             Routes       Controllers     Middleware
                 │             │             │
                 └─────────────┼─────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       MongoDB        │
                    │ Persistent Storage   │
                    └──────────────────────┘
```

## Project Structure

```text
BlogApp/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── server/
│   ├── configs/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## API Design

The backend follows a modular REST API structure:

```text
Routes
  ↓
Controllers
  ↓
Middleware / Authentication
  ↓
Models
  ↓
MongoDB
```

This separation keeps request handling, business logic, authentication, and database interaction independently organized and easier to maintain.

## Core Data Models

### Blog

The blog model manages persistent blog content and its associated metadata.

### Comment

The comment model stores user comments associated with blog content and supports administrative management.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/jaschahal211/BlogApp.git
cd BlogApp
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

```bash
cd ../server
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `server` directory.

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Add any additional environment variables required by your configured services.

**Never commit `.env` files or API credentials to GitHub.**

## Running the Application

### Start the backend

```bash
cd server
npm run server
```

### Start the frontend

Open another terminal:

```bash
cd client
npm run dev
```

The Vite development server will provide the local frontend URL.

## Development Workflow

```text
React Client
     │
     │ REST API Requests
     ▼
Express API
     │
     ├── Authentication
     ├── Authorization
     ├── Blog Operations
     └── Comment Operations
     │
     ▼
MongoDB
```

## Security Considerations

* Authentication credentials are handled through environment variables.
* Sensitive configuration is kept outside source control.
* Protected administrative operations require authorization.
* API routes are separated from frontend presentation logic.

## Engineering Highlights

* Modular MERN architecture
* RESTful backend design
* Authentication and authorization
* Complete CRUD workflows
* Persistent MongoDB storage
* Component-based React frontend
* Separated routes, controllers, middleware, and models
* Administrative content and comment management

## Future Improvements

Potential extensions include:

* Automated testing and CI/CD
* Refresh-token based authentication
* Pagination and advanced search
* Rich-text blog editor
* Image optimization and CDN integration
* Rate limiting and API security hardening
* Containerized deployment
* Centralized logging and monitoring

## Author

**Jaskirandeep Kaur Chahal**

B.Tech. Information Technology
SGGS Institute of Engineering and Technology, Nanded

* GitHub: https://github.com/jaschahal211
* LinkedIn: https://linkedin.com/in/jaskiran-chahal

---

⭐ If you find this project useful, consider starring the repository.
