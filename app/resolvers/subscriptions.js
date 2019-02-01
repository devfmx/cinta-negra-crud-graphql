const { GENERAL_CHAT } = require("../utils/channels");

const newComment = {
    subscribe: (parent, args, { pubsub }) => {
        return pubsub.asyncIterator(GENERAL_CHAT)
    }
};

module.exports = {
    newComment
}