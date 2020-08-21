import Note from '../models/Note.model';

const createNewNote = async (author, text) => {
    const { id: UserId } = author;

    const newNote = Note.build({
        UserId,
        text,
    });

    await newNote.validate();
    await newNote.save();
};

export default {
    createNewNote,
};
