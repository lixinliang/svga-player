let marker = {};

module.exports = {
    start ( name ) {
        marker[name] = new Date;
    },
    end ( name ) {
        return new Date - marker[name];
    },
};
