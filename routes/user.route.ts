import express from 'express';
import { activationUser, deleteUser, getAllUsers, getUserInfo, loginUser, logoutUser, registrationUser, socialAuth, updateUserAvatar, updateUserInfo, updateUserPassword, updateUserRole, updateUserToken, requestPasswordReset, verifyResetToken, resetPassword, googleLogin, requestEmailChange, verifyEmailChange } from '../controllers/user.controller';
import { isAuthenticated, validateUserRole } from '../middleware/auth';

const userRouter = express.Router();

userRouter.post('/registration', registrationUser);

userRouter.post('/activate-user', activationUser);

userRouter.post('/login', loginUser);

userRouter.post('/logout', isAuthenticated, logoutUser);

userRouter.get('/refresh', updateUserToken);

userRouter.get('/me', isAuthenticated, getUserInfo);

userRouter.post('/social-auth', socialAuth);

userRouter.put('/update-user-info', isAuthenticated, updateUserInfo);

userRouter.put('/update-user-password', isAuthenticated, updateUserPassword);

userRouter.put('/update-user-avatar', isAuthenticated, updateUserAvatar);

userRouter.get('/get-all-users', isAuthenticated, validateUserRole('admin'), getAllUsers);

userRouter.put('/update-user-role', isAuthenticated, validateUserRole('admin'), updateUserRole);

userRouter.delete('/delete-user/:id', isAuthenticated, validateUserRole('admin'), deleteUser);

userRouter.post('/request-password-reset', requestPasswordReset);

userRouter.get('/verify-reset-token/:token', verifyResetToken); // Token doğrulama route'u

userRouter.post('/reset-password', resetPassword);

userRouter.post("/google-login", googleLogin);

userRouter.post('/request-email-change', isAuthenticated, requestEmailChange);
userRouter.post('/verify-email-change', isAuthenticated, verifyEmailChange);

export default userRouter;
