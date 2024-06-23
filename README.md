# Express.js Google OAuth2 Authentication

This repository contains an implementation of Google OAuth2 authentication using Express.js. The application is structured with TypeScript and demonstrates how to use Passport.js with the Google OAuth 2.0 strategy to authenticate users.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)


## Overview

This project showcases how to integrate Google OAuth2 authentication in an Express.js application using TypeScript. The application includes user authentication via Google, session management, and redirects users upon successful login.

## Installation

To get started with this project, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/express-google-oauth2-auth.git
2. Install dependencies:

   npm install
# Configuration

## Obtain Google OAuth2 credentials:

1. Go to the [Google Developers Console](https://console.developers.google.com/).
2. Create a new project.
3. Enable the "Google+ API" for the project.
4. Create OAuth 2.0 credentials (Client ID and Client Secret).
5. Set the Authorized Redirect URI to `http://localhost:3000/auth/google/callback`.
6. Update the `.env` file with your Google OAuth2 credentials.

## Usage

To run the application, execute the following command:

```sh
npm start

