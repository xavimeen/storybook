const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    googleId: {
        type: String,
        require: true,
        unique: true
    },
    displayName: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('User', UserSchema);