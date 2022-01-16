# T-Jun-Jie_CVWO-Assignment-2022

How to set up database. (MongoDB atlas)

Guide: https://docs.atlas.mongodb.com/getting-started/

Once you created a database and cluster in MongoDB Atlas, get the connection string from Atlas.

Example of connection string: "mongodb+srv://jjtai:\<password\>@cvwo-to-do.9wfav.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

![Screenshot](/admin/images/instructions/db_step_1.jpg)
![Screenshot](/admin/images/instructions/db_step_2.jpg)
![Screenshot](/admin/images/instructions/db_step_3.jpg)

Create a .env file in /backend/cmd/api (on the same level as main.go)

In the env file, add MONGO_DB_URI = "mongodb+srv://jjtai:\<password\>@cvwo-to-do.9wfav.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" (your connection string)

In /backend/cmd/api, run the command "go run ./" in the command prompt. If everything works correctly, you should see the message "Connected to MongoDB!" in the command prompt



// How to get started
1. cd to frontend folder and run "npm install"
2. set up database (instructions above)
3. run "docker-compose up" in root directory
4. access application on folder via localhost:3000