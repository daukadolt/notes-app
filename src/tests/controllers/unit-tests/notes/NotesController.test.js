/* eslint-env node, jest */

import request from 'supertest';

import app from '../../../../App';
import sequelize from '../../../../db/Sequelize';
import initModels from '../../../../models/init';
import UserModel from '../../../../models/User.model';
import NoteModel from '../../../../models/Note/Note.model';

describe('NotesController tests', () => {
    const user = {
        username: 'notesOwner',
        password: 'somepassword',
    };

    let jwtToken;

    beforeAll(async () => {
        await sequelize.authenticate();
        await initModels(sequelize);

        const signupResponse = await request(app)
            .post('/api/auth/signup')
            .send(user);

        if (signupResponse.status !== 200) throw new Error();

        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(user);

        if (loginResponse.status !== 200) throw new Error();

        jwtToken = loginResponse.body;
    });

    afterAll(async () => {
        await UserModel.destroy({
            where: {},
            truncate: true,
        });
        await NoteModel.destroy({
            where: {},
            truncate: true,
        });
        await sequelize.close();
    });

    describe('get user\'s notes', () => {
        test('without jwt token', async () => {
            const response = await request(app)
                .get('/api/notes');

            expect(response.status).toBe(403);
        });

        describe('with jwt token', () => {
            test('no pre-existing notes', async () => {
                const response = await request(app)
                    .get('/api/notes')
                    .set('Authorization', `bearer ${jwtToken}`);

                expect(response.status).toBe(200);
                expect(response.body).toBeInstanceOf(Array);
                expect(response.body.length).toBe(0);
            });

            describe('create a new note', () => {
                test('valid payload', async () => {
                    const notePayload = {
                        text: 'hello, world!',
                    };

                    const response = await request(app)
                        .post('/api/notes')
                        .set('Authorization', `bearer ${jwtToken}`)
                        .send(notePayload);

                    expect(response.status).toBe(200);
                    expect(response.body).toHaveProperty('id');
                    expect(response.body).toHaveProperty('UserId');
                    expect(response.body).toHaveProperty('text');
                    expect(response.body).toHaveProperty('updatedAt');
                    expect(response.body).toHaveProperty('createdAt');
                });
                test('invalid payload', async () => {});
            });
        });
    });
});
