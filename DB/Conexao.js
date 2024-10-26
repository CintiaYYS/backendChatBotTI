import mysql from 'mysql2/promise';

export default async function conectar(){
    if (global.poolConexoes){
        return await global.poolConexoes.getConnection();
    }
    else{
        const pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER, 
            password:process.env.DB_PASSWORD,  
            database: process.env.DB_DATABASE,
            database: 'chatbot',
            connectionLimit: 50,
            maxIdle: 30, // max idle connections, the default value is the same as `connectionLimit`
            idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
          });

          global.poolConexoes = pool;
          return await global.poolConexoes.getConnection();
    }
}
