import { Message, EmbedBuilder } from 'discord.js';
import { GoogleGenAI } from '@google/genai';

export const name = 'h';
export const execute = async (message: Message, args: string[]) => {
  const amount = args[0];
  const timer = args[1];

  if (!amount) {
    return message.reply('<:crozz:1488082460138012823> Usage: .h <amount> [timer]');
  }

  // Very basic verification of permission
  if (!message.member?.permissions.has('ManageMessages')) {
    return message.reply('<:crozz:1488082460138012823> You do not have permission to run this command.');
  }

  let aiDescription = "HEIST TIME! Join the heist quickly and let's rob them blind!";
  if (process.env.GEMINI_API_KEY) {
     const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
     try {
       const response = await ai.models.generateContent({
         model: 'gemini-2.5-flash',
         contents: `Write a short 2-3 sentence hype announcement for a Dank Memer discord heist in ALL CAPS.`,
       });
       if (response.text) {
         aiDescription = response.text;
       }
     } catch (err) {}
  }

  const embed = new EmbedBuilder()
    .setTitle('<:Crown_2:1488092836409770106> HEIST INCOMING')
    .setDescription(aiDescription)
    .addFields(
      { name: '<:reason:1488092388479205449> Amount', value: amount, inline: true },
      { name: '<:user:1488091326133043304> Announced By', value: `${message.author}`, inline: true },
      { name: '<:messages:1488091555188441252> Join With', value: `plink / rob ${message.author}`, inline: false }
    )
    .setColor('#ffaa00')
    .setFooter({ text: `BotName • ${new Date().toISOString()}` });

  if (timer) {
      embed.addFields({ name: '<:loading_loading:1488092640129056819> Timer', value: timer, inline: true });
  }

  await message.reply({ embeds: [embed] });
};
