// set,get,hset,hgetall,lpush,rpop


// import Redis from 'ioredis'
// import express from 'express'

// const app = express();

// app.use(express.json());

// const redis = new Redis('redis://localhost:6379');

// function otpKey(phone){
//     return `otp : ${phone}`
// }

// app.post('/otp', async (req, res)=>{
//     const {phone} = req.body;
//     const otp = Math.floor(100000 + Math.random() * 900000).toString()

//     await redis.set(otpKey(phone), otp, 'EX', 30)

//     res.json({
//         "otp":otp
//     })
// });

// app.post("/otp/verify", async (req,res)=>{
//     const {phone, otp} = req.body;

//     const savedOtp = await redis.get(otpKey(phone));

//     if(!savedOtp) res.json({message:'otp not found'})

//     if(savedOtp !== otp) res.json({message:'otp not verified'})

//       await redis.del(otpKey(phone)); // one-time use
//   res.json({ message: "otp verified" });
// })

// app.get('/otp/:phone/ttl', async (req,res)=>{
//     const ttl = await redis.ttl(req.params.phone);
//     res.json({ttl})
// })

// app.listen(3000)





// import express from 'express'
// import Redis from 'ioredis'

// const app = express();
// app.use(express.json());

// const redis = new Redis("redis://localhost:6379");
// const QUEUE_KEY = 'queue:emails';

// app.post('/emails', async (req,res)=>{
//     const job = {
//         to:req.body.to,
//         subject:req.body.subject,
//         body:req.body.body,
//         createdAt: new Date().toISOString()
//     };
//     await redis.lpush(QUEUE_KEY, JSON.stringify(job));
//     res.json({queue:true, job});
// });

// app.get('/emails/proccess-one', async (req,res)=>{
//     const rawJob = await redis.rpop(QUEUE_KEY)
//     if(!rawJob) res.json({message:"no jobs are found in queue"});

//     const job = JSON.parse(rawJob);
//     res.json({message:"email sent", job})
// })

// app.listen(3000, ()=>{
//     console.log('running on 3000');
// })

