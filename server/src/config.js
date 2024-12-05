import dotenv from 'dotenv';

dotenv.config();

export const config = {
    app: {
        port: 4000
    },
    mysql: { 
        host:'mysqldb', 
        user:'root',
        password:'myshoppingapp',
        database: 'tienda',
        port: 3306
    }
};
