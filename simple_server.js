const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js': contentType = 'text/javascript'; break;
        case '.css': contentType = 'text/css'; break;
        case '.json': contentType = 'application/json'; break;
        case '.png': contentType = 'image/png'; break;
        case '.jpg': contentType = 'image/jpg'; break;
        case '.svg': contentType = 'image/svg+xml'; break;
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code == 'ENOENT') {
                // Try removing query string if present
                if (filePath.includes('?')) {
                    filePath = filePath.split('?')[0];
                    // Retry read
                    fs.readFile(filePath, (err2, content2) => {
                        if (err2) {
                            res.writeHead(404);
                            res.end('404 Not Found');
                        } else {
                            res.writeHead(200, { 'Content-Type': contentType });
                            res.end(content2, 'utf-8');
                        }
                    });
                    return;
                }
                res.writeHead(404);
                res.end('404 File Not Found');
            }
            else {
                res.writeHead(500);
                res.end('500 Internal Server Error: ' + error.code);
            }
        }
        else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
