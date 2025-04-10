import { CategoryTask } from '../models/database/CategotyTask.model';
import { List } from '../models/database/List.model';

export class CreateTaskDto {
  public title: string;
  public owner?: number;
  public assigned?: number;
  public duedate?: Date;
  public note?: string;
  public list?: List;
  public categories?: CategoryTask[];

  constructor(createTaskDto: CreateTaskDto) {
    this.title = createTaskDto.title;
  }
}
