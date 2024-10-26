import express from 'express';
import rotaServico from './Routes/rotaServico.js';
import dotenv from 'dotenv';
import rotaDF from "./Routes/rotaDF.js";

//carrega as variáveis de ambiente
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/servico",rotaServico);
app.use("/webhook",rotaDF);
app.use(express.static('./publico'));

const host = "localhost";
const porta = "3000";

app.listen(porta,host,()=>{
    console.log(`Servidor escutando em http://${host}:${porta}`);
});