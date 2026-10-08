import express from 'express'
import Redis from 'ioredis'
import dotenv from 'dotenv'

dotenv.config();

const app = express();
app.use(express.json());

const redis = new Redis("redis://localhost:6379");

const LEADERBOARD_KEY = "leaderboard:PUBG"

app.put("/leaderboard/update", async (req,res)=>{
    try{
    const {player, score} = req.body;

    if(!player || !score){
        return res.status(400).json({message:"player and score are required"})
    }

    await redis.zadd(LEADERBOARD_KEY, player, score);
    res.json({message:"score is updated", player})
    } catch(err){
        console.error(err)
        res.json({message:'something went wrong while updating the score'})
    }
})

app.listen(3000);