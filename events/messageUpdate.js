import messageInviteChecker from '../utils/messageInviteChecker';

export default async function (oldMessage, newMessage) {
	await messageInviteChecker(newMessage);
}
