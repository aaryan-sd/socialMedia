import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { deleteCommentForPost, getCommentsForPost, postComment } from "../controllers/comment.controller.js";

const router = Router();

router.route("/post-comment").post(verifyJWT, postComment)
router.route("/:postId").get(getCommentsForPost)
router.route("/:commentId").delete(verifyJWT, deleteCommentForPost)

export default router;