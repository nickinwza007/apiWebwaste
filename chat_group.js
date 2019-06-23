var mysql = require('mysql');
/* ฟังก์ชันสำหรับหา user ทั้งหมดในระบบ ในส่วนนี้ผมจะให้ส่งค่า users ทั้งหมดกลับไปเลย */
let con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

exports.createchat_group = function(req,res) {
    let chatgroup_id = req.body.chatgroup_id;
    let users_id = req.body.users_id;
    

    var sql = `INSERT INTO chatgroup (chatgroup_id, users_id) 
    VALUES ('${chatgroup_id}', '${users_id}')`;
    con.query(sql,function(err,result){
      
        res.json({ status: true });
     
    });
    con.end();
 }
 exports.getchatgroup = function(req,res) {
    // let usersid = req.body.usersid;

    var sql = `SELECT * FROM chatgroup`;
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
 exports.updatechatgroup= function(req,res) {
    let chatgroup_id = req.body.chatgroup_id;
    let users_id = req.body.users_id;

    var sql = `UPDATE chatgroup SET users_id = '${users_id}',  WHERE (chatgroup_id = '${chatgroup_id}');
    `;
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
 exports.deletechatgroup = function(req,res) {
    let chatgroup_id = req.body.chatgroup_id;
    
    

    var sql = `DELETE FROM chatgroup WHERE (chatgroup_id = '${chatgroup_id}');`;
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



