const pgPlugin = require('./plugin');
const fastify = require('fastify')({ logger: true });

fastify.register(pgPlugin);

fastify.post('/', async (req, res) => {
    const data = await req.pgQuery('select now()');
    const result = JSON.stringify(data);

    return result;
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
