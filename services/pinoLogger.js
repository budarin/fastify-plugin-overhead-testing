const pino = require('pino');

const { ip } = require('./getIP');
const { envs } = require('./getEnvs');
const isRunInContainer = require('./isRunInContainer');

const APP_VERSION = '1.0.0';
const __TEST__ = process.env['NODE_ENV'] === 'test';
const isNotProduction = process.env['NODE_ENV'] === 'production' || process.env['NODE_ENV'] == 'test';

const coreOptions =
    process.env['NODE_ENV'] === 'production'
        ? {
              level: envs.logLevel,
              redact: {
                  paths: isRunInContainer ? ['headers.cookie', "headers['set-cookie']", "headers['x-csrf']"] : [],
                  censor: '**Censored**',
              },
              base: {
                  instance: `${ip || 'unknown'}:${envs.port}`,
                  version: APP_VERSION,
              },
          }
        : {
              level: 'trace',
              extreme: true,
              transport: {
                  target: 'pino-pretty',
                  options: {
                      crlf: false,
                      colorize: true,
                  },
              },
          };

const formatters = {
    level(label) {
        return { level: label };
    },
};

const serializers = {
    res(res) {
        const { statusCode } = res;

        return {
            statusCode,
        };
    },

    req(req) {
        const { method, url, params } = req;

        const devQuery = Object.keys(req.query).length > 0 ? req.query : undefined;
        const query = process.env['NODE_ENV'] === 'production' ? undefined : devQuery;
        const parameters = process.env['NODE_ENV'] === 'production' ? params : undefined;

        return {
            method,
            route: url,
            query,
            parameters,
        };
    },
};

const options = {
    ...coreOptions,
    formatters,
    serializers,
};

/* Creating a logger instance with the options and the destination. */
const logger = pino(
    options,
    pino.destination({
        // dest: 1,
        minLength: isNotProduction ? 1 : 4096,
        sync: isNotProduction,
    }),
);

if (process.env['NODE_ENV'] === 'production') {
    setInterval(function () {
        logger.flush();
    }, 5000).unref();
}

module.exports = logger;
