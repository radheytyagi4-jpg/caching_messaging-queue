import express from 'express';
import {emailQueue, postQueue} from './queue.js';

const app = express();

app.use(express.json());

app.post("/welcome-emails", async (req, res)=>{
    const job = emailQueue.add(
        "send-welcome-email",
        {
            to:req.body.to,
            name:req.body.name,
            timeStamp: new Date.now().toISOString()
        },
        {
            attempts:3,
            backoff:{
                type:"exponential",
                delay:3000
            }
        }
    )
    res.json({message:"welcome email added", jobId: job.id});
})

app.post("/welcome-posts", async (req,res)=>{
    postQueue.add(
        "posts",
        {
            tittle:req.body.tittle,
            auther:req.body.auther,
            description:req.body.description
        },
        {
            attempts:2,
            backoff:{
                type:'exponential',
                delay:3000
            }
        }
    )
    res.json({message:"post email added", jobId: job.id})
});

app.listen(3000);