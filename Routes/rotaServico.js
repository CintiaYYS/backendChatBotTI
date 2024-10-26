import {Router} from "express";
import ServicoCtrl from "../Controller/ServicoCtrl.js";

const servCtrl = new ServicoCtrl();
const rotaServico = new Router();

rotaServico
.get("/",servCtrl.consultar)
.get("/:servico",servCtrl.consultar)
.post("/",servCtrl.gravar)
.put("/",servCtrl.alterar)
.patch("/",servCtrl.alterar)
.delete("/:id",servCtrl.excluir);

export default rotaServico;