var mysql = require('mysql');
/* ฟังก์ชันสำหรับหา user ทั้งหมดในระบบ ในส่วนนี้ผมจะให้ส่งค่า users ทั้งหมดกลับไปเลย */
let con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

exports.createPayment = function(req,res) {
    let payment_id = req.body.payment_id;
    let users_id = req.body.user_id;
    let out_balance = req.body.out_balance;
    let month_payments = req.body.month_payments;
    let total_payments = req.body.total_payments;

    var sql = `INSERT INTO waste (payment_id, users_id, out_balance, month_payments, img_waste) 
    VALUES ('${payment_id}', '${users_id}', '${out_balance}', '${month_payments}', '${total_payments}')`;
    con.query(sql,function(err,result){
      
        res.json({ status: true });
     
    });
    con.end();
 }
 exports.getPayment = function(req,res) {
    // let usersid = req.body.usersid;

    var sql = `SELECT * FROM payment`;
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
 exports.updatePayment = function(req,res) {
    let payment_id = req.body.payment_id;
    let users_id = req.body.user_id;
    let out_balance = req.body.out_balance;
    let month_payments = req.body.month_payments;
    let total_payments = req.body.total_payments;

    var sql = `UPDATE payment SET users_id ='${users_id}', out_balance = '${out_balance}', month_payments = '${month_payments}', total_payments= '${total_payments}' WHERE (payment_id = '${payment_id}')`;
    
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
    

    var sql = `DELETE FROM payment WHERE (payment_id = '${payment_id}');`;

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



