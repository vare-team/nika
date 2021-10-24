export default function(admins, tier, ownerID, member) {
	if (admins.hasOwnProperty(member.id) && admins[member.id] == 0) return true;
	if (admins.hasOwnProperty(member.id) && tier > 0 && tier > admins[member.id]) return true;
	if (tier == -3 && (ownerID == member.id)) return true;
	if (tier == -2 && member.hasPermission('ADMINISTRATOR')) return true;
	return tier == -1 && member.hasPermission('MANAGE_MESSAGES');
};