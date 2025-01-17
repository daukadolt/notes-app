/* eslint-env node, jest */

import request from 'supertest';

import app from '../../../App';
import db from '../../../db/Sequelize';

const sequelize = db.sequelize;

const UserModel = db.User;

describe('authController tests', () => {
    beforeAll(async () => {
        await sequelize.authenticate();
    });

    afterAll(async () => {
        const test = await UserModel.destroy({
            where: {},
            truncate: true,
        });
        console.log('destroy', test);
        await sequelize.close();
    });

    describe('signup tests', () => {
        test('valid payload', async () => {
            const newUser = {
                username: 'daulet',
                password: 'helloworld',
            };

            const response = await request(app)
                .post('/api/auth/signup')
                .send(newUser);

            expect(response.status).toBe(200);

            await UserModel.destroy({
                where: {
                    username: newUser.username,
                },
            });
        });
        test('missing username', async () => {
            const newUser = {
                password: 'helloworld',
            };

            const response = await request(app)
                .post('/api/auth/signup')
                .send(newUser);

            expect(response.status).toBe(400);
        });
        test('missing password', async () => {
            const newUser = {
                password: 'helloworld',
            };

            const response = await request(app)
                .post('/api/auth/signup')
                .send(newUser);

            expect(response.status).toBe(400);
        });
        test('empty payload', async () => {
            const newUser = {};

            const response = await request(app)
                .post('/api/auth/signup')
                .send(newUser);

            expect(response.status).toBe(400);
        });
    });
    describe('login tests', () => {
        test('existing user, valid credentials', async () => {
            const newUser = {
                username: 'daulet',
                password: 'helloworld',
            };

            const signUpResponse = await request(app)
                .post('/api/auth/signup')
                .send(newUser);

            expect(signUpResponse.status).toBe(200);

            const loginResponse = await request(app)
                .post('/api/auth/login')
                .send(newUser);

            expect(loginResponse.status).toBe(200);

            await UserModel.destroy({
                where: {
                    username: newUser.username,
                },
            });
        });
        test('invalid credentials', async () => {
            const newUser = {
                username: 'daulet',
                password: 'helloworld',
            };

            const loginResponse = await request(app)
                .post('/api/auth/login')
                .send(newUser);

            expect(loginResponse.status).toBe(404);
        });
        test('missing username', async () => {
            const newUser = {
                password: 'helloworld',
            };

            const loginResponse = await request(app)
                .post('/api/auth/login')
                .send(newUser);

            expect(loginResponse.status).toBe(400);
        });
        test('missing password', async () => {
            const newUser = {
                username: 'Daulet',
            };

            const loginResponse = await request(app)
                .post('/api/auth/login')
                .send(newUser);

            expect(loginResponse.status).toBe(400);
        });
        test('empty payload', async () => {
            const newUser = {};

            const loginResponse = await request(app)
                .post('/api/auth/login')
                .send(newUser);

            expect(loginResponse.status).toBe(400);
        });
    });
});
