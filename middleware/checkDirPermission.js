export default function ({ store, route, redirect }) {
  const guildId = route.params.guild;
  const guilds = store.state.guilds;
  const guild = guilds.find(guild => guild.id === guildId);

  if (!guilds.length || !guild || !guild.hasPermission) {
    return redirect('/');
  }
}
