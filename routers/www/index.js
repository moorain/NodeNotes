const Router=require('koa-router');

let router=new Router();
router.get('*', async ctx => {
    ctx.body='test'
})
module.exports=router.routes();
