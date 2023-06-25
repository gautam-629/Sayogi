import CommentModel from "../../models/Comments"

const  CommentsController={
     async create(req,res,next){
          try {
            const { content,serviceRequest,serSeeker}=req.body;
           const comments= await CommentModel.create({
                 content,
                 serviceRequest,
                 serSeeker
            })
            res.status(201).json({
                comments:comments
            })
          } catch (error) {
            return next(error);
          }
      }
}

export default CommentsController;