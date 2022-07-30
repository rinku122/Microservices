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
    const { INCREASE_USER_COUNT } = RabbitMqContants;
    this.consumeQue(INCREASE_USER_COUNT);
  }

  private async consumeQue(que: string) {
    const { INCREASE_USER_COUNT } = RabbitMqContants;
    this.channel.consume(
      que,
      async (msg: any) => {
        const data = JSON.parse(msg.content.toString());

        let { email, count } = data;
        count = Number(count);
        console.log(data);
        console.log(`Consume::${que} => ${JSON.stringify(data)}`);

        switch (que) {
          case INCREASE_USER_COUNT:
            QueService.consumePostQue(email, count);
            this.channel.ack(msg);
            break;
        }
      },
      { noAck: false }
    );
  }
}

export default new RabbitMq();
