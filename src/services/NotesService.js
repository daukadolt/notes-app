import Note from '../models/Note.model';

class NonexistentNote extends Error {}

export const Errors = {
    NonexistentNote,
}

const getAllNoteIdsByAuthor = async (author) => {
    const { id: UserId } = author;

    return (await Note.findAll({
        where: { UserId },
        attributes: ['id']
    }))
        .map((note) => note.id);
};

const getNoteById = async (id) => {
    return Note.findOne({
        where: { id }
    });
};

const createNewNote = async (author, text) => {
    const { id: UserId } = author;

    const newNote = Note.build({
        UserId,
        text,
    });

    await newNote.validate();
    await newNote.save();
};

const setText = async (noteId, author, text) => {
    const { id: UserId } = author;

    const note = await Note.findOne({
        where: {
            id: noteId,
            UserId,
        },
    });

    if (!note) {
        throw new NonexistentNote();
    }

    note.text = text;

    await note.save();
};

export default {
    getAllNoteIdsByAuthor,
    getNoteById,
    createNewNote,
    setText,
};
