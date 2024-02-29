const { faker } = require("@faker-js/faker");
const Nanoid = require("#helpers/Nanoid");
const { serialize } = require("#helpers/Serializer");
const { sanitizeSchema } = require("#helpers/Sanitizer");

module.exports = class TestHelper {
  static async createUser(payload = [], amount = 1) {
    if (amount > 0) {
      amount.forEach((key) => {
        payload.push({
          id: Nanoid.get(15),
          email: faker.internet.email(),
          password: faker.internet.password(),
          isLdap: faker.datatype.boolean(),
        });
      });
    }
  }

  static emptyRes(cap = {}) {
    const res = {
      status: jest.fn().mockImplementation(() => res),
      send: jest.fn().mockImplementation((c) => {
        if (!cap.catch) {
          cap.catch = c;
        }
      }),
      render: jest.fn(),
      json: jest.fn((c) => {
        if (!cap.catch) {
          cap.catch = c;
        }
      }),
    };

    res.serialize = (object) => {
      const retVal = serialize(object);
      res.send(retVal);
    };

    res.serializePost = (object) => {
      const retVal = serialize(object);
      res.send(retVal);
    };

    return res;
  }

  static emptyReq() {
    const req = {};
    req.test = "hehe";

    req.sanitize = (schema, body) => {
      sanitizeSchema(schema, body);
    };
    return req;
  }
};
