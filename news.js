var mysql = require('mysql');
/* ฟังก์ชันสำหรับหา user ทั้งหมดในระบบ ในส่วนนี้ผมจะให้ส่งค่า users ทั้งหมดกลับไปเลย */
let con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

exports.createNews = function(req,res) {
    let news_id= req.body.news_id;
    let title_news = req.body.title_news;
    let contant = req.body.contant;
    let img_news = req.body.img_news;
    let users_id = req.body.users_id;

    var sql = `INSERT INTO news (news_id, title_news, contant, img_news, users_id) 
    VALUES ('${news_id}', '${title_news}', '${contant}', '${img_news}', '${users_id}')`;
    con.query(sql,function(err,result){
      
        res.json({ status: true });
     
    });
    con.end();
 }
 exports.getNews = function(req,res) {
    // let usersid = req.body.usersid;

    var sql = `SELECT * FROM news`;
    con.query(sql,function(err,result){
        if (result[0]!=null){

            res.json({ ok: true, status: result });
        }
        else{
            res.json({ ok: false, status : "no good"});
        }
    });
    con.end();
 }
 exports.updateNews = function(req,res) {
    let news_id= req.body.news_id;
    let title_news = req.body.title_news;
    let contant = req.body.contant;
    let img_news = req.body.img_news;
    let users_id = req.body.users_id;

    var sql = `UPDATE news SET users_id ='${users_id}', title_news = '${title_news}', contant = '${contant}',  img_news = '${img_news}'  WHERE (news_id = '${news_id}')`;
    con.query(sql,function(err,result){
        if (result[0]!=null){

            res.json({ ok: true, status: list });
        }
        else{
            res.json({ ok: false, status : "no good"});
        }
    });
    con.end();
 }
 exports.deleteNews = function(req,res) {
    let news_id = req.body.news_id;
    

    var sql = `DELETE FROM news WHERE (news_id = '${news_id}');`;
    con.query(sql,function(err,result){
        if (result[0]!=null){

            res.json({ ok: true, status: list });
        }
        else{
            res.json({ ok: false, status : "no good"});
        }
    });
    con.end();
 }



