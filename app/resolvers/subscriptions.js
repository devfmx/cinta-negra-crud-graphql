const { NEW_POSTS } = require("../constants/channels");

const newPosts = {
    subscribe: (parent, args, { pubsub }) => {
        return pubsub.asyncIterator(NEW_POSTS)
    }
};

module.exports = {
    newPosts
}