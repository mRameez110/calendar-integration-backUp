// models/User.js
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const GoogleAccountSchema = new mongoose.Schema({
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    name: { type: String },
    accessToken: { type: String, required: true },
    refreshToken: { type: String },
    expiresAt: { type: Date },
    isPrimary: { type: Boolean, default: false }
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
    isSystemUser: { type: Boolean, default: true },
    googleAccounts: [GoogleAccountSchema]
}, { timestamps: true });


UserSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};


UserSchema.pre('save', async function (next) {
    if (this.isNew) {
        const count = await mongoose.models.User.countDocuments();
        if (count >= 1) {
            throw new Error('Only one system user allowed');
        }
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);