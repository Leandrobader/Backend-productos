const UserController=require("../controllers/userController");

const UserRoutes=(base, app)=>{

    const controller = new UserController();
    app.post(`${base}/create`, async(req,res,next)=>{
        try {
            const {email, password, role} = req.body;
            await controller.CreateNewUser(email, password, role);
            return res.status(201).json({message: "Exito al crear el usuario"})
        } catch (error) {
            console.error("Error al crear un nuevo usuario-->", error);
            return res.status(500).json({message: "ocurrio un error al crear el usuario"})
        }
    })

    app.delete(`${base}/delete/:id`, async(req, res)=>{
        try {
            const id = req.params.id;
            const response = await controller.DeleteUserById(id);
            console.log("USUARIO ELIMINADO-->", JSON.stringify(response));
            return res.status(200).json({message: "exito al eliminar un usuario"})
        } catch (error) {
            console.error("Error al eliminar un usuario-->", error);
            return res.status(500).json({message:"ocurrio un error al intentar eliminar un usuario"});
        }
    })
}


module.exports=UserRoutes;