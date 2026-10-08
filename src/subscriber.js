import Redis from 'ioredis';

const subscriber = new Redis("redis://localhost:6379");

subscriber.subscribe("notifications", (err)=>{
    if(err){
        console.log("faild to subscribe : ", err.message)
        return;
    }
    console.log("Subscribe complete")

    subscriber.on("message", (channel, message)=>{
        console.log(`recived message from channel ${channel} : `, JSON.parse(message))
    })
}); 