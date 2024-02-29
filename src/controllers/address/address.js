const AddressCreateSchema = require("./address-create-schema");
const AddressUpdateSchema = require("./address-update-schema");
const AddressService = require("#services/address");
const GeneralError = require("#errors/definitions/general-error");

module.exports = class Controller {
  static async create(req, res) {
    const { userId, body } = req;
    req.sanitize(AddressCreateSchema, body);

    await Controller._handleSelectedAddress(body.isSelected, userId);

    const created = await AddressService.create({
      userId,
      ...body,
    });

    return res.serialize(
      {
        mesage: "create address success",
        userId,
        addressId: created.id,
      },
      201
    );
  }

  static async list(req, res) {
    const { userId, query } = req;

    const { addresses, totalData, totalPage } = await AddressService.list(
      userId,
      query
    );

    return res.serialize({
      addresses,
      totalData,
      totalPage,
    });
  }

  static async findById(req, res) {
    const { userId, params } = req;
    const { addressId } = params;

    const address = await Controller._findById(addressId, userId);

    return res.serialize({ address });
  }

  static async update(req, res) {
    const { userId, params, body } = req;
    const { addressId } = params;
    req.sanitize(AddressUpdateSchema, body);

    const address = await Controller._findById(addressId, userId);

    await Controller._handleSelectedAddress(body.isSelected, userId);
    await AddressService.update(addressId, body);

    return res.serialize({
      mesage: "update address success",
      userId,
      addressId: address.id,
    });
  }

  static async delete(req, res) {
    const { userId, params } = req;
    const { addressId } = params;

    const address = await Controller._findById(addressId, userId);
    await AddressService.delete(addressId);

    return res.serialize({
      mesage: "delete address success",
      userId,
      addressId: address.id,
    });
  }

  // PRIVATE METHODS
  static async _findById(addressId, userId) {
    /**
     * find by id and verify if owned by authenticated user
     */
    const address = await AddressService.findById(addressId, userId);
    if (!address) throw GeneralError.addressNotFound();

    return address;
  }

  // NOTES: ini bisnis logic-nya jadi satu fungsi gitu kah ya?
  static async _handleSelectedAddress(isSelected, userId) {
    /**
     * handle if isSelected in body = true
     */
    if (isSelected) await AddressService.unselectAll(userId);
  }
};
