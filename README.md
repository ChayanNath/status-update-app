# Status Update App

This application is designed to help teams update and track their daily tasks and display them during scrum meetings. It allows users to create teams, update their statuses, and fetch the status updates of team members.

## Features

- **Create Teams:** Users can create teams and add members to the teams.
- **Daily Status Updates:** Team members can update their daily status with a title and description.
- **Fetch Status Updates:** Users can fetch the status updates of all team members of a team or individual team members.
- **Export to Excel:** Admins can export status updates to an Excel sheet, with each sheet named after the user and updates in each row, for a team or all users.
- **Admin Rights:** Admin users can create teams and add members to teams.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Passport.js

## Setup and Installation

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-repo/status-update-app.git
   ```

2. Navigate to the project directory:

   ```sh
   cd status-update-app
   ```

3. Install the dependencies for the backend:

   ```sh
   cd backend
   npm install
   ```

4. Install the dependencies for the frontend:
   ```sh
   cd ../frontend
   npm install
   ```

### Environment Variables

Create a `.env` file in the `backend` directory and add the following environment variables:

```env
PORT=your_port
DATABASE_URL=your_database_url
SESSION_SECRET=your_session_secret
PASSPORT_STRATEGY_CONFIG=your_passport_strategy_config
```
