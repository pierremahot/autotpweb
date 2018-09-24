var express = require('express');
var _ = require('lodash');
var router = express.Router();
var tableau = [];
var idrequest = 0;
router.post('/upload', function (req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  // The name of the input field (i.e. "file") is used to retrieve the uploaded file
  let file = req.files.file;

  // // Use the mv() method to place the file somewhere on your server
  file.mv('/tmp/tp/todo/' + file.name, function (err) {
    if (err)
      return res.status(500).send(err);
    res.send('File uploaded!');
  });

});
router.post('/submit', function (req, res) {
  console.log(req.body);
  var fs = require('fs');
  var files = fs.readdirSync('/tmp/tp/todo');
  //console.log(req.body.password);
  //res.redirect('http://localhost:8080');
  var idtp = 0;
  var temp = [];
  files.forEach(element => {
    temp.push({
      id: idtp,
      name: element,
      status: 'todo'
    });
    idtp += 1;
  });
  tableau[idrequest] = ({
    idrequest: idrequest,
    files: temp
  });
  console.log(tableau[idrequest]);
  res.send(tableau[idrequest]);
  parsing(idrequest);
  idrequest += 1;
});

router.post('/update', async function (req, res) {
  const idrequest = req.body.idrequest;
  const files = req.body.files;
  console.log(files);
  console.log(idrequest);
  while (files.length > 0 &&
    files.length === tableau[idrequest].files.length &&
    files.sort().every(function (value, index) {
      return _.isEqual(value, tableau[idrequest].files.sort()[index])
    }) &&
    files.sort().some(function (value) {
      return value.status !== 'ended'
    })
  ) {
    //console.log(req.body);
    //console.log(tableau);
    await sleep(500);
  }
  res.send(tableau[idrequest].files);
});

function parsing(idrequest) {
  return new Promise(async resolve => {
    tableau[idrequest].files.forEach(async element => {
      if (element.status != 'running') {
        var fs = require('fs');
        if (element.status == 'todo') {
          fs.rename('/tmp/tp/todo/' + element.name, '/tmp/tp/running/' + element.name, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log('file moved to running');
            }
          });
          element.status = 'running';
          await sleep(5000);
          fs.rename('/tmp/tp/running/' + element.name, '/tmp/tp/done/' + element.name, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log('file moved to ended');
            }
            element.status = 'ended';
            element.folded = false;
            element.result = [{
              id: 1254,
              state: 'success'
            }, {
              id: 12554,
              state: 'success'
            }];
          })
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