# Jot :: Field Notes Documentation

A secure note-taking app using Node.js, Express, Expo, and MongoDB.
This project has been converted from my midterm note-taking app.

## Features

* JWT user authentication with bcrypt hashing
* CRUD operations on notes
* Mobile app

## Mobile-specific features

* Optional GPS location for storing field note location
* Swipe to refresh on main notes
* Secure storage for token.

## Installation
```
git clone https://github.com/kyle-strachan/jot-field-notes-react.git
cd jot_app
npm install
```

## Setup
### Prerequisites
1. Expo

### Environment variables
Create a `.env` file in the project's root directory.
```
EXPO_PUBLIC_API_ENDPOINT=https://jot-field-notes-back-end.onrender.com
```

## Run front end locally
```
npx expo start
```

## API
This project uses a live back-end API service. Use the `EXPO_PUBLIC_API_ENDPOINT` to connect.

## API Endpoints
The application uses an API service; all responses are in JSON format.

### Auth Routes

| Method | Endpoint      | Description               |
|--------|---------------|---------------------------|
| POST   | `/register`   | Register a new user       |
| POST   | `/login`      | Log in and receive tokens |
| POST   | `/logout`     | Log out and clear cookies |

### Notes Routes (Protected)

All protected routes require authentication via a secure store token.

| Method | Endpoint           | Description                      |
|--------|--------------------|----------------------------------|
| GET    | `/notes`           | View all notes for logged-in user |
| GET    | `/notes/new`       | Show form to create a new note  |
| POST   | `/notes`           | Create a new note               |
| GET    | `/notes/:id/edit`  | Show edit form for a note       |
| PUT    | `/notes/:id`       | Update a note                   |
| DELETE | `/notes/:id`       | Delete a note                   |


## Reflection and development notes

* Using my midterm project, I split the project into a front and back-end project. The front end was entirely rebuilt with React Native.
* I experimented with using state variables to hold updated notes but came across inconsistencies between the live database and stale screens and therefore opted to refetch the notes when returning to the Dashboard each time.
* I had inconsistent navigation headings and varying sizes due to mixed tab and stack headings. To correct this, I placed all screens inside a stack, even if they were a single page so that the header and back button show evenly.
* This app was tested on Android, with a brief install on iOS. I have been unable to verify whether the keyboard no longer blocks the input fields on iOS but the problem was resolved on Android using `<KeyboardAwareScrollView>`.
* Basic front-end input validation has been implemented to reduce API calls; the back-end validates as per the midterm submission.
