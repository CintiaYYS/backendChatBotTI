import {obterCardsServicos} from "../DialogFlow/funcoes.js"
import Chamado from "../Model/Chamado.js";
import Servico from "../Model/Servico.js";

export default class DFContoller{

    async processarIntencoes(req,resp){
        if (req.method=="POST" && req.is("application/json")){
            const dados = req.body;
            const intecao = dados.queryResult.intent.displayName;//extraindo o nome da intenção definida quando o agente foi treinado
            //identificar a origem da requisição (custom ou messenger)
            //verificar a existência do atributo source
            const origem = dados?.originalDetectIntentRequest?.source;
            let resposta;
            switch(intecao){
                case 'Default Welcome Intent':
                    resposta = await exibirMenu(origem);
                    break;

                case 'SelecaoSuporte':
                    resposta = await processarEscolha(dados,origem);                    
                    break;
                /*
                case 'coletaDadosDemandante':
                    resposta = await idenificarUsuario(dados,origem);
                    break;
                */
               case 'simConcluirDemanda':
                resposta = await registrarChamado(dados,origem);
                break;
            }
            resp.json(resposta);                    
        }
    }//fim prcessar intencoes

}

async function exibirMenu(tipo=''){
    let  resposta = {
        "fulfillmentMessages":[]
    };

    try{
        let cards = await obterCardsServicos(tipo);
        
        if (tipo == 'DIALOGFLOW_CONSOLE'){                            
            resposta['fulfillmentMessages'].push({
                "text":{
                    "text":["Seja bem-vindo ao Suporte de TI. \n",
                        "Estamos disponíveis 24h por dia e 7 dias na semana.\n",
                        "Estamos preparados para te ajudar com os seguintes serviços:\n"
                    ]
                }
            });
            resposta['fulfillmentMessages'].push(...cards);
            resposta['fulfillmentMessages'].push({
                "text":{
                    "text":["Por favor, nos informe o que você deseja."]
                }
            });
            return resposta;
        }
        else{
            //formato de resposta para o ambiente Messenger            
            resposta.fulfillmentMessages.push({
                "payload": {
                    "richContent": [[{
                        "type": "description",
                        "title": "Seja bem-vindo ao Suporte de TI. \n",
                        "text": [
                            "Estamos disponíveis 24h por dia e 7 dias na semana.\n",
                        "Estamos preparados para te ajudar com os seguintes serviços:\n"
                        ]
                    }]]
                }
            });
            //adicionando os cards de serviços
            resposta['fulfillmentMessages'][0]['payload']['richContent'][0].push(...cards);
            resposta['fulfillmentMessages'][0]['payload']['richContent'][0].push({
                "type": "description",
                "title": "Por favor, nos informe o que você deseja.",
                "text": []
            });
            return resposta;
        }
    }catch(erro){
    if(tipo == 'DIALOGFLOW_CONSOLE'){
        resposta['fulfillmentMessages'].push({
            "text":{
                "text":["Não foi possível recuperar a lista de suporte dos serviços.\n",
                    "Desculpe-nos pelo transtorno!\n",
                    "Entre em contato conosco por telefone (18) 1234-5678"
                ]
            }
        });
    }
    //formato de mensagem para messenger
    else{
        resposta.fulfillmentMessages.push({
            "payload": {
                "richContent": [[{
                    "type": "description",
                    "title": "Não foi possível recuperar a lista de suporte dos serviços.. \n",
                    "text": [
                        "Desculpe-nos pelo transtorno!.\n",
                        "Entre em contato conosco por telefone (18) 1234-5678\n"
                    ]
                }]]
            }
        });
    }
    return resposta;
    }
}

async function processarEscolha(dados, origem) { // Aplicar um try catch
    let resposta = {
        "fulfillmentMessages": []
    }

    const sessao = dados.session.split('/').pop();
    if (!global.dados) {
        global.dados = {};
    }

    if (!global.dados[sessao]) {
        global.dados[sessao] = {
            'servicos':[]
        }
    }

    let servicosSelecionados = dados.queryResult.parameters.Servico;
    global.dados[sessao]['servicos'].push(...servicosSelecionados);

    let listaMensagens = [];
    for (const serv of servicosSelecionados) {
        const servico = new Servico();
        const resultado = await servico.consultar(serv);

        if (resultado.length > 0) {
            listaMensagens.push(`${serv} registrado com sucesso! \n`);
        } else {
            listaMensagens.push(`Ò ${serv} não está disponível! \n`);
        }
    }

    listaMensagens.push('Posso de ajudar em algo mais?');

    if (origem) {
        resposta['fulfillmentMessages'].push({
            "text": {
                "text" :[...listaMensagens]
            }
        });
    } else {
        resposta.fulfillmentMessages.push({
            "payload": {
                "richContent": [[{
                    "type": "description",
                    "title": "",
                    "text": [...listaMensagens]
                }]]
            }
        });
    }
}

async function registrarChamado(dados, origem){
    const sessao = dados.session.split('/').pop();
    //Fique atento será necessário recuperar o usuário identificado na sessao
    //simulando a existência de um usuário cadastrado
    const usuario = {
        "cpf":"111.111.111-11"
    }
    const listaServicos = [];
    const servicosSelecionados = global.dados[sessao]['servicos'];
    const servicoM = new Servico();
    for (const serv of servicosSelecionados){
        const busca = await servicoM.consultar(serv);
        if (busca.length > 0){
            listaServicos.push(busca[0]);
        }
    }
    const chamado = new Chamado(0,'',usuario,listaServicos);
    await chamado.gravar();

    let resposta = {
        "fulfillmentMessages": []
    }

    if (origem) {
        resposta['fulfillmentMessages'].push({
            "text": {
                "text" :[`Chamado nº ${chamado.numero} registrado com sucesso.\n`,
                    "Anote seu número para consulta ou acompanhamento posterior."
                ]
            }
        });
    } else {
        resposta.fulfillmentMessages.push({
            "payload": {
                "richContent": [[{
                    "type": "description",
                    "title": "",
                    "text": [`Chamado nº ${chamado.numero} registrado com sucesso.\n`,
                    "Anote seu número para consulta ou acompanhamento posterior."]
                }]]
            }
        });
    }
    return resposta;
}