## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### ⚙️ Deployment - Docker compose 
You should clone this repository & the Client repository on your server and put them together in the same directory. Move the docker-compose.yml file to the root directory and run the following command:

    $ docker-compose up -d

Example directory structure:
```
├── e-commerce-app
│   ├── client
│   ├── server
│   └── docker-compose.yml
```
### P/s: You can adjust the API port in the docker-compose.yml and server/config/server.js file. However, you should update the API port in the client app too.