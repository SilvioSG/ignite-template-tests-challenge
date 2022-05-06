import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase";


let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Create User", () =>{
  beforeEach(() =>{
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase= new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to create a new user", async() => {
    const user ={
      name: "user test",
      email: "usertest@gmail.com",
      password: "4321"
    }

    const userCreated = await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password
    });

    expect(userCreated).toHaveProperty("id")
  });

  it("should not be able to create a new user wiht name exists", async() => {
    expect( async() => {
      const user ={
        name: "user test",
        email: "usertest@gmail.com",
        password: "4321"
      }

      await createUserUseCase.execute({
        name: user.name,
        email: user.email,
        password: user.password
      });

      await createUserUseCase.execute({
        name: user.name,
        email: user.email,
        password: user.password
      });
    }).rejects.toBeInstanceOf(CreateUserError)
  });
})
