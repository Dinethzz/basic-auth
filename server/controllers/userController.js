import UserModel from "../models/userModel";

export const getUserData = async (req, res) => {
    try{
        const {userId} = req.body;
        const user = await UserModel.findById(userId);
        if(!user){
            return res.json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, data: { name: user.name, isAccountVerified: user.isAccountVerified } });
    }
    catch(err){
        return res.json({ success: false, message: 'Server error' });
    }
}