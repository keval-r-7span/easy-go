const { trueResponse, falseResponseError } = require("../configs/responseMes");
const customerService = require("../services/userService");

const getCustomer = async (req, res) => {
  try {
    const response = await customerService.viewCustomer();
    return trueResponse(res, response);
  } catch (error) {
    return falseResponseError(res, error);
  }
};

const getCustomerByID = async (req, res) => {
    try {
        const response = await customerService.viewCustomerById(req.params.id)
        return res.status(200).json({
            success: true,
            data: response,
            message: "Successfully found"
        })
    } catch (error) {
        return res.status().json({
            success: false,
            message: "Something went wrong in finding by ID " +error
        })
    }
}

const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phoneNumber, role } = req.body;
    const response = await customerService.updateCustomer(
      { _id: id },
      { name, email, phoneNumber, role }
    );
    return trueResponse(res, response);
  } catch (error) {
    return falseResponseError(res, error);
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const response = await customerService.deleteCustomer(req.params.id);
    return trueResponse(res, response);
  } catch (error) {
    return falseResponseError(res, error);
  }
};



module.exports = {
  deleteCustomer,
  updateCustomer,
  getCustomer,
  getCustomerByID,
};
