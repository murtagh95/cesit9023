import { Request, Response } from "express";
import { Materia, IMaterias } from "../models/Materia";

function getNombre(parametro: string) {
    return {nombre: {$regex: new RegExp(parametro, 'i')}};
};

function getProfesor(parametro: string) {
    return {profesor: {$regex: new RegExp(parametro, 'i')}};
};

function get_busquedaTotal(parametro:string) {
    const regex = new RegExp(parametro, 'i');
    return [
        {nombre: {$regex: regex}},
        {profesor: {$regex: regex}},
    ];
};

class GetMateriaController {

    async getMaterias(request: Request, response: Response) {
        let materias: IMaterias[] = [];

        if (Object.keys(request.query).length != 0) {
            const busquedas: any = {
                nombre: getNombre,
                profesor: getProfesor,
                busqueda: get_busquedaTotal
            }

            const criterioDeBusqueda = []
            for (const [key, value] of Object.entries(request.query)) {
                if(busquedas[key] !== undefined){
                    if (key === "busqueda"){
                        criterioDeBusqueda.push(...(busquedas[key](value)));
                    }else {
                        criterioDeBusqueda.push(busquedas[key](value));
                    }
                }
            }

        }
        materias = await Materia.find();

        return response.send(materias);
    }
     
    
}

export default GetMateriaController;