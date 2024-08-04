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

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  };
  
userSchema.methods.checkPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

export const User = mongoose.model('User', userSchema);
