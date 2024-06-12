# Feedback Management System

## Overview

The Feedback Management System is a web application that allows users to submit feedback and view a list of all feedback entries. The application is built using React for the frontend and Express.js for the backend. It incorporates a simple form for feedback submission and displays the feedback in a list format. The application also includes features to handle rate limiting and retries for fetching feedbacks.
## Features

- Submit feedback through a simple form
- View a list of submitted feedback
- Handle rate limiting with retry logic
- Responsive and user-friendly UI
## Technologies Used

- **Frontend:** React, TypeScript, Axios, CSS
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** (Assuming a simple in-memory storage for feedback)

## Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher) or yarn

## Installation

1. Clone the repository

```bash
  git clone https://github.com/sarthakkurothe/zenstreet.ai_assignment
  cd zenstreet.ai_assignment
```

2. Install dependencies

```bash
  cd backend
  npm install
```
```bash
  cd ../frontend
  npm install
```
3. Running the application

```bash
  cd backend
  npm run dev
```
```bash
  cd frontend
  npm start
``` 
## Project Structure

- Backend

```
backend/
├── src/
│   ├── controllers/
│   │   └── feedbackController.ts
│   ├── models/
│   │   └── feedbackModel.ts
│   ├── routes/
│   │   └── feedbackRoutes.ts
│   ├── services/
│   │   └── feedbackService.ts
│   ├── app.ts
│   └── server.ts
├── package.json
└── tsconfig.json
```

- Frontend

```
frontend/
├── src/
│   ├── components/
│   │   ├── FeedbackForm.tsx
│   │   └── FeedbackList.tsx
│   ├── App.tsx
│   ├── index.tsx
│   └── styles/
│       ├── FeedbackForm.css
│       └── FeedbackList.css
├── package.json
└── tsconfig.json
```

