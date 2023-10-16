Comments project where you can add comments and reply to another comment. The project backend built with NestJs, MySQL, and TypeORM.
The front end of the project built with React. 

To start this project you should run docker containers for the DB and for the nest js app
To run docker clone project and type in the terminal `cd project-comments_server`. Then compose the containers using `docker-compose up -d --build` command.

In order to start frontend app use `cd project-comments/client` and run `npm run dev` command

You can also access this project using this link `https://commentserver.onrender.com:10000`. This is `render` hosting for the backend part, while MySQL db also hosting seperate.