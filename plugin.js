const pg = require('pg');
const fastifyPlugin = require('fastify-plugin');

const pgPlugin = (fastifyInstance, _, done) => {
    const pool = new pg.Pool({
        user: 'postgres',
        password: 'postgres',
        port: 5432,
        host: 'localhost',
    });

    fastifyInstance.addHook('onClose', async () => {
        await pool.end();
    });

    const pgQuery = async (query, params) => {
        const result = await pool.query(query, params);
        return result.rows;
    };

    fastifyInstance.decorateRequest('pgQuery', pgQuery);

    done();
};

module.exports = fastifyPlugin(pgPlugin, {
    fastify: '>3.0.0',
    name: pgPlugin.name,
});
