import User, { init as initUserModel } from './User.model';
import Note, { init as initNoteModel } from './Note.model';

export default async (db) => {
    initNoteModel(db);
    initUserModel(db);

    User.hasMany(Note);
    Note.belongsTo(User);

    await db.sync({ force: true, alter: true });
};
