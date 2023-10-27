import express from 'express';
import { registerUser } from '../controllers/signupController.js';
import { UserDetails } from '../controllers/loginController.js';
import { createInjuredDetail } from '../controllers/injuriyDetailsController.js';
import { getInjuredDetail } from '../controllers/injuriyDetailsController.js';
import { deleteInjuredDetail } from '../controllers/injuriyDetailsController.js';
import { updateInjuredDetail } from '../controllers/injuriyDetailsController.js';
import { forgotPassword } from '../controllers/forgetPassword.js';
import { resetPassword } from '../controllers/forgetPassword.js';
import { updatePassword } from '../controllers/forgetPassword.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(UserDetails);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:id/:token').get(resetPassword);
router.route('/updatePassword/:id/:token').post(updatePassword);
router.route('/injuriyForm').post(createInjuredDetail);
router.route('/injuriedDetails').get(getInjuredDetail);
router.route('/deleteData/:_id').delete(deleteInjuredDetail);
router.route('/updateData/:_id').put(updateInjuredDetail);


export default router;
