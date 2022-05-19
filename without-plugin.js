const pg = require('pg');
const fastify = require('fastify')({ logger: true });

const pool = new pg.Pool({
    user: 'postgres',
    password: 'postgres',
    port: 5432,
    host: 'localhost',
});

fastify.addHook('onClose', async () => {
    await pool.end();
});

fastify.post('/', async () => {
    const data = await pool.query('select now()');
    // const result = JSON.stringify(data.rows);

    return { hello: 'world' } || data;
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
