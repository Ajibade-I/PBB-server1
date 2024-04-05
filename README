# PBB charity server

This project is a web application for managing charities, donations, member applications, and messages. It provides various endpoints to create, retrieve, update, and delete charities, handle donations, manage member applications, and handle messages sent through the contact us page.

## Installation

To install the project, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd <project-directory>`
3. Install dependencies: `npm install`
4. Set up environment variables: Create a `.env` file and configure necessary environment variables.
5. Start the server: `npm start`

## Usage

The project exposes several endpoints that can be accessed through HTTP requests. Here are some of the key functionalities:

### Charities

- **Create Charity**: `POST /charity`

  - Access: admin
  - Description: Create a new charity.

- **Get Charities**: `GET /charity`

  - Access: public
  - Description: Retrieve all charities, with optional filtering options.

- **Delete Charity**: `DELETE /charity/:charityId`

  - Access: admin
  - Description: Delete a charity by ID.

- **Get Charity Donations**: `GET /charity/:charityId/donations`

  - Access: admin
  - Description: Retrieve all donations made to a given charity.

- **Update Charity**: `PUT /charity/:charityId/update`
  - Access: admin
  - Description: Update charity details.

### Donations

- **Donate Cash**: `POST /donations/:charityId/donate-cash`

  - Access: public
  - Description: Donate cash to a specific charity.

- **Get All Donations**: `GET /donations`
  - Access: admin
  - Description: Retrieve all donations made to every charity.

### Members

- **Submit Membership Application**: `POST /member/signup`

  - Access: public
  - Description: Submit a membership application.

- **Admin Login**: `POST /member/admin/login`

  - Access: public
  - Description: Admin login.

- **Get Members**: `GET /members`

  - Access: admin
  - Description: Retrieve all approved members.

- **Get Membership Applications**: `GET /members/applications`

  - Access: admin
  - Description: Retrieve all pending membership applications.

- **Accept Membership Application**: `PUT /members/:memberId/accept`

  - Access: admin
  - Description: Accept a membership application.

- **Reject Membership Application**: `PUT /members/:memberId/reject`
  - Access: admin
  - Description: Reject a membership application.

### Messages

- **Send Message**: `POST /message`

  - Access: public
  - Description: Send a message through the contact us page.

- **View All Messages**: `GET /message`

  - Access: admin
  - Description: View all messages.

- **View New Messages**: `GET /message/new`

  - Access: admin
  - Description: View new messages.

- **Reply to Message**: `POST /message/reply/:messageId`
  - Access: admin
  - Description: Reply to a message.

## Dependencies

- `sequelize`: ORM for database operations.
- `jsonwebtoken`: Library for generating and verifying JSON Web Tokens.
- Other dependencies for error handling, validation, and utility functions.
