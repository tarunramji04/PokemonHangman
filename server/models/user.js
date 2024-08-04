import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        guessedPokemon: {
            type: [Number]
        }
    },
    {timestamps: true}
);

userSchema.methods.generateHash = async function(password) {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt);
};
  
userSchema.methods.checkPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

export const User = mongoose.model('User', userSchema);
