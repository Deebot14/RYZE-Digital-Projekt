# Project Overview
This project was developed as a task assignment from RYZE Digital. It is a simple yet fully functional React application demonstrating basic user authentication, protected routing, and CRUD-like behavior using local state and localStorage.

## Programming Languages / Technologies
React, TypeScript

## Features
- ### User Authentication:
Implements a login system with hardcoded credentials and uses localStorage to simulate session persistence.

- ### Protected Routes:
Restricts access to certain pages unless the user is authenticated. Unauthorized users attempting to access protected routes are redirected to the login page.

- ### CRUD-like Entry Management:
After logging in, users are redirected to a detail page where they can add, update, and view entries consisting of a title and date. The entries are managed in-memory, showcasing form-driven UI with real-time validation and input management.

- ### State Management:
Utilizes React Hooks for component-driven form handling, conditional rendering, and local state management.

- ### Navigation:
Clean and intuitive navigation between login and detail views using React Router.

