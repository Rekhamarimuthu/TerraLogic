import { Injectable } from '@angular/core';
export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class TodoserviceService {
  private todos: Todo[] = [];

  constructor() {
    // Load from localStorage if available
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(todo: Todo): void {
    this.todos.push(todo);
    this.saveToLocalStorage();
  }

  updateTodo(updatedTodo: Todo): void {
    const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
    if (index > -1) {
      this.todos[index] = updatedTodo;
      this.saveToLocalStorage();
    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveToLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
