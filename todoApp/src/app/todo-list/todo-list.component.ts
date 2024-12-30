import { Component } from '@angular/core';
import { Todo,TodoserviceService } from '../todoservice.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  todos: Todo[] = [];
  newTodo: Partial<Todo> = { title: '', description: '' };
  editTodo: Todo | null = null;

  constructor(private todoService: TodoserviceService) {}

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
  }

  addTodo(): void {
    if (!this.newTodo.title) {
      alert('Title cannot be empty');
      return;
    }

    const todo: Todo = {
      id: Date.now(),
      title: this.newTodo.title!,
      description: this.newTodo.description || '',
      completed: false,
    };

    this.todoService.addTodo(todo);
    this.todos = this.todoService.getTodos();
    this.newTodo = { title: '', description: '' };
  }

  markCompleted(todo: Todo): void {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo);
    this.todos = this.todoService.getTodos();
  }

  startEdit(todo: Todo): void {
    this.editTodo = { ...todo };
  }

  saveEdit(): void {
    if (this.editTodo) {
      this.todoService.updateTodo(this.editTodo);
      this.todos = this.todoService.getTodos();
      this.editTodo = null;
    }
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
    this.todos = this.todoService.getTodos();
  }
}
