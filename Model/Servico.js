import ServicoDAO from "../DB/ServicoDAO.js"

export default class Servico{
    #id
    #nome
    #descricao
    #valor
    #urlImagem
    //SLA
    #tempoInicioAtendimento
    #tempoSolucao

    constructor(id=0,nome,descricao,valor=0,urlImagem="",tempoInicioAtendimento=4,tempoSolucao=24){
        this.#id = id;
        this.#nome = nome;
        this.#descricao = descricao;
        this.#valor = valor;
        this.#urlImagem = urlImagem;
        this.#tempoInicioAtendimento = tempoInicioAtendimento;
        this.tempoSolucao = tempoSolucao;
    }

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

    async gravar(){
        const servDAO = new ServicoDAO();
        await servDAO.gravar(this);
    }

    async alterar(){
        const servDAO = new ServicoDAO();
        await servDAO.alterar(this);
    }

    async excluir(){
        const servDAO = new ServicoDAO();
        await servDAO.excluir(this);
    }

    async consultar(){
        const servDAO = new ServicoDAO();
        return await servDAO.consultar(this);
    }

}