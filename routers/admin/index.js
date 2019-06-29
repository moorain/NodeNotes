const Router = require('koa-router');
const fs = require('await-fs');
const path = require('path');
const { md5 } = require('../../libs/common')
let router = new Router();

// const table = 'banner_table' //admin 要处理的表

function findAdmin(admins, username) {
  let a = null;
  admins.forEach(admin => {
    if (admin.username == username) a = admin
  });
  return a;
}

// router.get('/login', async ctx => {
//   await ctx.render('admin/login', {
//     HTTP_ROOT: ctx.config.HTTP_ROOT,
//     errmsg: ctx.query.errmsg
//   });
// });

router.post('/login', async ctx => {
  // const { HTTP_ROOT } = ctx.config
  let { username, password } = ctx.request.fields;
  let admins = JSON.parse((await fs.readFile(
    path.resolve(__dirname, '../../admins.json')
  )).toString());

  let admin = findAdmin(admins, username);
  if(admin &&admin.password == md5(ctx.config.ADMIN_PREFIX + password) ){
    ctx.session['admin'] = username; //设置session
    ctx.body = {
      code: 10000,
      success:true,
      msg: '登陆成功！'
    }
  }else{
    ctx.body = {
      code: 10002,
      success:false,
      msg: '用户名或密码错误！'
    }
  }
});

//校验 （在登陆接口之后）
router.all('*', async (ctx, next) => {
  const { HTTP_ROOT } = ctx.config
  if (ctx.session['admin']) {
    await next()
  } else {
    ctx.body({
      success:false,
      code:10004,
      msg:'当前用户未登陆！'
    })
  }
})

// router.post('/share/add', async ctx => {
//   let { url, title } = ctx.request.fields;
//   console.log(url,title)
//   // const { HTTP_ROOT } = ctx.config
//   // ctx.redirect(`${HTTP_ROOT}/admin/banner`)
// });


// INSERT INTO `share`(`url`, `title`) VALUES ("www.baidu.com","百度")

// router.get('/banner', async ctx => {
//   const { HTTP_ROOT } = ctx.config

//   let datas = await ctx.db.query(`SELECT * FROM ${table}`);
//   await ctx.render('admin/table', {
//     fields,
//     action: `${HTTP_ROOT}/admin/banner`,
//     type: 'view',
//     HTTP_ROOT,
//     datas,
//   })
// });

//接受提交
// router.post('/banner', async ctx => {
//   const { HTTP_ROOT } = ctx.config
//   let { title, src, href, serial } = ctx.request.fields;
//   src = path.basename(src[0].path);
//   await ctx.db.query(`INSERT INTO ${table} (title,src,href,serial) VALUES(?,?,?,?)`, [
//     title, src, href, serial
//   ])
//   // ctx.body = 'success'
//   ctx.redirect(`${HTTP_ROOT}/admin/banner`)
// });

//删除
// router.get('/banner/delete/:id/', async ctx => {
//   const { HTTP_ROOT, UPLOAD_DIR } = ctx.config
//   let { id } = ctx.params;
//   const data = await ctx.db.query(`SELECT * FROM ${table} WHERE ID=?`, [id]);
//   if (data.length == 0) {
//     ctx.body = 'nodata'
//   } else {
//     let row = data[0]
//     fs.unlink(path.resolve(UPLOAD_DIR, row.src))//删除文件用
//     await ctx.db.query(`DELETE FROM ${table} WHERE ID=?`, [id]);
//     ctx.redirect(`${HTTP_ROOT}/admin/banner`)
//   }
// });

//修改
// router.get('/banner/modify/:id/', async ctx => {
//   const { HTTP_ROOT, UPLOAD_DIR } = ctx.config
//   let { id } = ctx.params;
//   const data = await ctx.db.query(`SELECT * FROM ${table} WHERE ID=?`, [id]);
//   if (data.length == 0) {
//     ctx.body = 'nodata'
//   } else {
//     let row = data[0]
//     await ctx.render('admin/table', {
//       HTTP_ROOT,
//       type: 'modify',
//       fields,
//       old_data: row,
//       action: `${HTTP_ROOT}/admin/banner/modify/${id}`
//     })
//   }
// });
//修改
// router.post('/banner/modify/:id/', async ctx => {
//   ctx.body = '修改！！'
// });
module.exports = router.routes();
