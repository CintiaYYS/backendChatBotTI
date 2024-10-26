import ChamadoDAO from "../DB/ChamadoDAO.js";

export default class Chamado{
    #numero;
    #data;
    #usuario;
    #servicos;

    constructor(numero, data, usuario={"cpf":""}, servicos=[]) {
        this.#numero = numero;
        this.#data = data;
        this.#usuario = usuario;
        this.#servicos = servicos;
    }

    // Getters
    get numero() {
        return this.#numero;
    }

    get data() {
        return this.#data;
    }

    get usuario() {
        return this.#usuario;
    }

    get servicos() {
        return this.#servicos;
    }

    // Setters
    set numero(numero) {
        this.#numero = numero;
    }

    set data(data) {
        this.#data = data;
    }

    set usuario(usuario) {
        this.#usuario = usuario;
    }

    set servicos(servicos) {
        this.#servicos = servicos;
    }

    // Método toJSON
    toJSON() {
        return {
            numero: this.#numero,
            data: this.#data,
            usuario: this.#usuario,
            servicos: this.#servicos,
        };
    }

}

async function gravar() {
    const chamDAO = ChamadoDAO();
    await chamDAO.gravar(this);
}
