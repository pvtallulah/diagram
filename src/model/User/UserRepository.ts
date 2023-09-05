import { AbstractRepository, User } from "@/model/types";
import { userDatabase } from "./UserDatabase";

export class UserRepository implements AbstractRepository<User> {
  async findById(id: string) {
    const item = userDatabase.get(id);
    if (!item) {
      throw new Error("User not found");
    }

    return item;
  }

  async list() {
    return Array.from(userDatabase.values());
  }

  async create(user: User) {
    userDatabase.set(user.id, user);
    return user;
  }

  async update(id: string, user: User) {
    userDatabase.set(id, user);
    return user;
  }

  async delete(id: string) {
    userDatabase.delete(id);
  }
}
