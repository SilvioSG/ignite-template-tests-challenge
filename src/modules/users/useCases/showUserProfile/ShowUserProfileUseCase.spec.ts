import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let showUserProfileUserCase: ShowUserProfileUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Show User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    showUserProfileUserCase = new ShowUserProfileUseCase(inMemoryUsersRepository);
  });

  it("should be able view user profile", async() => {
    const user = await inMemoryUsersRepository.create({
      name: "User Example",
      email: "user@email.com",
      password: "123456"
    });

    const user_id = String(user.id);

    const showProfile = await showUserProfileUserCase.execute(user_id);

    expect(showProfile).toEqual(user);
  })

  it("should not be able view user profile user with already exists", async() => {
    expect(async() =>{
      const user_id = "123";
      await showUserProfileUserCase.execute(user_id);
    }).rejects.toBeInstanceOf(AppError);
  });
})
