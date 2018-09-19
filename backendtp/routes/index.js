var express = require('express');
var _=require('lodash');
var router = express.Router();
var tableau=[];
var id = 0;
router.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  // The name of the input field (i.e. "file") is used to retrieve the uploaded file
  let file = req.files.file;
 
  // // Use the mv() method to place the file somewhere on your server
   file.mv('/tmp/tp/todo/'+file.name, function(err) {
     if (err)
       return res.status(500).send(err);
     res.send('File uploaded!');
   });
  
});
router.post('/submit', function(req, res) {
  console.log(req.body);
  var fs = require('fs');
  var files = fs.readdirSync('/tmp/tp/todo');
  //console.log(req.body.password);
  //res.redirect('http://localhost:8080');
  files.forEach(element => {
    tableau.push({id: id, name: element, status: 'todo'});
    id+=1;
  });

  console.log(tableau);
  res.send(tableau);
  parsing();
});

router.post('/update', async function(req, res) {
  while (req.body.length > 0 &&
    req.body.length === tableau.length && 
    req.body.sort().every(function(value, index) { return _.isEqual(value, tableau.sort()[index])}) &&
    req.body.sort().some(function(value) { return value.status !== 'ended'})
    ) {
      //console.log(req.body);
      //console.log(tableau);
      await sleep(500);
  }
  res.send(tableau);
});

function parsing(){
  return new Promise(async resolve => {
    tableau.forEach(element => {
      if (element.status != 'running') {
        var fs = require('fs');
        if (element.status == 'todo'){
          fs.rename('/tmp/tp/todo/'+element.name, '/tmp/tp/running/'+element.name, (err) => {
            if (err) {console.log(err);}
            else {
              console.log('file moved to running');
            }
          });
          element.status = 'running';
          sleep(5000).then(() => {
            fs.rename('/tmp/tp/running/'+element.name, '/tmp/tp/done/'+element.name, (err) => {
              if (err) {console.log(err);}
              else {
                console.log('file moved to ended');
              }
              element.status = 'ended';
            });
          });
        }
      }
    });
    return resolve = 1;
  });
};

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
module.exports = router;
