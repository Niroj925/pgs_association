import {  DataTypes } from "sequelize";
import connection from '../config/connection.js';

const userModel=connection.define('user',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    firstName:{
        type:DataTypes.STRING,
        defaultValue:"Niroj"
    },
    lastName:{
        type:DataTypes.STRING,
        defaultValue:"Thapa"
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:true
})

const contactInfoModel=connection.define('contactInfo',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true      
    },
    phone:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    freezeTableName:true,
})

const tweetModel=connection.define('tweet',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    }

},{
    timestamps:true
}
)

//relations are hasOne, belongsTo,  hasMany, belongsToMany

//one to one association =>hasOne, belongTo

userModel.hasOne(contactInfoModel,{
    foreignKey:{
        types:DataTypes.UUID,
        allowNull:false
    }
});
contactInfoModel.belongsTo(userModel);

//one to many => hasMany belongTo
userModel.hasMany(tweetModel,{
    foreignKey:{
        types:DataTypes.UUID,
        allowNull:false
    }
});
tweetModel.belongsTo(userModel);

userModel.belongsToMany(userModel, { as: "Follower", foreignKey: "userId", through: "Follow", otherKey: "followedId" });
userModel.belongsToMany(userModel, { as: "Followed", foreignKey: "followedId", through: "Follow", otherKey: "userId" });


//many to many => hasmany
// Actor.belongsToMany(Movie,{through:"Act_Mov"});//Act_Mov is a join table or a junction between table
// Movie.belongsToMany(Actor,{through:"Act_Mov"});

// student.belongsToMany(course,{as:"student",foreignKey:"stuId",through:"enroll"}); 
// course.belongsToMany(student,{as:"course",foreignKey:"coursesId",through:"enroll"});

// userModel.belongsToMany(userModel,{as:"User", foreignKey:"userId", through:"Follow"});//alias as a User
// userModel.belongsToMany(userModel,{as:"Followed",foreignKey:"followedId",through:"Follow"});


export { userModel, contactInfoModel,tweetModel }  