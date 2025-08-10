const mongoose=require('mongoose');


const mongo_url=process.env.mongo_con;

mongoose.connect(mongo_url)
.then(()=>{
console.log("sab connect ho gya h");
}).catch((err)=>{
console.log("ye error j", err);
})