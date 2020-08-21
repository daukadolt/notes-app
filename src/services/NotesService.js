import Note from '../models/Note.model';

class NonexistentNote extends Error {}

export const Errors = {
    NonexistentNote,
}

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
    createNewNote,
    setText,
};
