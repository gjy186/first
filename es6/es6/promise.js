//引入fs模块
const fs=require("fs");
//调用方法读取文件
// fs.readFile("../观书有感.md",(err,data)=>{
//     //如果失败,抛出错误
//     if(err) throw err;
//     //没有出错,则输出内容
//     console.log(data.toString());
// })
//3.使用promise封装
const p =new Promise(function(resolve,reject){
    fs.readFile("../观书有感.md",(err,data)=>{
        if(err) reject(err);
        resolve(data);
    })
})

