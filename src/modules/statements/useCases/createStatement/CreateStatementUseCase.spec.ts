import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "./CreateStatementUseCase";


let createStatementUseCase: CreateStatementUseCase;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;

enum OperationType{
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

describe("Create Statment", () => {
  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository, inMemoryStatementsRepository);
  });

  it("should be able to create a new statements DEPOSIT", async() =>{
    const user = await inMemoryUsersRepository.create({
      name: "User Example",
      email: "user@email.com",
      password: "123456",
    });

    const statement = await createStatementUseCase.execute({
      amount: 300,
      description: "Example Statement DEPOSIT",
      type: OperationType.DEPOSIT,
      user_id: String(user.id),
    });

    expect(statement).toHaveProperty("id");
  });

  it("should be able to create a new statements WITHDRAW", async() =>{
    const user = await inMemoryUsersRepository.create({
      name: "User Example",
      email: "user@email.com",
      password: "123456",
    });

    await inMemoryStatementsRepository.create({
      amount: 800,
      description: "Example Statement DEPOSIT",
      type: OperationType.DEPOSIT,
      user_id: String(user.id),
    });

    const statement = await createStatementUseCase.execute({
      amount: 200,
        description: "Example Statement WITHDRAW",
        type: OperationType.WITHDRAW,
        user_id: String(user.id)
    })

    expect(statement).toHaveProperty("id");

  });
});
