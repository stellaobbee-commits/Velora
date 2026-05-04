import { Message, EmbedBuilder } from 'discord.js';
import { GoogleGenAI } from '@google/genai';

export const name = 'ai';
export const execute = async (message: Message, args: string[]) => {
  const prompt = args.join(' ');
  if (!prompt) {
    return message.reply('<:crozz:1488082460138012823> Please provide a prompt!');
  }

  if (!process.env.GEMINI_API_KEY) {
    return message.reply('<:crozz:1488082460138012823> AI system is not configured yet (missing API key).');
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const replyMessage = await message.reply('<:loading_loading:1488092640129056819> Generating response...');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a Discord bot assistant. Generate concise, server-friendly text. Maximum 3 sentences unless otherwise specified. Do not acknowledge you are AI-generated."
      }
    });

    const embed = new EmbedBuilder()
      .setTitle('<:Bot:1497916324838379632> AI Response')
      .setDescription(response.text || 'No response generated.')
      .addFields({ name: '<:user:1488091326133043304> Asked By', value: `${message.author}` })
      .setFooter({ text: `BotName • ${new Date().toISOString()}` })
      .setColor('#2b2d31');

    await replyMessage.edit({ content: '', embeds: [embed] });
  } catch (error) {
    console.error('AI Error:', error);
    await replyMessage.edit('<:crozz:1488082460138012823> An error occurred generating the response.');
  }
};
