const http = require('http');

// Your name
const myName = "Barsharani Das";

// Create a server
const server = http.createServer((req, res) => {
  // Log your name
  console.log(myName);
  
  // Set response header
  res.writeHead(200, {'Content-Type': 'text/plain'});
  
  // Send your name as response
  res.end(myName);
});

// Start the server on port 4000
server.listen(4000, '127.0.0.1', () => {
  console.log(`Server running at http://127.0.0.1:4000/`);
});
