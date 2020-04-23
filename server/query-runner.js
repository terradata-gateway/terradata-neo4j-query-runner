const amqp = require('amqplib/callback_api');
const Log = require('../lib/logger');
const constants = require('../lib/constants');
const neo4j = require('neo4j-driver');

Log.info(`${constants.NEO4J_URI}  ${constants.NEO4J_USER}  ${constants.NEO4J_PASSWORD}`);

const driver = neo4j.driver(constants.NEO4J_URI, neo4j.auth.basic(constants.NEO4J_USER, constants.NEO4J_PASSWORD))

class QueryRunner {
    constructor(host) {
        this.host = host;
    }

    listen(queue) {
        Log.info(`query.runner.server.listen ${queue}`);
        amqp.connect(this.host, (error0, connection) => {
            if (error0) {
                Log.error(`query.runner.server.listen.connect.error ${error0}`);
                throw error0;
            }
            connection.createChannel((error1, channel) => {
                if (error1) {
                    Log.error(`query.runner.server.channel.error ${error1}`);
                    throw error1;
                }

                channel.assertQueue(queue, {
                    durable: false
                });

                Log.info(`query.runner.server.channel.listen.queue ${queue}`);

                channel.consume(queue, (message) => {
                    Log.info(`query.runner.server.consume.queue ${queue}`);
                    Log.info(`query.runner.server.consume.queue.message ${message.content.toString()}`);

                    const data = JSON.parse(message.content).data;
                    this.query(data);

                }, {
                    noAck: true
                });
            });
        });
    }

    async query(data) {

        const session = driver.session();
        try {
            const result = await session.run(data.query);

            result.records.forEach(record => {
                Log.info(JSON.stringify(record));              
            });
        } catch (err) {
            console.log(err);
        }         
        finally {
            await session.close()
        }
    }

    async close() {
        await driver.close();
    }

}

module.exports = QueryRunner;