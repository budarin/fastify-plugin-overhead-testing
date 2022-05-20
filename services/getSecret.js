const fs = require('fs');

function getSecret(secret) {
    try {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        return fs.readFileSync(`/run/secrets/${secret}`, 'utf8').trim();
    } catch (e) {
        return false;
    }
}

module.exports = {
    getSecret,
};
