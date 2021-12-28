const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

//go to specific functions or logic in our controller
// such as view, create, find, edit, delete.
router.get('/', userController.view);

//router.get('/login', userController.login);
//router.post('/login', userController.loginauth);

//Leave Management
router.get('/leavemgmt', userController.viewempleave);
router.get('/leavemgmt/leaveentry', userController.selectempl);
router.get('/leavemgmt/leavesummary', userController.leavesummary);

router.get('/jocontri', userController.jocontri);
router.get('/jocontri/contribentry', userController.jocontribentry);
router.get('/jocontri/contribsummary', userController.jocontrisumm);

// for search users
router.post('/', userController.search);

// route for render add user page
router.get('/adduser', userController.renderusers);

// route for add user
router.post('/adduser', userController.adduser);
// route for add leave
router.post('/leavemgmt', userController.addleave);
// route for add contribution
router.post('/jocontri', userController.addcontribution);

//routes for edit user
router.get('/edituser/:id', userController.edituser);
router.post('/edituser/:id', userController.updateuser);

// for delete user
router.get('/:id', userController.deleteuser);

// for view individual user
router.get('/viewuser/:id', userController.viewuser);


//Router
//router.get('', (req, res) => {
    //res.render('home');
//});

module.exports = router;