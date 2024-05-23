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
- `index.js`: This is the main entry point of the server, it listens to a certain port and imports some needed frameworks.

## Frontend Directory Structure
- `public`: Holds static files that are directly served by the web server.
- `src`: Main folder that holds the applications source code.
    * `assets`: Holds static files (images) used in the application.
    * `components`: Used to store reused components within the application.
    * `constants`: Contains the constant values used throughout the application.
    * `services`: Contains every single call made to the backend. These API requests are separated into their own folders to 
    keep it organized.
    * `hooks`: Contains custom React hooks that are reused.
    * `pages`: Contains different folders with pages that user can navigate to. Each folder represents a different page or a group of pages. A folder will also contain a component if it is only used once within the project. 
    * `utils`: Contains useful utility functions that are used throughout the application.

## Credentials Folder
- SSH key: `california.pem`

# Instructions to Start Server for Development:

`cd` into both the frontend and backend and type `npm install`

To start the server, go into backend and run `npm run dev`

If it fails to work, open split terminals and run these to commands in each:
- `npm run server` in backend folder
- `npm run start` in frontend folder

# Instructions to Start Server for Production:

On your local machine, go into the frontend and run `npm run build`. Afterwards, commit this folder to the repository.

Then SSH into the server using the instructions within the credentials README.md.

Run `git pull` to obtain the latest version of the build folder then run `npm install` inside both the frontend and backend folders to ensure everything is updated.

Finally, cd into the backend and run `npm run prod` 

# Instructions to Deal with Frozen SSH Terminal or Error
There is a chance after a while of running that the terminal will freeze when connected to the instance, to force exit out of the SSH instance press `Enter+Tilde+.` in rapid succession.

Exiting the instance this way does not turn off the node process that is running. Any future attempts of running the production script will say `Error: listen EADDRINUSE: address already in use :::4000`, 

To fix this, you can kill the backend that is running on port 4000 and it will concurrently kill the frontend.
- `lsof -i tcp:4000` to find the process ID taking up port 4000
- `kill -9 PID`

