import { AbstractRepository } from "@/model/AbstractRepository";
import { client } from "@/model/CassandraClient";
import { TaskDTO } from "./TaskDTO";
import { TaskEntity } from "./TaskEntity";

export class TaskRepository extends AbstractRepository<TaskDTO, TaskEntity> {
  public get tableName() {
    return "tasks";
  }

  public get entityName() {
    return "Task";
  }

  public convertEntityToDTO(entity: TaskEntity): TaskDTO {
    return {
      id: entity.id,
      text: entity.text,
      columnId: entity.columnId,
      position: entity.position,
    };
  }

  public convertDTOToEntity(dto: TaskDTO): TaskEntity {
    return {
      id: dto.id,
      text: dto.text,
      columnId: dto.columnId,
      position: dto.position,
    };
  }

  async createTable() {
    return client.execute(
      `CREATE TABLE IF NOT EXISTS ${this.tableName} (id text, text text, column_id text, position int, PRIMARY KEY (id))`,
    );
  }
}
