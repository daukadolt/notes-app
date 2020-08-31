import db from '../../db/Sequelize';

const Note = db.Note;
const SharedID = db.SharedID;

class NonexistentSharedIDError extends Error {}

export const Errors = {
    NonexistentSharedIDError,
};

const createNoteSharedID = async (noteId) => {
    const newSharedID = SharedID.build({
        NoteId: noteId,
    });

    await newSharedID.validate();
    await newSharedID.save();

    return newSharedID.id;
};

const getNoteTextBySharedID = async (id) => {
    const sharedIDRecord = await SharedID.findOne({
        where: {
            id,
        },
    });

    if (!sharedIDRecord) {
        throw new NonexistentSharedIDError();
    }

    const noteId = sharedIDRecord.NoteId;

    const note = await Note.findOne({
        where: {
            id: noteId,
        },
    });

    return note.text;
};

export default {
    createNoteSharedID,
    getNoteTextBySharedID,
};
