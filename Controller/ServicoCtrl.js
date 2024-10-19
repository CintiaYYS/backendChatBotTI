import Servico from "../Model/Servico.js";
export default class ServicoCtrl{
    //Traduzir comando http em ações negociais
    //Conceito REST
    //Considerar o protocolo HTTP

    gravar(requisicao, resposta){
        if (requisicao.method = "POST" && requisicao.is("application/json")){
            const dados = requisicao.body;
            //Pseudo validação
            if(dados.nome && dados.descricao && dados.valor>=0 && dados.urlImagem && 
                dados.tempoInicioAtendimento>0 && dados.tempoSolucao>0){
                    const servico = new Servico(0,dados.nome, dados.descricao,dados.valor,
                        dados.urlImagem,dados.tempoInicioAtendimento,dados.tempoSolucao);
                    
                    servico.gravar().then(()=>{                                        
                        resposta.status(201).json({
                                    "status":true,
                                    "mensagem":"Serviço gravado com sucesso!",
                                    "id":servico.id
                        });
                    }).catch((erro)=>{                        
                        resposta.status(500).json({
                                "status":false,
                                "mensagem":"Erro ao registrar o serviço!"+erro.message
                        })
                    })
            }
            else{
                resposta.status(400).json({
                    "status":false,
                    "mensagem":"Formato não permitido!"
                })
            }
        }
    }

    alterar(requisicao, resposta){
    }

    excluir(requisicao, resposta){
    }

    consultar(requisicao, resposta){
    }
}