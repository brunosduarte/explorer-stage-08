const UserCreateService = require('./UserCreateService');
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError")

describe("UserCreateService", () => {
  let userRepositoryInMemory = null;
  let userCreateService = null;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepositoryInMemory);
  })

  it("should create user", async () => {
    const user = {
      name: "User Test",
      email: "user@example.com",
      password: "123"
    }

    const userCreated = await userCreateService.execute(user)
    expect(userCreated).toHaveProperty("id");
  });

  it("should not possible create user with existing email ", async () => {
    const user1 = {
      name: "User Test",
      email: "user@example.com",
      password: "123"
    }
    const user2 = {
      name: "User Test 2",
      email: "user@example.com",
      password: "456"
    };

    await userCreateService.execute(user1)
    await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este e-mail já está em uso"));
  });
});