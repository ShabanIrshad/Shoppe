const express=require('express');
const {account}=require('../controller/accountController');
const isLoggedIn=require('../middleware/isLoggedIn');

const router=express.Router();

router.get('/',isLoggedIn,account);

module.exports=router;