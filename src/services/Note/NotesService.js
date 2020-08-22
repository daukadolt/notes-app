import Note from '../../models/Note/Note.model';

class NonexistentNoteError extends Error {}

export const Errors = {
    NonexistentNoteError,
}

const getAllNoteIdsByAuthor = async (author) => {
    const { id: UserId } = author;

    return (await Note.findAll({
        where: { UserId },
        attributes: ['id']
    }))
        .map((note) => note.id);
};

const getNoteByAuthorAndId = async (author, id) => {
    const { id: UserId } = author;

    return Note.findOne({
        where: {
            UserId,
            id,
        }
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
        throw new NonexistentNoteError();
    }

    note.text = text;

    await note.save();
};

const deleteNoteById = async (author, id) => {
    const { id: UserId } = author;

    return await Note.destroy({
        where: {
            UserId,
            id,
        },
    });
};

export default {
    getAllNoteIdsByAuthor,
    getNoteByAuthorAndId,
    createNewNote,
    setText,
    deleteNoteById,
};
