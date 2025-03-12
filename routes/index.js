    import { Router } from "express";
    import {userSignup,userLogin,verifyOTP} from '../controllers/auth.controller.js'
    import {createOrUpdateUserProfile,getUserProfile,deleteUserProfile} from '../controllers/formDetails.controller.js'
    import auth from '../middleware/auth.js'
    import upload from '../middleware/multer.js'
    const router = Router();

    router.post('/signup',userSignup);
    router.post('/verified',verifyOTP)
    router.post('/login',userLogin)

    router.post(
        "/formdetails/:userId",
        upload.fields([{ name: "logo", maxCount: 1 }, { name: "banner", maxCount: 5 }]),
        createOrUpdateUserProfile
    );
    
    // ✅ Get Profile by userId
    router.get("/formdetails/:userId",getUserProfile);
    
    // ✅ Delete Profile
    router.delete("/:userId",auth, deleteUserProfile);
    export default router;