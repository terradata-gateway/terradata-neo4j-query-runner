module.exports = Object.freeze({
    SERVER_NAME : process.env.SERVER_NAME || 'SERVER.1',
    MQ_HOST : process.env.MQ_HOST || 'amqp://localhost',
    EVENTS_QUEUE : (process.env.EVENTS_QUEUE || "TD.EVENTSTORE") + '.' + (process.env.SERVER_NAME || 'SERVER.1'),
    BROADCAST_QUEUE: (process.env.BROADCAST_QUEUE || "TD.BROADCAST") + '.' + (process.env.SERVER_NAME || 'SERVER.1'),
    NEO4J_URI : process.env.NEO4J_URI || '',
    NEO4J_USER : process.env.NEO4J_USER || '',
    NEO4J_PASSWORD : process.env.NEO4J_PASSWORD || ''
});
