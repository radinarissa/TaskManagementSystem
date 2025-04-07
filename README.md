# Task Management System

A web application for organizing and tracking personal or team tasks. This system allows users to create, manage, and prioritize tasks with an intuitive interface.

The application helps users stay organized by tracking task status, setting priorities, and managing deadlines in one centralized location.

## Technology Stack

- **Backend**: ASP.NET Core 8.0, Entity Framework Core, SQL Server
- **Frontend**: React, TypeScript, Vite, Bootstrap
- **Authentication**: JWT tokens

## Features

- User registration and login
- Create, edit and delete tasks
- Set task priorities and status
- Track due dates
- Responsive design

## Setup

### Requirements
- .NET 8.0 SDK
- Node.js
- SQL Server

### Running the application
1. Clone the repository
2. Backend:
   - Update connection string in appsettings.json if needed
   - Run migrations: `Update-Database`
   - Start the API project
3. Frontend:
   - Navigate to client directory
   - Run `npm install`
   - Run `npm run dev`

## API Endpoints

- POST /api/Auth/register - Register new user
- POST /api/Auth/login - User login
- GET /api/Tasks - Get user's tasks
- POST /api/Tasks - Create new task
- PUT /api/Tasks/{id} - Update task
- DELETE /api/Tasks/{id} - Delete task

## Project Structure

- Clean architecture approach
- Separate backend and frontend projects
- Repository pattern for data access
- React component-based UI
