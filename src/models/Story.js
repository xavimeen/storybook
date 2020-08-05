const {Schema, model} = require('mongoose');

const StorySchema = new Schema({
    title: {
        type: String,
        require: true,
        trim: true
    },
    body: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Story', StorySchema);