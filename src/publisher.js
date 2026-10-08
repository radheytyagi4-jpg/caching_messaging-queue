import express from 'express';
import Redis from 'ioredis'

const app = express();
app.use(express.json())

const publisher = new Redis("redis://localhost:6379")

app.post('notifications', async (req, res)=>{
    const payload = {
        tittle:req.body.tittle,
        createdAt: new Date().toISOString()
    }

    const reciver = await publisher.publish("notifications", JSON.stringify(payload))

    res.json({message:"notification sent to subscriber : " , reciver})
})

app.listen(3000)