const { getSecret } = require('./getSecret');

const {
    SECRET_KEYS = '["secret_key_1"]',
    PORT = '3000',
    LOG_LEVEL = 'trace',
    KEEP_ALIVE_TIMEOUT = '5000',
} = process.env;

const secrets = getSecret('secret_keys') || SECRET_KEYS;

if (!secrets) {
    throw new Error('В переменных среды не указаны ключи');
}

/* Exporting the environment variables. */
module.exports = {
    envs: {
        SECRET_KEYS: JSON.parse(secrets),
        port: PORT,
        logLevel: LOG_LEVEL,
        keepAliveTimeout: parseInt(KEEP_ALIVE_TIMEOUT, 10),
    },
};
