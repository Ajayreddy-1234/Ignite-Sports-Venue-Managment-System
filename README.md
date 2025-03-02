# Ignite Sports Venue Management System

Ignite Sports Venue Management System is a full-stack web application that enables users to create and manage sports venues and activities, as well as book available slots. The app is designed to streamline the process for venue owners and participants alike, making it easy to manage bookings, schedule events, and coordinate activities.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Venue & Activity Management:**  
  Create, update, and delete venues or activities.
- **Booking System:**  
  Allow users to browse available venues/activities and make bookings.
- **User Authentication:**  
  Secure authentication using Passport (including Google OAuth integration) and session management.
- **Email Notifications:**  
  Integration with Nodemailer to send confirmation emails and notifications.
- **Calendar Integration:**  
  Utilize libraries like `react-calendar` and `react-datetime` for scheduling and date selections.
- **Responsive Front-end:**  
  Built with React to ensure a smooth and interactive user experience.

## Technologies Used

- **Backend:** Node.js, Express
- **Frontend:** React, HTML, CSS
- **Database:** MySQL (via the `mysql2` package)
- **Authentication:** Passport & JSON Web Tokens (JWT)
- **Other Libraries:**  
  Axios, bcrypt, cookie-parser, cors, dotenv, express-session, nodemailer, and various React date-picker libraries  
  *(See [package.json](https://github.com/Ajayreddy-1234/Ignite-Sports-Venue-Managment-System/blob/main/package.json) for the complete list of dependencies.)*

## Folder Structure

```plaintext
Ignite-Sports-Venue-Managment-System/
├── bin/                # Optional scripts or executables
├── server/             # Server-side application (Express server, API endpoints)
├── venuemanagement/    # Front-end application (React client)
├── .env                # Environment variable configurations (not included in repo)
├── .gitignore          # Git ignore rules
├── package.json        # Project configuration and dependency management
└── package-lock.json   # Exact dependency tree
```

## Installation

### Clone the Repository
```bash
git clone https://github.com/Ajayreddy-1234/Ignite-Sports-Venue-Managment-System.git
cd Ignite-Sports-Venue-Managment-System
```
### Install Dependencies and Build the Project
```bash
npm run prestart
```
### Configure Environment Variables
Create a .env file in the root directory. Add the necessary configuration (e.g., database credentials, session secrets, OAuth keys). Refer to your project documentation or sample .env if available.

## Usage
### Start the Server
Once the installation and build process is complete, run:
```bash
npm start
```
Open  your browser and navigate to http://localhost:3000 to access the application

## Configuration

### Database
Ensure you have a MySQL database set up. Update the `.env` file with your database credentials.

### Authentication
If using Google OAuth, configure your Google API credentials in the `.env` file.

### Other Settings
Configure any other necessary environment variables (such as email credentials for Nodemailer) in the `.env` file.

## Contributing

Contributions are welcome! To contribute:
- Fork the repository.
- Create a new branch for your feature or bug fix.
- Commit your changes with clear commit messages.
- Open a pull request for review.

Please follow the repository’s coding style and include tests where applicable.

