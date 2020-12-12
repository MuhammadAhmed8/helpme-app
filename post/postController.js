const PostService = require("./postService");


exports.createPost = async (req,res,next) => {

    const postService = new PostService();
    
    try{
        let creatorId = req.body.creatorId;
        let postDetails = {
            title : req.body.title,
            content : req.body.content,
            images : req.body.images
        }
        const postRecord = await postService.createPost(creatorId,postDetails);

        res.status(200).json(postRecord);

    }
    catch(e){
        next(e);
    }

}  


exports.createComment = async (req,res,next) => {

    const postService = new PostService();

    try{
        
        let creatorId = req.body.creatorId;
        let content = req.body.content;
        let postId = req.body.postId;
        
        await postService.createComment(creatorId,content,postId);

        res.status(200).json({
            message: "Comment added to post " + postId
        });

    }
    catch(e){
        next(e);
    }

}