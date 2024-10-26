import {obterCardsServicos} from "../DialogFlow/funcoes.js"
export default class DFContoller{

    processarIntencoes(req,resp){
        if (req.method=="POST" && req.is("application/json")){
            const dados = req.body;
            const intecao = dados.queryResult.intent.displayName;//extraindo o nome da intenção definida quando o agente foi treinado
            //identificar a origem da requisição (custom ou messenger)
            //verificar a existência do atributo source
            const origem = dados?.originalDetectIntentRequest?.source;
            switch(intecao){
                case 'Default Welcome Intent':
                    const resposta = exibirMenu(tipo=origem);
                    resp.json(resposta);
                    break;
            }
        }
    }//fim prcessar intencoes

    exibirMenu(tipo='custom'){
        let  resposta = {
            "fulfillmentMessages":[]
        };

        try{
            let cards = obterCardsServicos(tipo);
            
            if (tipo == 'custom'){                            
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
        if(tipo == 'custom'){
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
}