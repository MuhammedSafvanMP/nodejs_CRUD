const http = require('http');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const user = require("./db/user.json");
const crypto = require("crypto")
const fs = require("fs");


dotenv.config();
const PORT = process.env.PORT || 8080;
const jsonParser = bodyParser.json();

http.createServer((req, res) => {
    // get all users
    if (req.method === "GET") {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(user));
        res.end();
    }
    // post create new user
    else if(req.method === "POST" && req.url === "/create") {

        jsonParser(req, res, () => {


            const { name, age, place } = req.body;
            const id = crypto.randomUUID()

            user.push({ id, name, age, place });

            const jsonData = JSON.stringify(user);

            fs.writeFile("./db/user.json", jsonData , (error) => {
                if(error) res.statusCode(500).write(error)
            })

            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end();

        });
    }
}).listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
