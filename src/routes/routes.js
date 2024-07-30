const express=require("express");
const router=express.Router();

const UserController=require("../controllers/UserController");
const productOrderController=require("../controllers/productOrder-controller");
const mongooseToExcelController=require("../controllers/mongooseToExcelController");
const truckDetailsController=require("../controllers/truckDetails-controller");
const {userSignedIn}=require("../middlewares/LoginMiddleware");


router.post("/createAdmin",UserController.createNewAdminUser);
router.post("/createOperator",UserController.createNewOperatorUser);

router.post("/AdminLogin",UserController.AdminSignIn);
router.post("/OperatorLogin",UserController.OperatorSignIn);

router.post("/createOrderDetail",productOrderController.createOrder);
router.post("/createTruckDetail",truckDetailsController.createTruckDetails);

router.delete("/deleteOrderDetail",productOrderController.deleteOrder);
router.delete("/deleteTruckDetail",truckDetailsController.deleteTruckDetails)

router.patch("/updateOrderDetail",productOrderController.updateOrder);
router.patch("/updateTruckDetail",truckDetailsController.updateTruckDetails);

router.get("/oldestOrder",productOrderController.getOldestOrderByProductAndClient);

router.get("/downloadOrderDetails",mongooseToExcelController.downloadOrder);
router.get("/downloadTruckDetails",mongooseToExcelController.downloadTruck);

router.get("/getAllPendingOrders",productOrderController.getAllPendingOrders);
router.get("/getAllOrders",productOrderController.getAllOrders);
router.get("/getAllTruckDetails",truckDetailsController.getAllTruckDetails);

router.post("/TotalBalancedQuantity",productOrderController.OrderByProductAndClient);
router.post("/getTruckByDate",truckDetailsController.getTruckByDate);

router.put("/updateOperatorDetails",userSignedIn,UserController.updateOperatorDetails);
module.exports=router;

// \subsection{AI Image Generation Website {\normalfont $|$ \href{https://github.com/Shobhit-Agarwal-54/AI-Image-Generate-Website/tree/master}{\textit{GitHub Link}}} \hfill }
// \begin{itemize}
// \item Built a Full Stack MERN AI Image Generation Website.
// \item Calling Open AI's DALL-E Model API to generate images from text input.