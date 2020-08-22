/* eslint lines-between-class-members: ["error", "never"] */

export default class Config {
    static DB_HOST = 'localhost';
    static DB_USERNAME = 'postgres';
    static DB_PASSWORD = 'supersecret';
    static DB_NAME = 'notes-app';
    static EXPRESS_PORT = 8080;
    static BCRYPT_SALT = 10;
    static JWT_SECRET = 'super-secret-secret';
    static REDIS_HOST = 'localhost';
    static REDIS_PORT = 6379;
}
