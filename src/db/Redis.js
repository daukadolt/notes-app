import Redis from 'ioredis';

import Config from '../Config';

const connectionInstance = new Redis({
    host: Config.REDIS_HOST,
    port: Config.REDIS_PORT,
});

export default connectionInstance;
