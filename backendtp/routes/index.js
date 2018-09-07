var express = require('express');
var router = express.Router();

router.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  console.log(req.files);
  // The name of the input field (i.e. "file") is used to retrieve the uploaded file
  let file = req.files.file;
 
  // // Use the mv() method to place the file somewhere on your server
   file.mv('/tmp/'+file.name, function(err) {
     if (err)
       return res.status(500).send(err);
     res.send('File uploaded!');
   });
  
});
router.post('/submit', function(req, res) {
  console.log(req.body);
  //console.log(req.body.password);
  //res.redirect('http://localhost:8080');
  res.send({test: 'test'});
});
module.exports = router;
