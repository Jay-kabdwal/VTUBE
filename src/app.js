import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Configure CORS middleware to handle Cross Origin Resource Sharing
// Allows requests from specified origin in env variables
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true
}));

// Parse incoming JSON payloads(will accept json data)
// Limits JSON data to 16kb size
app.use(express.json({
    limit: "16kb"
}));

// Parse incoming URL-encoded payloads (form data)(will accept data from url)
// extended: true allows for rich objects and arrays to be encoded
// Limits form data to 16kb size
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));

// Serve static files from the 'public' directory
// Useful for serving images, CSS, JavaScript files
app.use(express.static("public"));

// Parse Cookie header and populate req.cookies
// Helps in handling client-side cookies
app.use(cookieParser());


export { app };
