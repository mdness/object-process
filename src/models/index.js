import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const user = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
});

user.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

user.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export const modelUser = model('userLocal', user);