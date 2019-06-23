var mysql = require('mysql');
/* ฟังก์ชันสำหรับหา user ทั้งหมดในระบบ ในส่วนนี้ผมจะให้ส่งค่า users ทั้งหมดกลับไปเลย */
let con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

exports.createWaste = function(req,res) {
    let user_data_id = req.body.user_data_id;
    let weight = req.body.weight;
    let qrcode = req.body.qrcode;
    let location = req.body.location;
    let img_waste = req.body.img_waste;

    var sql = `INSERT INTO waste (user_data_id, weight, qrcode, location, img_waste) 
    VALUES ('${user_data_id}', '${weight}', '${qrcode}', '${location}', '${img_waste}')`;
    con.query(sql,function(err,result){
      
        res.json({ status: true });
     
    });
    con.end();
 }
 exports.getWaste = function(req,res) {
    // let usersid = req.body.usersid;

    var sql = `SELECT * FROM waste`;
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
 exports.updateWaste = function(req,res) {
    let waste_id = req.body.waste_id;
    let weight = req.body.weight;
    let qrcode = req.body.qrcode;
    let location = req.body.location;
    let img_waste = req.body.img_waste;
    let users_id = req.body.users_id;

    var sql = `UPDATE waste SET weight = '${weight}', qrcode = '${qrcode}', location= '${location}', img_waste = '${img_waste}', users_id = '${users_id}' WHERE (waste_id = '${waste_id}');
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
 exports.deleteWaste = function(req,res) {
    let waste_id = req.body.waste_id;
    

    var sql = `DELETE FROM waste WHERE (waste_id = '${waste_id}');`;
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



