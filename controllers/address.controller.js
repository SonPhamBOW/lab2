const Customer = require("../models/customer");

// Action: get all addresses

exports.getAllAddress = async (req, res, next) => {
  try {
    const customer = await Customer.find({});

    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
    }
    const addresses = customer.map((customer) => customer.address);
    res
      .status(200)
      .json({ message: "Get all address successful", result: addresses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Action: get address by id
exports.getAddressById = async (req, res, next) => {
    const { id } = req.params;
    if(!id){
        return res.status(404).json({
            message: "User not found"
        });
    }
    try {
        const foundCustomer = await Customer.findById(id);
        
        if (!foundCustomer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }
        
        res.status(200).json({
            message: "Get all address from user successfully",
            result: foundCustomer.address
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Action: create new address by id
exports.createAddressById = async (req, res, next) => {
    const { id } = req.params;
    if(!id){
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
    try {
        const foundCustomer = await Customer.findById(id);
        const {street, city, state, country, zipCode} = req.body;
        if (!foundCustomer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }
        const newAddress = {
            street,
            city,
            state,
            country,
            zipCode
        };
        await Customer.findByIdAndUpdate(id, {
            $push: {
                address: newAddress
            }
        });
        res.status(200).json({
            message: "Create new address successfully",
            result: newAddress
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Update address by id
exports.updateAddressById = async (req, res, next) => {
    const { id, addressId } = req.params;
    if (!id) {
        return res.status(404).json({
            message: "User not found"
        });
    }  
    try {
        const foundCustomer = await Customer.findById(id);
        if (!foundCustomer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }
        const addressUp = foundCustomer.address.id(addressId);
        if (!addressUp) {
            return res.status(404).json({
                message: "Address not found"
            });
        }

        
        const updateFields = {};
        const { street, city, state, country, zipCode } = req.body;
        
        if (street) updateFields["address.$.street"] = street;
        if (city) updateFields["address.$.city"] = city;
        if (state) updateFields["address.$.state"] = state;
        if (country) updateFields["address.$.country"] = country;
        if (zipCode) updateFields["address.$.zipCode"] = zipCode;

      
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({
                message: "No fields to update"
            });
        }

      
        await Customer.updateOne(
            { _id: id, "address._id": addressId },
            {
                $set: updateFields
            }
        );

     
        const updatedCustomer = await Customer.findById(id);
        const updatedAddress = updatedCustomer.address.id(addressId);

        res.status(200).json({
            message: "Update address successfully",
            result: updatedAddress
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete address by id
exports.deleteAddressById = async (req, res, next) => {
    const { id, addressId } = req.params;

    // Kiểm tra xem id có được cung cấp không
    if (!id) {
        return res.status(404).json({
            message: "Customer not found"
        });
    }

    try {
        // Tìm khách hàng theo id
        const foundCustomer = await Customer.findById(id);
        if (!foundCustomer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        // Tìm địa chỉ theo addressId trong mảng address
        const addressToDelete = foundCustomer.address.id(addressId);
        if (!addressToDelete) {
            return res.status(404).json({
                message: "Address not found"
            });
        }

        // Xóa địa chỉ khỏi mảng address
        foundCustomer.address.pull(addressId);

        // Lưu thay đổi vào cơ sở dữ liệu
        await foundCustomer.save();

        // Trả về phản hồi thành công
        res.status(200).json({
            message: "Delete address successfully"
        });
    } catch (error) {
        // Xử lý lỗi nếu có
        res.status(500).json({
            message: error.message
        });
    }
};

// son ngu