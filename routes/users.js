var express = require('express');
var fs = require('fs');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//http://localhost:3000/users/add
router.post('/add', function(req, res, next) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var phone = req.body.phone;
  console.warn ('add', firstName, lastName, phone, req.body);
  
  var persons = require('../public/data/persons.json'); //fisierul e la 2 nivele in sus fata de folderul curent
  //echivalent cu:
  //var strPersons = fs.readFileSync('./public/data/persons.json');
  //var persons = JSON.parse(strPersons);

  const id = new Date().getTime();
  persons.push({
    id,
    firstName,
    lastName,
    phone
  });
  //firstName echivalent cu firstName: firstName; doar daca cheia e egala cu valoarea
  //pana aici persoana noua apare doar in memorie

  var str = JSON.stringify(persons, null, 2);

  console.log('str', str);

  fs.writeFileSync('./public/data/persons.json', str); //fs.write citeste de la nivelul principal al proiectului, de aceea e ./public

  res.json({
    success: true,
    id: id,
    message: 'Done'
  });
});


router.put('/update', function(req, res, next) {
  const id = req.body.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phone = req.body.phone;
  console.warn ('update', id, firstName, lastName, phone);
  
  var persons = require('../public/data/persons.json'); //fisierul e la 2 nivele in sus fata de folderul curent

  // arrow function
  const person = persons.find((p) => {
    return p.id == id;
  });
  person.firstName = firstName;
  person.lastName = lastName;
  person.phone = phone;

  var str = JSON.stringify(persons, null, 2);

  fs.writeFileSync('./public/data/persons.json', str); //fs.write citeste de la nivelul principal al proiectului, de aceea e ./public

  res.json({
    success: true,
    id: id,
    message: 'Done'
  });
});


router.delete('/delete', function(req, res, next) {
  var id = req.body.id;
  console.warn('remove person', id);
  
  var persons = require('../public/data/persons.json'); 

  var remainingPersons = persons.filter(function(person){
    return person.id != id; //in lista finala trebuie sa ramana persoanele care au id diferit de id-ul pe care vrem sa il stergem
  });
  //functia filter returneaza un alt array

  var str = JSON.stringify(remainingPersons, null, 2);

  fs.writeFileSync('./public/data/persons.json', str); 

  res.json({
    success: true,
    message: 'Done'
  });
});

module.exports = router;
