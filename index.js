const express = require('express')
const app = express()

const http = require('http')
const server = http.createServer(app)
const path = require('path')
const fs = require('fs')

const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname + '/client/public'))
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:'50mb', extended:true}))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/index.html'))
})

app.post('/image', (req, res) => {
    const imgPath = './imageUploads/' + Date.now() + '.png';
    let image = req.body.image;
    const base64Data = image.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    fs.writeFileSync(imgPath, base64Data,  {encoding: 'base64'});
    console.log("image received and saved")
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})