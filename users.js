var mysql = require('mysql');
/* ฟังก์ชันสำหรับหา user ทั้งหมดในระบบ ในส่วนนี้ผมจะให้ส่งค่า users ทั้งหมดกลับไปเลย */

const jwt = require("jwt-simple");

exports.login = function(req,res) {
    console.log(req)
    let username = req.body.username;
    let password = req.body.password;
    var con = connectDB();
    
    var sql = `SELECT * FROM users where usersname = '${username}' and password = '${password}'`; 
  
    con.query(sql,function(err,result){
        console.log(result);
        
        if(result.length>0){

            const payload = {
                sub: req.body.username,
                iat: new Date().getTime()//มาจากคำว่า issued at time (สร้างเมื่อ)
             };
             const SECRET = "KEY"; //ในการใช้งานจริง คีย์นี้ให้เก็บเป็นความลับ
             
             var token = jwt.encode(payload, SECRET);
             var sql = `UPDATE users SET token = '${token}' where usersname = '${username}' and password = '${password}'`;
             con.query(sql,function(err,result){
                res.json({ status: true,token:token });
             })
            
        }else{
            res.json({ status: false });
        }
        
     
    });
    con.end();


}

connectDB = function () {
    var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    return con;

}
