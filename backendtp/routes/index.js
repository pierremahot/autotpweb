const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const _ = require('lodash');
const router = express.Router();
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'autotp';
const client = new MongoClient(url, { useNewUrlParser: true });
var db
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  db = client.db(dbName);
});

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



router.post('/update', async function (req, res) {
  const idrequest = req.body.idrequest;
  const files = req.body.files;
  docs = await db.collection('requests').findOne({ '_id': ObjectID(idrequest)});
  console.log(docs);
  while (files.length > 0 &&
    files.length === docs.files.length &&
    files.sort().every(function (value, index) {
      return _.isEqual(value, docs.files.sort()[index])
    }) &&
    files.sort().some(function (value) {
      return value.status !== 'ended'
    })
  ){
    docs = await db.collection('requests').findOne({ '_id': ObjectID(idrequest)});
    console.log(docs);
    await sleep(500);
  }
  res.send(docs.files);
});

router.get('/history', async function (req, res) {
  docs = await db.collection('requests').find({ files: { $exists: true } }).toArray();
  console.log(docs);
  res.send(docs);
});

router.post('/submit', function (req, res) {
  var fs = require('fs');
  var files = fs.readdirSync('/tmp/tp/todo');
  var idtp = 0;
  var files_list = [];
  files.forEach(element => {
    files_list.push({
      id: idtp,
      name: element,
      status: 'todo'
    });
    idtp += 1;
  });
  db.collection('requests').insertOne({'files': files_list}).then( function (result){
    console.log (result.insertedId);
    request = {
      idrequest: result.insertedId,
      files: files_list
    };
    res.send(request);
    parsing(request.idrequest);
  });
});

function parsing(idrequest) {
  //console.log(idrequest);
  return new Promise(async resolve => {
    db.collection('requests').findOne({ '_id': ObjectID(idrequest) }).then( function (request){
      request.files.every(async function (element, index) {
        if (element.status != 'running') {
          var fs = require('fs');
          if (element.status == 'todo') {
            fs.rename('/tmp/tp/todo/' + element.name, '/tmp/tp/running/' + element.name, (err) => {
              if (err) {
                //console.log(err);
              } else {
                //console.log('file moved to running');
              }
            });
            var temp = request.files;
            console.log(temp);
            temp[index].status = 'running'
            result = await db.collection('requests').findOneAndUpdate({ '_id': ObjectID(idrequest) },
              { 
                $set: {
                  files: temp
                }
              }
            );
            console.log(result);
            await sleep(getRandomInt(5000));
            fs.rename('/tmp/tp/running/' + element.name, '/tmp/tp/done/' + element.name, async  (err) => {
              if (err) {
                console.log(err);
              } else {
                //console.log('file moved to ended');
              }
              const now = Date.now();
              temp[index] ={
                status: 'ended',
                id: element.id,
                name: element.name,
                date: now.getUTCDate(),
                folded: false,
                error: 0,
                result : [{
                  begindate:'02-05-2018',
                  enddate:'02-05-2018',
                  duration:'20min',
                  description:'description',
                  origine:'OBS',
                  type:'maintenance',
                  devices_list_folded: 'true',
                  devices_list: [{ entry: 'monsite1' }, { entry: 'monsite2' }, { entry: 'monsite3' }],
                  impact:'coupure totale',
                  error:'0',
                  response:'200',
                  id: 1254,
                  name: 'test1',
                  state: 'success',
                  url: 'http://',
                  error: 0,
                  folded: 'true'
                }, {
                  begindate:'02-05-2018',
                  enddate:'02-05-2018',
                  duration:'20min',
                  description:'description',
                  origine:'OBS',
                  type:'maintenance',
                  impact:'coupure totale',
                  devices_list_folded: 'true',
                  devices_list: [ { entry: 'monsite1' }, { entry: 'monsite2' }, { entry: 'monsite3' }],
                  response:'200',
                  id: 1255,
                  name: 'test2',
                  state: 'success',
                  url: 'http://',
                  error: 1,
                  folded: 'true'
                }]
              }
              await db.collection('requests').findOneAndUpdate({ '_id': ObjectID(idrequest) },
                { 
                  $currentDate: {
                    "creationDate": true
                  },
                  $set : {
                    files: temp
                  }
                }
              );
            });
          }
        }
      });
      return resolve = 1;
    });
    
  });
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
module.exports = router;