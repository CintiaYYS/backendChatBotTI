import express from 'express'
import rotaServico from './Routes/rotaServico.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/servico",rotaServico);

const host = "localhost";
const porta = "3000";

app.listen(porta,host,()=>{
    console.log(`Servidor escutando em http://${host}:${porta}`);
});