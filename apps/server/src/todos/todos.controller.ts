import { Controller, Get } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly service: TodosService) {}

  @Get()
  findAll(): any[] {
    return this.service.getTodos();
  }
}
