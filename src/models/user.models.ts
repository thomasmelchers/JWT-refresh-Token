import mongosse, { Types } from 'mongoose';
import bcrypt from "bcrypt";
import config from "config";

export interface UserModelInterface extends Document {
    _id: Types.ObjectId,
    email: string,
    password: string,
    name: string,
    comparePassword(candidatePassword: string): Promise<Boolean>;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new mongosse.Schema({
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true,
    },
    name: {
        type: String, 
        required: true,
    },
},
{
    timestamps: true,
});

// HASHING PASSWORD: 
UserSchema.pre("save", async function (next) {
    let user = this;

    // WORKS IF THE PSWD HAS BEEN MODIFIED
    if (!user.isModified('password')){
        return next();
    }

    // IF THE PASSWORD HAS NOT BEEN MODIFIED : need to be salted and then hashed
    // Definition of the salting rounds => round are defined in the config file
    const saltFactor: number = config.get<number>('saltWorkFactor');
    const salt = await bcrypt.genSalt(12);

    // Hashing the password
    const hash = await bcrypt.hashSync(user.password, salt);
    
    // Replacing the password with the hashed pswd
    user.password = hash;
    
    return next();
});

// VERYFYING THE PASSWORD FOR AUTHENTICATION 
    UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    const user = this;

    // If the password is correct returning true, if not returning false
    return bcrypt.compare(candidatePassword, user.password).catch(e => false);
};

const UserModel = mongosse.model<UserModelInterface>('User', UserSchema);

export default UserModel;