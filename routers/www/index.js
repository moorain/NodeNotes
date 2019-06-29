const Router=require('koa-router');

let router=new Router();
router.get('/index.html', async ctx => {
    ctx.body='test1'
})
module.exports=router.routes();
