import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId:"kafka-app",
    brokers:["localhost:9092"]
});

async function run(){
    const producter = kafka.producer();
    const consumer = kafka.consumer({
        groupId:"my-group"
    });


    await consumer.connect();
    await consumer.subscribe({
        topic:"test-topic", fromBeginning:true
    });

    await consumer.run({
        eachMessage: async ({message})=>{
            console.log("Recived : ", message.value.toString())
        },

    });

    await producer.connect();
    await producer.send({
        topic:"test-topic",
        message:[{value:"Hello"}]
    });

    console.log("Message sent")
}

run().catch(console.error);