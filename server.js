const express = require('express');    //imports the express module, a popular web framework for Node.js; simplifies building web applications and APIs by providing tools for routing, handling HTTP requests and responses, middleware management, and more
const mongoose = require('mongoose');  //Object Data Modeling (ODM) library for MongoDB and Node.js; it provides a straightforward, schema-based solution to model the application data and includes features for data validation, query building, and business logic hooks
const bcrypt = require('bcryptjs');    //library for hashing and verifying passwords
const jwt = require('jsonwebtoken');   //used for generating and verifying JSON Web Tokens (JWT), which are a common way to handle authentication in web applications, allowing to securely transmit information between parties as a JSON object
const cors = require('cors');          //middleware for enabling Cross-Origin Resource Sharing; CORS is a security feature implemented by browsers that restricts web pages from making requests to a different domain than the one that served the web page

const app = express();               //creates an instance of an Express application; used to define routes, middleware, and other settings for the web server
const port =    ;                   //port number
const jwtSecret = 'secret_key';     //defines a secret key that will be used to sign and verify JWTs; it is crucial because it ensures that tokens are secure and cannot be easily forged
