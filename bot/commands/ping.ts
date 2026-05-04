import { Message } from 'discord.js';

export const name = 'ping';
export const execute = async (message: Message) => {
  const sent = await message.reply('Pinging...');
  const latency = sent.createdTimestamp - message.createdTimestamp;
  await sent.edit(`Pong! Latency is ${latency}ms. API Latency is ${message.client.ws.ping}ms.`);
};
