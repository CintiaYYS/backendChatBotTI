import { Router } from "express";
import DFContoller from '../Controller/DFCtrl.js'

const rotaDF = new Router();
const dfControl = new DFContoller();

rotaDF.post('/',processarIntecoes)

export default rotaDF;