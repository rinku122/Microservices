import * as amqp from "amqplib/callback_api";
import QueService from "../queService/que.Service";
import { RabbitMqContants } from "./../constants";

class RabbitMq {
  public channel!: amqp.Channel;
  constructor() {
    this.connect();
  }

  public connect() {
    try {
      const rabbitMq: string = process.env.RabbitMq!;

      amqp.connect(rabbitMq, (error: Error, _conn: amqp.Connection) => {
        if (error) return error;

        _conn.createChannel((_error: Error, channel: amqp.Channel) => {
          if (_error) return _error;

          console.log("RabbiMq::Connected Successfully..!!");
          this.channel = channel;
          this.initQue();
        });
      });
    } catch (error) {
      console.log("RabbitMQ Failed to connect !!");
      return error;
    }
  }

  private async initQue() {
    const { INCREASE_USER_COUNT, ADD_IN_REDIS } = RabbitMqContants;
    this.assertQue(ADD_IN_REDIS);
    this.consumeQue(INCREASE_USER_COUNT);
    this.consumeQue(ADD_IN_REDIS);
  }

  private async consumeQue(que: string) {
    const { INCREASE_USER_COUNT, ADD_IN_REDIS } = RabbitMqContants;
    this.channel.consume(
      que,
      async (msg: any) => {
        const data = JSON.parse(msg.content.toString());

        console.log(`Consume::${que} => ${JSON.stringify(data)}`);

        switch (que) {
          case INCREASE_USER_COUNT:
            let { email, count } = data;
            count = Number(count);
            QueService.consumePostQue(email, count);
            this.channel.ack(msg);
            break;
          case ADD_IN_REDIS:
            QueService.consumeUserInRedisQue(data);
        }
      },
      { noAck: false }
    );
  }

  public async createQue(que: string, data: any) {
    data = JSON.stringify(data);
    this.channel.sendToQueue(que, Buffer.from(data));
    console.log("info", `Creating::${que} => ${JSON.stringify(data)}`);
  }

  public async assertQue(que: string) {
    this.channel.assertQueue(que);
  }
}

export default new RabbitMq();
