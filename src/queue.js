import { Queue } from "bullmq";

const connection = {
    host:"localhost",
    port:6379
}

const emailQueue = new Queue("emails", {connection});
const postQueue = new Queue("posts", { connection });

module.exports = {
    connection,
    emailQueue,
    postQueue
}