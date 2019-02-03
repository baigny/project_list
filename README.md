# assignment
CRUD Application for Managing FORM application

**HOW TO RUN**
This project is built using React JS and it's libraries.

 To run this project:
 
 1. Run **npm install** command in command prompt for installing npm packages.
 
 2. The project uses JSON Server to fetch data from it's database. 
 
    To Run JSON Server, you need to run on another port : 3001 
    
    On another command prompt, run
    
    **json-server --watch database.json --port 3001**
    
 3. To start the application you need to run **npm start** command. (Open new command prompt if required)
 

**MODULE DESCRIPTION**

There are four modules in this assignment:

  * User Login

  * User Registeration

  * Project Add + List

  * Add Customers to Project + List (Project Detail)


**Login page**    

Sign-In Button: login form for users to sign in

Sign-Up Button: create new user form/ add users. Submitting will also directly login.

**Projects Page**

Project Listing

Adding Projects -- Form details: name, date, project description

Routing to Project Detail View from project list - click on individual project list entry


**Project Detailed View**

Display Project Info Details 

  * Description

  * Customer Count

  * Customer List
  
Adding  new Customers -- Form details: name, phone no, email, address

Back Button - routes to projects list View

**Logout Button**

Logs out the user and directs to Login page
