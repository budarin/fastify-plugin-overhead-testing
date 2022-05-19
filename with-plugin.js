const pgPlugin = require('./plugin');
const logger = require('./services/pinoLogger');
const fastify = require('fastify')({ logger: true });

fastify.register(pgPlugin);

fastify.register((instance, _, done) => {
    instance.route({
        method: 'POST',
        url: '/',
        handler: async (req, res) => {
            const data = await req.pgQuery('select now()');
            const result = JSON.stringify(data);
            return result;
        },
    });
    done();
});

const start = async () => {
    try {
        await fastify.listen(3000, '0.0.0.0');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
