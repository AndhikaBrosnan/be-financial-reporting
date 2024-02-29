const CreateSchema = require("./ledger-create-schema");
const UpdateSchema = require("./ledger-update-schema");
const LedgerService = require("#services/ledger");

module.exports = class Controller {
  static async create(req, res) {
    const { body } = req;

    req.sanitize(CreateSchema, body);

    const created = await LedgerService.create(body);

    return res.serializePost({
      ledgerId: created.id,
    });
  }

  static async list(req, res) {
    const { query } = req;
    const {
      data: ledger,
      totalData,
      totalPage,
    } = await LedgerService.list(query);

    return res.serialize({
      ledger,
      totalData,
      totalPage,
    });
  }

  static async findById(req, res) {
    const { params } = req;
    const { ledgerId } = params;

    const ledger = await LedgerService.findById(ledgerId);

    return res.serialize({
      ledger,
    });
  }

  static async update(req, res) {
    const { params, body } = req;
    const { ledgerId } = params;
    req.sanitize(UpdateSchema, body);

    const updatedRespServ = await LedgerService.update(ledgerId, body);

    return res.serialize({
      ledgerId,
    });
  }

  static async delete(req, res) {
    const { params } = req;
    const { ledgerId } = params;
    await LedgerService.delete(ledgerId);

    return res.serialize({
      ledgerId,
    });
  }
};
