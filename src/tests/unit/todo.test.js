const { faker } = require("@faker-js/faker");
const TodoService = require("#services/todo");
const { sequelize } = require("#models");

afterEach(async () => {
  await sequelize.query('DELETE FROM "todos" WHERE 1=1');
});
afterAll(() => {
  return sequelize.close();
});

const testCreateForMultiplePurpose = async () => {
  const randomTask = await faker.lorem.sentence();
  const randomNumber = await faker.number.int(1);

  const created = await TodoService.create({
    task: randomTask,
    isDone: false,
    priority: randomNumber,
  });

  return created;
};

const testFindForMultiplePurpose = async (todoId) => {
  const findById = await TodoService.findById(todoId);
  return findById;
};

const testFetchAll = async () => {
  const todos = await TodoService.list();
  return todos;
};

// test Service Only
describe("[service] todo", () => {
  test("[happy path] create todo success", async () => {
    const created = await testCreateForMultiplePurpose();
    expect(created).toHaveProperty("task");
  });

  test("[happy path] list todo generated", async () => {
    const lists = await TodoService.list();

    expect(lists).toHaveProperty("data");
  });

  test("[happy path] update todo success", async () => {
    const randomTask = faker.lorem.sentence();
    const randomNumber = faker.number.int(1);
    const randomBool = faker.datatype.boolean();

    // const findByIdSpy = jest.spyOn(TodoService, "findById");
    // findByIdSpy.mockReturnValue({ id: "todo1" });
    // findByIdSpy.mockRestore();

    const createdTodo = await testCreateForMultiplePurpose();
    const { dataValues } = createdTodo;

    await TodoService.update(dataValues.id, {
      task: randomTask,
      isDone: randomBool,
      priority: randomNumber,
    });

    const checkTodoById = await testFindForMultiplePurpose(dataValues.id);

    expect(checkTodoById.task).toEqual(randomTask);
  });

  test("[happy path] delete todo success", async () => {
    // const findByIdSpy = jest.spyOn(TodoService, "findById");
    // findByIdSpy.mockReturnValue({ id: "todo1" });
    // findByIdSpy.mockRestore();

    const createdTodo = await testCreateForMultiplePurpose();
    const { dataValues } = createdTodo;

    const todoList = await testFetchAll();
    expect(todoList.totalData).toEqual(1);

    await TodoService.delete(dataValues.id);

    const todoList2 = await testFetchAll();

    expect(todoList2.totalData).toEqual(0);
  });
});
