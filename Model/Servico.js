export default class Servico{
    #id
    #nome
    #descricao
    #valor
    #urlImagem
    //SLA
    #tempoInicioAtendimento
    #tempoSolucao

    get id(){
        return this.#id;
    }

    set id(novoId){
        this.#id = novoId;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        this.#nome = novoNome;
    }
    
    get descricao(){
        return this.#descricao;
    }

    set descricao(novoDescricao){
        this.#descricao = novoDescricao;
    }
    
    get valor(){
        return this.#valor;
    }

    set valor(novoValor){
        this.#valor = novoValor;
    }
    
    get urlImagem(){
        return this.#urlImagem;
    }

    set urlImagem(novoUrlImagem){
        this.#urlImagem = novoUrlImagem;
    }

    get tempoInicioAtendimento(){
        return this.#tempoInicioAtendimento;
    }

    set tempoInicioAtendimento(novoTempo){
        this.#tempoInicioAtendimento = novoTempo;
    }

    get tempoSolucao(){
        return this.#tempoSolucao;
    }

    set tempoSolucao(novoTempo){
        this.#tempoSolucao = novoTempo;
    }

    //overrride
    toJSON(){
        return{
            id:this.#id,
            nome:this.#nome,
            descricao:this.#descricao,
            valor:this.#valor,
            urlImagem:this.#urlImagem,
            tempoInicioAtendimento:this.#tempoInicioAtendimento,            
            tempoSolucao:this.#tempoSolucao
        }
    }

    async gravar(){}
    async alterar(){}
    async excluir(){}
    async consultar(){}

}