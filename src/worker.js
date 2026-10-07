import {Worker} from 'bullmq';
import {connection} from './queue.js'

const emailWorker = new Worker(
    "emails",
    async (job)=>{
        console.log("Processing email job", job.id, job.name, job.data);
        (await new Promise((resolve)=> setTimeout(resolve, 1500))),
        console.log("Email job completed", job.id, job.name, job.data);
    },
    {connection}
)

emailWorker.on("completed", (job)=>{
    console.log("job is completed", job.id, job.name, job.data);
});

emailWorker.on("failed", (job, err)=>{
    console.log("Job failed", job.id, job.name, job.data, err)
})

const postWorker = new Worker(
    "posts",
    async (job)=>{
        console.log("Processing post job", job.id, job.name, job.data);
        await new Promise((resolve)=> setTimeout(resolve, 2000));
        console.log("post job completed", job.id, job.name, job.data);
    },
    {connection}
)

postWorker.on("completed", (job)=>{
    console.log("job is completed", job.id, job.name, job.data)
});

postWorker.on("failed", (job, err)=>{
    console.log("failed to complete post job", job.id, job.name, job.data, err)
})