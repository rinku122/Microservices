import * as amqp from "amqplib/callback_api";
import QueService from "../queServices/que.service";
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
    const { MAKE_A_POST, INCREASE_USER_COUNT } = RabbitMqContants;
    this.assertQue(MAKE_A_POST);
    this.consumeQue(MAKE_A_POST);
    this.assertQue(INCREASE_USER_COUNT);
  }

  private consumeQue(que: string) {
    const { MAKE_A_POST } = RabbitMqContants;
    this.channel.consume(
      que,
      async (msg: any) => {
        const data = JSON.parse(msg.content.toString());
        console.log(`Consume::${que} => ${JSON.stringify(data)}`);

        switch (que) {
          case MAKE_A_POST:
            QueService.consumePostQue(data);
            this.channel.ack(msg);
            break;
        }
      },
      { noAck: false }
    );
  }

  public createQue(que: string, data: any) {
    data = JSON.stringify(data);
    this.channel.sendToQueue(que, Buffer.from(data));
    console.log(`Creating::${que} => ${JSON.stringify(data)}`);
  }

  public assertQue(que: string) {
    this.channel.assertQueue(que);
  }
}

export default new RabbitMq();
