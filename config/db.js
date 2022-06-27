/* eslint-disable no-undef */
const mysql = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'your_database_user',
        password: process.env.DB_PASSWORD || 'your_database_password',
        database: process.env.DB_NAME || 'myapp_test'
    },
    pool: { min: 0, max: 7 }
});

// Patrón Singleton

class Database {
    static instance;

    constructor () {
        if (Database.instance) {
            return instance;
        }

        Database.instance = mysql;
        const newLocal = this;
        newLocal.instance = Database.instance;
    }

    async createTables () {
        const tableName = 'users';
        try {
            await this.instance.schema.createTable(tableName, function (table) {
            // await mysql.schema.createTable(tableName, function (table) {
                table.increments();
                table.string('name');
                table.string('email');
                table.string('password');
                table.string('picture');
                table.boolean('google');
                table.timestamps();
            });
            console.log(`${tableName} created ok!`);
        } catch (err) {
            console.log(`${tableName} table already exists`);
        }
    }
}

module.exports = new Database();
