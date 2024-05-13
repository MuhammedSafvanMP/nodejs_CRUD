const http = require('http');
const dotenv = require("dotenv");
dotenv.config();

const user = require("./db/user.json");


const PORT = process.env.PORT || 8080;

http.createServer( (req, res) => {
    if (req.method === "GET") {
        res.writeHead(200, {'Content-Type': 'text/json'});

        
        res.write(JSON.stringify(user));
        res.end();
    }
}).listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
