Ensure you have Node.js installed (version 14.x or later).
Ensure you have MySQL installed and running.
Clone the repository
Install dependencies (npm install)
Create a .env file in the root directory with the following content
Initialize Sequelize (npx sequelize-cli init)
Edit config/config.js to use environment variables
Run database migrations (npx sequelize-cli db:migrate)
Start the application (npx ts-node-dev src/server.ts)
