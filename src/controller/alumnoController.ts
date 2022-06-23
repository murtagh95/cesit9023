import { IAlumno, Alumno } from './../models/Alumno';
import {Request, Response} from 'express';


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

class AlumnoController{

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

    async getById(req: Request, res: Response) {
        if (!req.params?.id) {
            return res.status(400).json({ message: "Se deber ingresar el id del alumno" })
        }
        const alumno = await Alumno.findById(req.params.id);
        if (!alumno) {
            return res.status(404).json({ message: `No se encuentra el alumno con id=${req.params.id}` })
        }
        res.json(alumno);
    }

    async bajaAlumno(req: Request, res: Response) {

        const {id} = req.params
        const alumno = await Alumno.findOneAndUpdate(
            {_id: id},
            {baja: true,fechaActualizacion: new Date},
            {new: true}
        );
        try {
            if (alumno){
                res.send(alumno);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async mandarAlumno(req: Request, res: Response){
        try {
            const nuevoAlumno = req.body as IAlumno;
            if (nuevoAlumno.nombre|| nuevoAlumno.apellido || nuevoAlumno.dni||nuevoAlumno.domicilio || nuevoAlumno.fechaNacimiento) {
                const alumno = new Alumno(nuevoAlumno);
                await alumno.save();


                return res.status(201).send(alumno);

            }
        } catch (error) {
            res.status(400).json({
                message: "Completar todos los datos"
            })
        }
    }

    async updateAlumno(req:Request, res:Response){

        let mensaje = []

        const alumnoActualizar = req.body as IAlumno;

        const alumno = await Alumno.findById(req.params.id);
        try {
            if(!alumno) {
                return res.send(404).send({message: `No se la tarea con id=${req.params.id}`});
            }
            else{

                if(!alumnoActualizar?.nombre) {
                    mensaje.push("falta el nombre")
                }

                if(!alumnoActualizar?.apellido ) {
                    mensaje.push("falta el apellido")
                }

                if(!alumnoActualizar?.dni ) {
                    mensaje.push("falta el dni")
                }

                if(!alumnoActualizar?.domicilio ) {
                    mensaje.push("falta el domicilio")
                }

                if(!alumnoActualizar?.fechaNacimiento) {
                    mensaje.push("falta la fecha de nacimiento")
                }
                if (mensaje.length>0){
                    res.json({mensaje})
                }
                else{
                    await Alumno.updateOne({_id: alumno._id }, alumnoActualizar);
                    res.json(alumnoActualizar);
                }

            }
        } catch (error){
            res.send(error)
        }
    }
}



export default AlumnoController;
