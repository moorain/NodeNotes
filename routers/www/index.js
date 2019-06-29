const Router=require('koa-router');

let router=new Router();
<<<<<<< HEAD
router.get('/index.htm', async ctx => {
    ctx.body='这是测试！'
=======
router.get('/index.html', async ctx => {
    ctx.body='test1'
>>>>>>> cf8b1c9db92eeb3f67c35b316a1c243698e0d4c4
})
module.exports=router.routes();
