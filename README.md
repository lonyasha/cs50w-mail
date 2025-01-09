# Mail

**Mail** is an email client built as part of **[CS50's Web Programming with Python and JavaScript](https://cs50.harvard.edu/web/2020/)** course. This project allows users to send, view, and organize emails through a single-page web application that interacts with a backend API to manage mailboxes, emails, and user interactions. The front-end of the email client is built using JavaScript, HTML, and CSS, enabling dynamic updates without page reloads.

## About the Project

In this project, I developed an email client with the following core features:

- **Inbox, Sent, and Archive Mailboxes**: Users can navigate between different mailboxes and view emails.
- **Composing Emails**: Users can compose and send emails to others.
- **Viewing Emails**: Users can read email content, including the sender, recipients, subject, body, and timestamp.
- **Archiving Emails**: Users can archive and unarchive emails.
- **Replying to Emails**: Users can reply to received emails, with the reply pre-filled based on the original email's content.

The project uses JavaScript to manage the dynamic user interface, making API calls to interact with the server and update the client-side content.

## Features

- **User Authentication**: Register, login, and manage user accounts.
- **Mailbox Management**: View emails in Inbox, Sent, and Archive folders.
- **Composing Emails**: Compose new emails and send them to specified recipients.
- **Viewing Emails**: Display details of individual emails with sender, recipients, subject, body, and timestamp.
- **Archiving**: Archive or unarchive emails.
- **Reply to Emails**: Reply to emails with pre-filled content (including recipient, subject, and body).
- **Real-time Updates**: Use JavaScript for dynamic updates of mailboxes, emails, and forms without reloading the page.

## Technologies Used

- **Python** (Django for back-end)
- **JavaScript** (for handling dynamic content)
- **HTML/CSS**
- **SQLite** (for database storage)

## Setup and Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/lonyasha/cs50w-mail.git
2. **Navigate into the project directory**:
   ```bash
   cd cs50w-mail
3. **Make migrations for the mail app:**:
   ```bash
   python manage.py makemigrations mail
4. **Apply the migrations to set up the database**:
   ```bash
   python manage.py migrate
5. **Run the server**:
   ```bash
   python manage.py runserver
6. **Access the application**: Open your browser and navigate to http://127.0.0.1:8000

### Key Points:
- All installation and setup instructions are placed in properly formatted code blocks.
- This allows for easy copying and pasting directly into the terminal.

---

This project is a part of **[CS50's Web Programming with Python and JavaScript](https://cs50.harvard.edu/web/2020/)** course by Harvard University. The course provided a comprehensive introduction to web development, and this project was designed to showcase the skills learned throughout the course.

Thank you for visiting! 🎉
