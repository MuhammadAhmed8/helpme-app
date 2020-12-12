const  Post  = require("./postSchema");

class PostService{
    constructor(){}

    async createPost(creatorId,postDetails){

        const postRecord = await Post.create({
            
            creatorId: creatorId,
            ...postDetails

        })

        return postRecord;

    }

    async createComment(creatorId,content, postId){
        await Post.updateOne({_id: postId}, {
            $push: {
                comments: {
                    creatorId: creatorId,
                    content: content
                }
            }
        })

    }


}

module.exports = PostService;