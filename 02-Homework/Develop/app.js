const { deepStrictEqual } = require("assert");
const express = require("express");
const fs = require('fs')
const path = require('path');
const { brotliDecompress } = require("zlib");

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
//Lets us use URL to talk cross front and back end
app.use(express.urlencoded({ extended: true }));
//sends JSON back and forth
app.use(express.json());
//give us the ability to send html files to the front end
app.use(express.static("public"));


app.post('/api/notes', (req, res) => {
  fs.readFile('db/db.json',function(error, data){
    let oldNotes;
    try{
      oldNotes = [].concat(JSON.parse(data))
    } catch {
      oldNotes = []
    } 
    let {title, text} = req.body 
    const newNote = {title, text, id: Math.floor(Math.random() * 1000) + 1 }
    fs.writeFile('db/db.json', JSON.stringify([...oldNotes, newNote]), err => {
      if (err) {
        console.log(err)
      }
      else {
        fs.readFile('db/db.json',function(error, data){
          res.json(data)
        })
      
      }
    })

    })
    })

//should delete all data from db.json
app.delete('/api/notes', function (req, res){
    
})

//works
app.get('/api/notes', function (req, res){
fs.readFile('db/db.json',function(error, data){
res.json(JSON.parse(data))
})
})


app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

// The application should have a `db.json` file on the back end that will be used to store and retrieve notes using the `fs` module.

// The following HTML routes should be created:

// - `GET /notes` should return the `notes.html` file.

// - `GET *` should return the `index.html` file.

// The following API routes should be created:

// - `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.

// - `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into `npm` packages that could do this for you).