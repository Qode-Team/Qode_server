const { Router } = require('express');
const router = Router();

const authRouter = require('./auth');
const boardRouter = require('./board');
const boardCommentRouter = require('./comment/board');
const answerCommentRouter = require('./comment/answer');
const searchRouter = require('./search');
const answerRouter = require('./answer');
const likeRouter = require('./likes');

router.use('/auth', authRouter);
router.use('/boards', boardRouter);
router.use('/comments/answers', answerCommentRouter);
router.use('/comments/boards', boardCommentRouter);
router.use('/answers', answerRouter);
router.use('/search', searchRouter);
router.use('/likes', likeRouter);

//테스트 코드

router.get('/test', async(req,res,next)=>{
    const { query } = req.query;
    try{
        const temp = query.match(/%[^\s%]*/g)
        const result = temp.map(tag => console.log(tag.slice(1)))
        console.log(`result : ${result}`);
        res.send('ok');
    }catch(e){
        console.error(e);
        next(e);
    }
})

module.exports = router;