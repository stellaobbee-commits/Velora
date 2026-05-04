import { Message, EmbedBuilder, PermissionFlagsBits } from 'discord.js';

export const name = 'ban';
export const execute = async (message: Message, args: string[]) => {
  if (!message.member?.permissions.has(PermissionFlagsBits.BanMembers)) {
    return message.reply('<:crozz:1488082460138012823> You do not have permission to ban members.');
  }

  const target = message.mentions.members?.first() || message.guild?.members.cache.get(args[0]);
  if (!target) {
    return message.reply('<:crozz:1488082460138012823> Please mention a user to ban.');
  }

  const reason = args.slice(1).join(' ') || 'No reason provided';

  if (!target.bannable) {
    return message.reply('<:crozz:1488082460138012823> I cannot ban this user. They might have a higher role than me.');
  }

  try {
    await target.user.send(`You have been banned from **${message.guild?.name}**\\nReason: ${reason}`);
  } catch (e) {
    // User might have DMs closed
  }

  try {
    await target.ban({ reason });
    
    // Simulate Case generation
    const caseId = Math.floor(Math.random() * 10000);

    const embed = new EmbedBuilder()
      .setTitle('<:ban_hammer:1488088939393978542> User Banned')
      .addFields(
        { name: '<:user:1488091326133043304> User', value: `${target.user.tag} (${target.id})`, inline: true },
        { name: '<:reason:1488092388479205449> Reason', value: reason, inline: true },
        { name: '<:Crown_2:1488092836409770106> Banned By', value: `${message.author}`, inline: false },
        { name: '<:settings:1488092262842761227> Case', value: `#${caseId}`, inline: true },
        { name: '<:loading_loading:1488092640129056819> When', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: true }
      )
      .setColor('#ff0000')
      .setFooter({ text: `BotName • ${new Date().toISOString()}` });

    await message.reply({ embeds: [embed] });
  } catch (err) {
    console.error(err);
    return message.reply('<:crozz:1488082460138012823> There was an error trying to ban that user.');
  }
};
