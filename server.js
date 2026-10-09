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

    await redis.zAdd(LEADERBOARD_KEY, player, score);
    res.json({message:"score is updated", player})
    } catch(err){
        console.error(err)
        res.json({message:'something went wrong while updating the score'})
    }
})

app.post("/leaderboard/increment", async (req,res)=>{
    try{
    const {player, score} = req.body;

    if(!player || !score){
        return res.status(400).json({message:"player and score are required"})
    }

    await redis.zincrby(LEADERBOARD_KEY, player, score);
    res.json({message:"score is incremented", player})
    } catch(err){
        console.error(err)
        res.json({message:'something went wrong while incrementing the score'})
    }
})

app.get("/leaderboard/rank/:player", async (req,res)=>{
    try{
    const {player} = req.params;

    if(!player){
        return res.status(400).json({message:"player is required"})
    }

    const rank = await redis.zrevrank(LEADERBOARD_KEY, player);
    res.json({rank:rank + 1})
    } catch(err){
        console.error(err)
        res.json({message:'something went wrong while finding rank'})
    }
})

app.delete("/leaderboard/remove/:player", async (req,res)=>{
    try{
    const {player} = req.params;

    if(!player){
        return res.status(400).json({message:"player is required"})
    }

    const rank = await redis.zrem(LEADERBOARD_KEY, player);
    res.json({message:"player is removed"})
    } catch(err){
        console.error(err)
        res.json({message:'something went wrong while finding rank'})
    }
})

app.listen(3000);