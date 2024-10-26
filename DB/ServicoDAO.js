import Servico from "../Model/Servico.js";
import conectar from "./Conexao.js";

export default class ServicoDAO{

    constructor(){
        this.init();
    }

    async init(){
        try{
        //Criar a tabela serviço caso ela não exista
        const sql = `CREATE TABLE IF NOT EXISTS servico(
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            nome VARCHAR(100) NOT NULL,
            descricao VARCHAR(200) NOT NULL,
            valor DECIMAL(6,2) NOT NULL,
            urlImagem VARCHAR(250) NOT NULL,
            tempoInicioAtendimento INT NOT NULL,
            tempoSolucao INT NOT NULL
        )`
        const conexao = await conectar();
        await conexao.execute(sql);
        console.log("Tabela Serviço iniciada com sucesso!");
        }catch(erro){
            console.log("Não foi possível iniciar a tabela Serviço: "+erro.message);
        }
    }

    async gravar(servico){
        if (servico instanceof Servico){
            const sql = `INSERT INTO   servico(nome,descricao,valor,
                                                urlImagem,tempoInicioAtendimento,
                                                tempoSolucao)
                            VALUES(?,?,?,?,?,?)`;
            
            const parametros=[servico.nome,
                              servico.descricao,
                              servico.valor,
                              servico.urlImagem,
                              servico.tempoInicioAtendimento,
                              servico.tempoSolucao];

            const conexao = await conectar();      
            const resultado = await conexao.execute(sql,parametros)          
            servico.id = resultado[0].insertId;  
        }
    }

    async alterar(servico){
        if (servico instanceof Servico){
            const sql = `UPDATE SET servico(nome = ? , descricao = ? , valor = ? ,
                                                urlImagem = ? , tempoInicioAtendimento = ? ,
                                                tempoSolucao = ?
                                    WHERE id = ?)`;
            
            const parametros=[servico.nome,
                              servico.descricao,
                              servico.valor,
                              servico.tempoInicioAtendimento,
                              servico.tempoSolucao,
                              servico.id];

            const conexao = await conectar();      
            const resultado = await conexao.execute(sql,parametros)                      
        }
    }

    async excluir(servico){
        if (servico instanceof Servico){
            const sql = `DELETE FROM servico WHERE id = ?)`;
            
            const parametros=[servico.id];

            const conexao = await conectar();      
            const resultado = await conexao.execute(sql,parametros)                      
        }
    }

    async consultar(termoBusca){
        if(!termoBusca){
            termoBusca='';
        }
        const sql = `SELECT * FROM servico WHERE descricao LIKE ? order by nome`;
        const parametros = ["%"+termoBusca+"%"]
        const conexao = await conectar();
        const [registros, campos] = await conexao.query(sql,parametros);
        let listaServicos=[];
        for (const registro of registros){
            const servico = new Servico(registro['id'], registro['nome'], registro['descricao'],registro['valor'], registro['urlImagem'],registro['tempoInicioAtendimento'],registro['tempoSolucao']);
            listaServicos.push(servico);
        }
        return listaServicos;
    }

}