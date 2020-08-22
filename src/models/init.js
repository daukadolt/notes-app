import User, { init as initUserModel } from './User.model';
import Note, { init as initNoteModel } from './Note/Note.model';
import SharedNoteID, { init as initSharedNoteIDModel } from './Note/SharedID.model';

export default async (db) => {
    initNoteModel(db);
    initSharedNoteIDModel(db);
    initUserModel(db);

    Note.hasMany(SharedNoteID, { onDelete: 'CASCADE' });
    SharedNoteID.belongsTo(Note);

    User.hasMany(Note, { onDelete: 'CASCADE' });
    Note.belongsTo(User);

    await db.sync({ force: true, alter: true });
};
