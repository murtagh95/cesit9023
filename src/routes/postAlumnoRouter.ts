import  { Router } from"express"
import PostAlumnoController from "../controller/postAlumnoController"




const routerPostAlumno = Router()
const alumnoPostController = new PostAlumnoController()

routerPostAlumno.post("/", async (req, res) => {
    await alumnoPostController.mandarAlumno(req,res)
})

export default routerPostAlumno
