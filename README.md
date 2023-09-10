## Project Name

Catalog Application

## Introduction

The system’s main goal is to provide register, log-in, and log-out functionalities that can be used as a
basis when more advanced systems are developed.

## Features

- Cover Page: A view that renders at the root URL to welcome users to the web application.
- Home page: The homepage displays all current categories along with all added items.
Selecting a specific category from the list shows all items that belong to that category.
Selecting a specific item shows specific information about that item to a user.
-  About page: The primary purpose of an About page is to inform the user/reader about the
application and its operations.
- Contact page: A contact page is a common web page on a website for visitors to contact the
organization or individual providing the website. The page contains an e-mail address. a
telephone number and also, additionally, a map showing the location can be provided on this
page.
- Sign up page: A view with a form for user sign-up, allowing new users to create a user account
and redirecting them to a log-in page when successfully created Sign-in page: A view with a
sign-in form that allows existing users to sign in so they have access to protected views and
actions.
-  Log in page: A login page requires user identification and authentication, performed by
entering registered email and password combination.
-  Access protected page only accessible to logged-in users.
-  Add category modal: An option that allows the logged-in user to add a new item category by
title.
-  Add item page: A form for item creation consists of Title, and Description input fields, Add
Image option, and Categories-a list of all existing categories .
-  View item page: Selecting a specific item shows specific information about that item to a user
(both registered and unregistered).
-  Edit item page: A form that fetches the item's information in the form, allows users to edit the
information, and is accessible if the logged-in user is trying to edit items he added. Logged-in
users are not able to edit items added by other users.
-  Delete item component: An option that allows the logged-in user to delete the items he
added. Logged-in users are not able to delete items added by other users.
-  Menu navigation bar: A component that lists all the available and relevant views to the user,
and also helps to indicate the user's current location in the application.
-  Log out: An option that allows the logged-in user to log out from the system.

## Buit With

JavaScript
ReactJS
NodeJS
Express JS
Mongo DB

## Used Packgages

- JSON Web Token
- passport-jwt
- axios
- Multer

## Setup

Clone this repository. You will need node and npm installed globally on your machine. If you want to run database locally make sure that you have mongoDB server installed and running in background. You can also run cloud database using mongoDB Compas. Create a clutser and paste your connection string in dotenv file.


## Environment Variables

Create a .env file in the root directory of your server route. This file will contain sensitive configuration information needed for your application to function properly.

PORT: The port number on which the server will listen for incoming requests. 
JWT_SECRET: A secret key used for signing and verifying JWT tokens for authentication. 
MONGO: The connection URL for your MongoDB database. 
SESSION_SECRET: An optional secret key used for session management.

## To get a local copy up and running, follow these simple steps:

Clone the repo git clone https://github.com/your_username/catalog-application.git Install NPM packages npm install Start the project npm start