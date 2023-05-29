//import { models } from './index.js';
//const { User, Guild, Payment, Comment, Report, ShortLink, Tag, TagForGuild } = models;

export default function () {
	/*User.hasMany(Guild, { foreignKey: { name: 'userId', allowNull: false }, as: 'guilds' });
	Guild.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false }, as: 'owner' });

	/!* COMMENTS *!/
	User.hasMany(Comment, { foreignKey: { name: 'userId', allowNull: false }, as: 'comments' });
	Comment.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false }, as: 'user' });

	Guild.hasMany(Comment, { foreignKey: { name: 'guildId', allowNull: true }, as: 'comments' });
	Comment.belongsTo(Guild, { foreignKey: { name: 'guildId', allowNull: true }, as: 'guild' });

	Comment.hasMany(Comment, { foreignKey: { name: 'parentId', allowNull: true }, as: 'comments' });
	Comment.belongsTo(Comment, { foreignKey: { name: 'parentId', allowNull: true }, as: 'parentComment' });
	/!* COMMENTS *!/

	/!* TAGS *!/
	Guild.belongsToMany(Tag, { through: TagForGuild, foreignKey: { name: 'guildId', allowNull: false }, as: 'tags' });
	Tag.belongsToMany(Guild, { through: TagForGuild, foreignKey: { name: 'tagId', allowNull: false }, as: 'guilds' });

	Guild.hasMany(TagForGuild, { foreignKey: { name: 'guildId', allowNull: false }, as: 'tagsForGuilds' });
	TagForGuild.belongsTo(Guild, { foreignKey: { name: 'guildId', allowNull: false }, as: 'guild' });

	Tag.hasMany(TagForGuild, { foreignKey: { name: 'tagId', allowNull: false }, as: 'tagsForGuilds' });
	TagForGuild.belongsTo(Tag, { foreignKey: { name: 'tagId', allowNull: false }, as: 'tag' });
	/!* TAGS *!/

	Guild.hasOne(ShortLink, { foreignKey: { name: 'guildId', allowNull: true }, as: 'shortLink' });
	ShortLink.belongsTo(Guild, { foreignKey: { name: 'guildId', allowNull: true }, as: 'guild' });

	/!* REPORTS *!/
	User.hasMany(Report, { foreignKey: { name: 'userId', allowNull: false }, as: 'reports' });
	Report.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false }, as: 'user' });

	Guild.hasMany(Report, { foreignKey: { name: 'guildId', allowNull: false }, as: 'reports' });
	Report.belongsTo(Guild, { foreignKey: { name: 'guildId', allowNull: false }, as: 'guild' });

	Comment.hasMany(Report, { foreignKey: { name: 'commentId', allowNull: true }, as: 'reports' });
	Report.belongsTo(Comment, { foreignKey: { name: 'commentId', allowNull: true }, as: 'comment' });
	/!* REPORTS *!/

	Guild.hasMany(Payment, { foreignKey: { name: 'guildId', allowNull: false }, as: 'payments' });
	Payment.belongsTo(Guild, { foreignKey: { name: 'guildId', allowNull: false }, as: 'guild' });*/
}
