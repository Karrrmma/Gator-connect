*********************************************************************************************************************************************
# Application Folder

## Purpose
The purpose of this folder is to store all the source code and related files for your team's application. You are free 
to organize the contents of the prototypes' folder as you see fit. But remember your team is graded on how you use Git. 
This does include the structure of your application. Points will be deducted from poorly structured application folders.

## Please use the rest of the README.md to store important information for your team's application. 
*********************************************************************************************************************************************

## Backend Directory Structure
- `routes`: This directory contains `handler.js` that has all of the backend routes that we used in this project.
- `index.js`: 

## Frontend Directory Structure
- `public`: Holds static files that are directly served by the web server.
- `src`: Main folder that holds the applications source code.
    * `assets`: Holds static files (images) used in the application.
    * `components`: Used to store reused UI pieces in the application.
    * `constants`: Contains the constant values used throughout the application.
    * `hooks`: Contains custom React hooks that are reused.
    * `pages`: Contains different folders with pages that user can navigate to. Each folder represents a different page.
    * `utils`: Contains useful utility functions that are used throughout the application, 

## Credentials Folder
- SSH key: `california.pem`

# Instructions to Start Server for Development:

`cd` into both the frontend and backend and type `npm install`
To start the server, go into backend and run `npm run dev`

If it fails to work, open split terminals and run these to commands in each:
    - `npm run server` in backend folder
    - `npm run start` in frontend folder
