const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require("validator")
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true,validate: [validator.isEmail, 'Please enter a valid email'], },
    password: { type: String, required: true,minlength: [6, 'Password must be at least 6 characters long'] },
    mobile: { type: String, required: true },
    role: { type: String, default: 'user' },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
