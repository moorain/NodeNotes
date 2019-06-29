const Router=require('koa-router');

let router=new Router();
router.get('/index.htm', async ctx => {
    ctx.body='这是测试333！'
})
module.exports=router.routes();
