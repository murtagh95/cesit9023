import {Request, Response} from "express";
import {Alumno, IAlumno} from "../models/Alumno";


function get_nombre(parametro: string) {
    return {nombre: {$regex: new RegExp(parametro, 'i')}};
}

function get_apellido(parametro: string) {
    return {apellido: {$regex: new RegExp(parametro, 'i')}};
}

function get_dni(parametro: string) {
    return {dni: {$regex: new RegExp(parametro, 'i')}};
}

function get_domicilio(parametro: string) {
    return {domicilio: {$regex: new RegExp(parametro, 'i')}};
}

function get_busquedaTotal(parametro: string) {
    const criterioRegEx = new RegExp(parametro, 'i');
    return [
        {nombre: {$regex: criterioRegEx}},
        {apellido: {$regex: criterioRegEx}},
        {dni: {$regex: criterioRegEx}},
        {domicilio: {$regex: criterioRegEx}},
    ];
}

class GetAlumnoController {

    async getTasks(request: Request, response: Response) {
        let alumnos: IAlumno[] = [];

        if (Object.keys(request.query).length != 0) {
            const posiblesBusquedas: any = {
                domicilio: get_domicilio,
                dni: get_dni,
                apellido: get_apellido,
                nombre: get_nombre,
                busqueda: get_busquedaTotal
            }

            const criterioDeBusqueda = []
            for (const [key, value] of Object.entries(request.query)) {
                if(posiblesBusquedas[key] !== undefined){
                    if (key === "busqueda"){
                        criterioDeBusqueda.push(...(posiblesBusquedas[key](value)));
                    }else {
                        criterioDeBusqueda.push(posiblesBusquedas[key](value));
                    }
                }
            }

            let parametrosFiltro: any = { $or: criterioDeBusqueda };
            if (!!request.query.fechaNacimiento){
                const fechaNacimiento: string = request.query.fechaNacimiento.toString()
                const fechaFinal = fechaNacimiento.substring(0,8).concat(String(Number(fechaNacimiento.substring(8)) + 1));

                var regExp = /(\d){4}-([0-1]{1}\d{1})-([0-3]{1}\d{1})/.test(fechaNacimiento);
                if(regExp){
                    if(criterioDeBusqueda.length){

                        parametrosFiltro = {
                            $or: criterioDeBusqueda ,
                            $and: [
                                {fechaNacimiento: {$gte: new Date(fechaNacimiento)}},
                                {fechaNacimiento: {$lt: new Date(fechaFinal)}}
                            ]
                        };
                    }
                    else{
                        parametrosFiltro = {
                            $and: [
                                {fechaNacimiento: {$gte: new Date(fechaNacimiento)}},
                                {fechaNacimiento: {$lt: new Date(fechaFinal)}}
                            ]
                        };
                    }
                }else {
                    return response.status(400).send({message: "fechaNacimiento incorrecta"});
                }
            }

            alumnos = await Alumno.find(parametrosFiltro);
            return response.send(alumnos);
        }

        alumnos = await Alumno.find();

        return response.send(alumnos);
    }

}

export default GetAlumnoController;
