const Router = require('koa-router');
let router = new Router();
const SUCCESS_CODE = 10000
const ERROR_CODE = 10001

router.post('/share/add', async ctx => {
    let { url, title } = ctx.request.fields;
    console.log(ctx)
    if (url && title) {
        let datas = await ctx.db.query(`INSERT INTO share (url, title) VALUES (?,?)`, [url, title])
        if (datas) {
            ctx.body = {
                data: { id: datas.insertId, url: url, title: title },
                success: true,
                code: SUCCESS_CODE,
                msg: '新增成功！'
            };
        }else{
            ctx.body = {
                data: {},
                success: false,
                code: ERROR_CODE,
                msg: '操作失败！'
            };
        }
    }
});

router.get('/share/list', async ctx => {
        let datas = await ctx.db.query(`SELECT * FROM share WHERE isdel=?`, [1])
        if (datas) {
            ctx.body = {
                data: datas,
                success: true,
                code: SUCCESS_CODE,
                msg: '查询成功！'
            };
        }else{
            ctx.body = {
                data: {},
                success: false,
                code: ERROR_CODE,
                msg: '操作失败！'
            };
        }
});

module.exports = router.routes();
