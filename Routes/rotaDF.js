import { Router } from "express";
import DFContoller from '../Controller/DFCtrl.js'

const rotaDF = new Router();
const dfControl = new DFContoller();

rotaDF.post('/',dfControl.processarIntencoes)

export default rotaDF;