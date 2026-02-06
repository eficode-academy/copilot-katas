/**
 * Todo App - Main Application Entry Point
 * 
 * This is the starting point for the Todo application.
 * Work through the GitHub Copilot Katas exercises to build this app!
 * 
 * GitHub Copilot Katas - JavaScript Version
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

// Simple static file server for the exercises
const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, '..', req.url === '/' ? 'index.html' : req.url);
    
    const extname = path.extname(filePath);
    const contentTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json'
    };
    
    const contentType = contentTypes[extname] || 'text/plain';
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log(`
🚀 Todo App Server Running!
   
   Open http://localhost:${PORT} in your browser
   
   Ready for GitHub Copilot Katas exercises!
   Press Ctrl+C to stop the server.
`);
});

// ============================================
// TODO: Build your Todo application below!
// ============================================

// Exercise 1: Create a Todo class
// Hint: A todo should have: id, text, completed, createdAt

// Exercise 1: Create a TodoList class
// Hint: Start with a comment describing what the class should do

// Exercise 2+: Add more features as you progress through the labs!
