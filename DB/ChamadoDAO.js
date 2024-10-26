import Chamado from "../Model/Chamado.js";
import conectar from "./Conexao.js";

export default class ChamadoDAO{
    async init(){
        try{
            const conexao = conectar();
            const sql = `CREATE TABLE IF NOT EXISTS chamado(
                            numero INT NT NULL PRIMARY KEY AUTO_INCREMENT,
                            data VARCHAR(10) NOT NULL,
                            fk_usu_cpf VARCHAR(14) NOT NULL,
                            servicos VARCHAR(250) NOT NULL,
                            contraint fk_usuario foreign key (fk_usu_cpf) references usuario(pk_usu_cpf)
            );
            `
        }catch(erro){

        }
    }
    async gravar(chamado){

        if (chamado instanceof Chamado){
            try{
            const conexao = await conectar();
            conexao.beginTransaction();

            //inserir o chamado na tabela
            const sqlChamado = "insert into chamado(data,fk_usu_cpf) values(?,?);"
            const data = new Date();
            let parametros = [data.toLocaleDateString(),chamado.usuario.cpf]
            conexao.execute(sqlChamado,parametros);
            chamado.numero = resultado[0].insertId;
            for (const serv of chamado.servicos){
                const sqlServicos = "insert into chamado_servico(fk_cha_numero,fk_serv_id VALUES(?,?);"
                parametros = [chamado.numero, serv.id];
                conexao.execute(sqlServicos,parametros);
            }
            conexao.commit();
        }catch(erro){
            //voltando o banco a instância anterior pois não foi possível finalizar a operação de forma completa
            conexao.rollback();
        }
            conexao.release();
        }
    }
}