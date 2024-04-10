const ProductController=require("../controllers/ProductController");
const Auth = require("../utils/AuthMiddlewares");

const ProductRoutes=(base, app)=>{
    
    const controller = new ProductController();

    app.post(`${base}/`, Auth.isAuth, Auth.isAdmin, async(req,res,next)=>{
        try {
            const {title, description, category} = req.body;
            await controller.Create(title, description, category);
            return res.status(201).json({message: "exito al crear el producto"})
        } catch (error) {
            console.error("Error al crear un producto =>", error);
            return res.status(500).json({message:"ocurrio un error al intentar crear un producto"})
        }
    });

    app.get(`${base}/`, async(req,res)=>{
        try {
            const {filtro, busqueda}=req.query;
            console.log("Valor de la QUERY filtro: ", filtro);
            console.log("Valor de la QUERY busqueda: ", busqueda);
            const response = await controller.GetAllProducts(filtro, busqueda);
            return res.status(200).json(response)
        } catch (error) {
            console.error("Error al obtener todos los productos => ", error);
            return res.status(500).json({message: "Ocurrio un error al intentar obtener los productos"});
        }
    })
}

module.exports = ProductRoutes;