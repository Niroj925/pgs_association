import UserController from "../controller/userController.js";
import { Router } from "express";

const userController=new UserController();

const router=Router();

router.post('/setusr',userController.setUser);
router.get('/getusr',userController.getUser);

// router.post('/setcontact',userController.setContact);
router.get('/getcontact',userController.getContact);

router.post('/ct',userController.createTweets);

router.post('/follow',userController.followUser);
router.post('/unfollow',userController.unfollowUser);

export default router;