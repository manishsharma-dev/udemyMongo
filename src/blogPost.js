const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String,
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
})

const BlogPost = mongoose.model('blogPost', blogPostSchema);

module.exports = BlogPost