module.exports = {
  "name": "tsx-template",
  "version": "1.0.0",
  "description": "A React typescript boilerplate",
  "main": "index.js",
  "scripts": {
    "dev": 'concurrently "webpack" "npm start"',
    "start": "webpack-dev-server --mode development --hot",
    "build": "webpack --mode production"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/react": "^16.7.3",
    "@types/react-dom": "^16.0.9",
    "@types/react-router-dom": "^4.3.1",
    "awesome-typescript-loader": "^5.2.1",
    "concurrently": "^4.0.1",
    "source-map-loader": "^0.2.4",
    "typescript": "^3.1.6",
    "webpack": "^4.25.1",
    "webpack-cli": "^3.1.2",
    "webpack-dev-server": "^3.1.10"
  },
  "dependencies": {
    "react": "^16.6.3",
    "react-dom": "^16.6.3",
    "react-router-dom": "^4.3.1"
  }
};
