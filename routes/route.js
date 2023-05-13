var express = require('express');
const { PrismaClient } = require('@prisma/client');
var router = express.Router();
var prisma = new PrismaClient

/* GET users listing. */
router.get('/', async function(req, res, next) {
  var users = await prisma.users.findMany();
  res.render('userlist', {users: users});
  ``
  
});
// Insert user
router.get('/insertuser', async function(req, res, next) {
  res.render('userForm')
});
// save user
router.post('/saveuser', async function(req, res, next) {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    usertype: 'USER',
  }

  try {
    saveUser = await prisma.users.create({ 
      data: newUser
    })
  } catch (error) {
    console.log(error)
  } 
  
  res.redirect('/')
  
});

//update user
router.get('/edituser/:id', async function(req, res, next) {
  const id = req.params.id
  const user = await prisma.users.findFirst({
    where: {
            id: id
        }
      }
  )
  res.render('editForm',{user: user})
});
//update user
router.post('/updateuser', async function(req, res, next) {
  const id = req.body.id
  const user = {
    email: req.body.email,
    password: req.body.password,
    usertype: 'USER',
  }
  

  try {
    saveUser = await prisma.users.update({ 
      where:{id : id},
      data: user
    })
  } catch (error) {
    console.log(error)
  } 
  
  res.redirect('/')
  
});

router.get('/deleteuser/:id', async function(req, res, next) {
  const id = req.params.id
  
  try {
    deleteUser = await prisma.users.delete({ 
      where:{id : id
      },
    })
 //   message = deleteUser ? "user deleted" : "Error in Deletion" | undefined
  } catch (error) {
    console.log(error)
  } 
  
  res.redirect('/')
  
});
module.exports = router;
