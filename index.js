import Redis from 'ioredis'
import express from 'express'

const app = express();

app.use(express.json());

const redis = new Redis('redis://localhost:6379');

function otpKey(phone){
    return `otp : ${phone}`
}

app.post('/otp', async (req, res)=>{
    const {phone} = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    await redis.set(otpKey(phone), otp, 'EX', 30)

    res.json({
        "otp":otp
    })
});

app.post("/otp/verify", async (req,res)=>{
    const {phone, otp} = req.body;

    const savedOtp = await redis.get(otpKey(phone));

    if(!savedOtp) res.json({message:'otp not found'})

    if(savedOtp !== otp) res.json({message:'otp not verified'})

      await redis.del(otpKey(phone)); // one-time use
  res.json({ message: "otp verified" });
})

app.get('/otp/:phone/ttl', async (req,res)=>{
    const ttl = await redis.ttl(req.params.phone);
    res.json({ttl})
})

app.listen(3000)