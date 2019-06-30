const Router=require('koa-router');

let router=new Router();
router.get('/index.htm', async ctx => {
    ctx.body='最后测试了'
})
module.exports=router.routes();
