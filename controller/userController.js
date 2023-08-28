import { userModel, contactInfoModel,tweetModel } from '../modal/userSchema.js';

export default class UserController{

    async setUser(req,res){
        const {firstName,lastName,email,phone}=req.body;
       try{
        const user=await userModel.create({
            firstName,
            lastName,
            email
        })
        if(user){
            
            const data=await contactInfoModel.create({
                phone,
               userId:user.id
            })
            res.status(200).json({user,data});
        }else{
            res.status(500).json({success:false})
        }
    }catch(err){
        res.status(500).json({err})
    }
    }

    async getUser(req,res){
     try{
        const data=await userModel.findAll();
        console.log(data)
        if(data){
            res.status(200).json({data});
        }else{
            res.status(500).json({success:false})
        }

     }catch(err){
        console.log(err)
     }
    }


    async getContact(req,res){
     try{
        const data=await contactInfoModel.findAll();
        console.log(data)
        if(data){
            res.status(200).json({data});
        }else{
            res.status(500).json({success:false})
        }

     }catch(err){
        console.log(err)
     }
    }

    async createTweets(req,res){
        const {title,description}=req.body;

        const user=await userModel.findOne();

        try{
            const data=await tweetModel.create({
                title,
                description,
                userId:user.id
            })
            if(data){
                res.status(200).json({data});
            }else{
                res.status(500).json({success:false});
            }

        }catch(err){
            console.log(err)
        }
    }



    async followUser(req, res) {
        const { followUserName } = req.body; 
    
        try {
            const currentUser = await userModel.findOne({ where: { firstName:"niroj" } });
            const userToFollow = await userModel.findOne({ where: { firstName: followUserName } });
            console.log(currentUser)
            console.log(userToFollow)
    
            if (!currentUser || !userToFollow) {
                return res.status(403).json({ message: "User not found" });
            }
    
            await currentUser.addFollowed(userToFollow); 
            const followers = await currentUser.getFollowed(); 
        
    
            res.status(200).json({ message: "Successfully followed",followers});
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: "An error occurred" });
        }
    }
    
    async unfollowUser(req, res) {
        const { unfollowUserName } = req.body; 
    
        try {
            const currentUser = await userModel.findOne({ where: { firstName:"niroj" } });
            const userToUnfollow = await userModel.findOne({ where: { firstName: unfollowUserName } });
    
            if (!currentUser || !userToUnfollow) {
                return res.status(404).json({ message: "User not found" });
            }
    
            await currentUser.removeFollowed(userToUnfollow);
            const followers = await currentUser.getFollowed();
    
            res.status(200).json({ message: "Successfully unfollowed", followers });
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: "An error occurred" });
        }
    }
    
    
}