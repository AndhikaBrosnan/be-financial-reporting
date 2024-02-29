const CreateSchema = require("./user-create-schema");
const UpdateSchema = require("./user-update-schema");
const UserService = require("#services/user");
const Bcrypt = require("#helpers/Bcrypt");
const Nanoid = require("#helpers/Nanoid");

module.exports = class Controller {
  static async create(req, res) {
    const { body } = req;
    req.sanitize(CreateSchema, body);

    // Set placeholder password for ldap login
    if (body.isLdap === true) {
      body.password = Bcrypt.hash(Nanoid.get(15));
    }

    // Hash password
    if (body.password) {
      body.password = Bcrypt.hash(body.password);
    }
    const created = await UserService.create(body);

    return res.serializePost({
      userId: created.id,
    });
  }

  static async list(req, res) {
    const { query } = req;
    const { data: users, totalData, totalPage } = await UserService.list(query);

    return res.serialize({
      users,
      totalData,
      totalPage,
    });
  }

  static async findById(req, res) {
    const { params } = req;
    const { userId } = params;
    const user = await UserService.findById(userId);

    return res.serialize({
      user,
    });
  }

  static async update(req, res) {
    const { params, body } = req;
    const { userId } = params;
    req.sanitize(UpdateSchema, body);

    // Hash password
    if (body.password) {
      body.password = Bcrypt.hash(body.password);
    }
    await UserService.update(userId, body);

    return res.serialize({
      userId,
    });
  }

  static async delete(req, res) {
    const { params } = req;
    const { userId } = params;
    await UserService.delete(userId);

    return res.serialize({
      userId,
    });
  }
};
