const express=require('express');
const router=express.Router();
const upload=require('../config/multer-config');
const {createAdmin,registerAdmin}=require('../controller/ownerController');
const {checkAdmin}=require('../middleware/ownerMiddleware');


router.post('/create',upload.single('avatar'),checkAdmin,registerAdmin)


router.get('/create',createAdmin);





module.exports=router;