import { Request, Response } from "express";
import { customerService } from "../services/userService";
import logger from "../utils/logger";

const getCustomer = async (req: Request, res: Response) => {
 try {
  const { id } = req.query as { id: string }
  if(id){
    const response = await customerService.viewCustomerById(id);
    if(!response){
      return res.status(404).json({
        success: false,
        message: "No user found" 
      })
    }
    return res.status(200).json({
      success: true,
      message: "User found",
      data : response
    })
  }else {
    const response = await customerService.viewCustomer();
    return res.status(200).json({
      success: true,
      message: "List of user found",
      data: response
    })
    }
  }catch (error) {
  logger.error("Error occured while retrieving customer ", error)
  return res.status(500).json({
    success: false,
    message: "Error occured while retrieving customer"
  })
 }
};

const getDetails = async (req: Request, res: Response) => {
  try {
   const userId = req.user?.id;
   if(userId){
     const response = await customerService.viewCustomerById(userId);
     if(!response){
       return res.status(404).json({
         success: false,
         message: "No user found" 
       })
     }
     return res.status(200).json({
       success: true,
       message: "User found",
       data : response
     })
   }
   }catch (error) {
   logger.error("Error occured while retrieving customer ", error)
   return res.status(500).json({
     success: false,
     message: "Error occured while retrieving customer"
   })
  }
 };

const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { name, email, role } = req.body;
    const response = await customerService.updateCustomer(req.params.id, {
      name,
      email,
      role,
    });
    if (!response) {
      logger.error("Invalid ID while updating Customer");
      return res.status(404).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      logger.info("Updating Customer was success.");
      return res.status(200).json({
        success: true,
        data: response,
      });
    }
  } catch (error) {
    logger.error("Error Occured while updating Customer ", error);
    return res.status(500).json({
      success: false,
    });
  }
};

const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const response = await customerService.deleteCustomer(req.params.id);
    if (!response) {
      logger.error("Invalid ID while deleting customer");
      return res.status(404).json({
        success: false,
        message: "Invalid ID",
      });
    }
    logger.info("Deleting a customer based on ID was success");
    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    logger.error("Error occured while deleting a custoomer ", error);
    return res.status(500).json({
      success: false,
      message: "ERROR in DeleteCustomer " + error,
    });
  }
};

export { getCustomer, getDetails, updateCustomer, deleteCustomer };