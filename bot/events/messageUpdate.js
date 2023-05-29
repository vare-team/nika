import messageInviteChecker from '../utils/messageInviteChecker.js';

export default async function (oldMessage, newMessage) {
	await messageInviteChecker(newMessage);
}
