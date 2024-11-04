# Live Temperature API

This project is a temperature monitoring API built with TypeScript and Express, featuring real-time data updates and clean, well-structured code. 
- **API Documentation**: [https://temp-api.rosyidi.work/api-docs](https://temp-api.rosyidi.work/api-docs)
- **API Endpoint**: [https://temp-api.rosyidi.work/api/temperatures](https://temp-api.rosyidi.work/api/temperatures)
- **Web Dashboard**: [https://live-temp-dashboard.vercel.app](https://live-temp-dashboard.vercel.app)

## Table of Contents

- [Project Overview](#project-overview)
- [Folder Structure](#folder-structure)
- [Workflow and Code Organization](#workflow-and-code-organization)
- [Installation and Setup](#installation-and-setup)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Realtime Updates with WebSocket](#real-time-Updates-with-WebSocket)

## Project Overview

This API service retrieves and monitors temperature data, emitting it every 5 seconds using a cron job. Real-time updates are enabled through a WebSocket connection, which clients can use to receive temperature changes as they happen. The project is designed with clean code principles, ensuring maintainability and ease of testing.

## Folder Structure

The following structure organizes the code into a clean, modular hierarchy:

```plaintext
│   index.ts
│
├───app
│   │   app.ts
│   ├───controllers
│   │       temperature.controller.ts
│   ├───models
│   │       temperature.model.ts
│   ├───repository
│   │       temperature.repository.ts
│   ├───routes
│   │       temperature.routes.ts
│   └───services
│           temperature.service.ts
│
├───configs
│       config.ts
│       database.ts
│       swagger.ts
│
├───db
│   │   knexfile.ts
│   └───migrations
│           20241027052938_create_temperatures_table.ts
│
├───docs
│       temperature.docs.ts
├───initializers
│       cronJob.ts
│       server.ts
│       socket.ts
│
├───jobs
│       temperature.job.ts
└───utils
        systemInfo.ts
```

### Key Directories

- **app**: Contains the core application logic, organized into:
  - **controllers**: Handles incoming API requests, validates input, and returns responses (e.g., `temperature.controller.ts`).
  - **models**: Defines data structures for temperature data (e.g., `temperature.model.ts`).
  - **repository**: Manages database interactions, separating data access from other layers (e.g., `temperature.repository.ts`).
  - **routes**: Defines API routes, linking endpoints to their respective controllers (e.g., `temperature.routes.ts`).
  - **services**: Contains business logic, making controllers lightweight and focused on request/response handling (e.g., `temperature.service.ts`).
- **configs**: Contains configuration files, including:

  - **config.ts**: General configuration for the app.
  - **database.ts**: Database setup and connection configuration.
  - **swagger.ts**: Configuration for generating API documentation.

- **db**: Manages database migration files and Knex configuration.

  - **knexfile.ts**: Knex configuration file.
  - **migrations**: Contains migration files to manage database schema (e.g., `20241027052938_create_temperatures_table.ts`).

- **docs**: Holds API documentation files (e.g., `temperature.docs.ts`) for endpoints.

- **initializers**: Contains server initialization files:

  - **cronJob.ts**: Sets up and schedules cron jobs.
  - **server.ts**: Initializes the Express server.
  - **socket.ts**: Configures WebSocket connections for real-time updates.

- **jobs**: Holds scheduled task files like `temperature.job.ts` for periodic temperature data updates.

- **utils**: Utility functions used throughout the app (e.g., `systemInfo.ts` for retrieving system information).

## Workflow and Code Organization

The application is organized using a layered approach to maintain clean and modular code:

1. **Controller**: Manages API requests and responses, delegating business logic to services.
2. **Service**: Contains core business logic, keeping controllers focused on request/response handling.
3. **Repository**: Handles database queries and operations, isolating data access logic.
4. **Model**: Defines data structure and validation for consistency and security.
5. **Cron Job**: Executes scheduled tasks to periodically update temperature data.
6. **WebSocket**: Sends real-time updates to clients, enabling live temperature monitoring.

This structure, combined with TypeScript, enhances maintainability and scalability by clearly separating concerns across components.

## Installation and Setup

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18.18 or higher)
- [npm](https://www.npmjs.com/)
- PostgreSQL

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/imamrosyidi/live-temp-api.git
   cd live-temp-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables in a `.env` file (e.g., database credentials, port).

4. Run migrations to set up the database:
   ```bash
   npm run migrate
   ```

## Available Scripts

The following scripts are available to help manage and run the project:

| Command           | Description                                                              |
| ----------------- | ------------------------------------------------------------------------ |
| `npm run build`   | Compiles TypeScript code to JavaScript, outputting to the `dist` folder. |
| `npm start`       | Starts the application from the compiled code in the `dist` folder.      |
| `npm run dev`     | Runs the project in development mode with hot reloading.                 |
| `npm test`        | Runs unit tests using Jest.                                              |
| `npm run migrate` | Applies the latest database migrations using Knex.                       |

## API Endpoints

You can access detailed API documentation at [https://temp-api.rosyidi.work/api-docs](https://temp-api.rosyidi.work/api-docs). This documentation includes information about each endpoint, including:

## Real-Time Updates with WebSocket

The application supports real-time updates via WebSocket. Temperature data is emitted to connected clients on the `temperature-update` event. Each emission includes a JSON object with the following structure:

```json
{
  "created_at": "ISO string",
  "value": "number"
}
```
