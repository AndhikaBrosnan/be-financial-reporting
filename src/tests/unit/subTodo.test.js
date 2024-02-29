const { faker } = require("@faker-js/faker");
const TodoService = require("#services/todo");
const { sequelize } = require("#models");
const SubTodoController = require("#controllers/subTodo");
const SubTodoService = require("#services/subTodo");
const { subTodo: SubTodo } = require("#models");
const { validationResult } = require("express-validator");
const TestHelper = require("#helpers/TestHelper");

const testCreateTodoOnDB = async () => {
  const randomTask = await faker.lorem.sentence();
  const randomNumber = await faker.number.int(1);

  const created = await TodoService.create({
    task: randomTask,
    isDone: false,
    priority: randomNumber,
  });

  return created;
};

const findAllTodo = async () => {
  const allTodos = await TodoService.list();
  return allTodos;
};

afterEach(async () => {
  await sequelize.query('DELETE FROM "subTodos" WHERE 1=1');
});
afterAll(() => {
  return sequelize.close();
});
beforeAll(async () => {
  await testCreateTodoOnDB();
});

// test Controller only
describe("[service] subTodo", () => {
  test("[happy path] create subTodo", async () => {
    let mySampleTodo;
    const { data: dataSample } = await findAllTodo();
    mySampleTodo = await dataSample[0].dataValues.id;

    const createBody = {
      todoId: mySampleTodo,
      subTask: faker.lorem.sentence(),
      //   body: { todoId: mySampleTodo, subTask: faker.lorem.sentence() },
    };
    // let mockRes = { sanitize: jest.fn(), serializePost: jest.fn() };

    jest.mock("express-validator");
    jest.mock("../../services/subTodo");

    let cap = {};
    const res = TestHelper.emptyRes(cap);
    const req = TestHelper.emptyReq();

    req.body = createBody;

    await SubTodoController.create(req, res);

    const { subTodoId } = cap.catch.data;

    const rows = await SubTodo.findOne({ where: { id: subTodoId } });

    expect(subTodoId).toEqual(rows.dataValues.id);
  });
});
