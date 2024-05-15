
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../model/todo';




@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {

  taskObj:Todo = new Todo();
  taskArr:Todo[] = [];
  addTaskData: string='';
  editTaskData: string='';
  tasks: any;
  completed:boolean = false;
  completedTask: Todo[] = [];
 
  constructor(private todoService: TodoService){
  }
  ngOnInit(): void {
    this.addTaskData='';
    this.editTaskData='';
    this.taskObj = new Todo();
    this.taskArr = [];
    this.getAllTask()
  }
  // create Task data
  addTask(){
    this.taskObj.task = this.addTaskData;
    this.todoService.addTask(this.taskObj).subscribe(res => {
      this.taskArr.push(this.taskObj)
      this.addTaskData='';
      this.getAllTask();
    },err =>{
      alert(err);
    })
  }

  // Get all Task data

  getAllTask(){
    this.todoService.getAllTask().subscribe((result: any) =>{
      return this.taskArr = result;
    })
  }

  // Edit Todo Task

  editTask(){
    this.taskObj.task = this.editTaskData;
    this.todoService.editTask(this.taskObj).subscribe(res=> {
      this.ngOnInit()     
    }, err => {
      alert('Unable to Update task')
    })
  }

  callEdit(task: Todo){
    this.taskObj= task;
    this.editTaskData = task.task;
  }

  // Complete task

  collComplete(task: any){
    task.completed = !task.completed;
    this.todoService.completeTask(task).subscribe(res =>{
      this.ngOnInit()
    })
  }

  completedTaskList(task: any){
    this.todoService.getAllTask().subscribe(res =>{
      this.taskArr = res.filter((completedTask: { completed: boolean; }) => completedTask.completed == true);
      return this.taskArr 
      // console.log("Complete Task list",this.taskArr)
      // this.ngOnInit()
    })
  }

  // Delete Todo Task 

  deleteTask(task: any){
    this.todoService.delete(task).subscribe(res => {
      this.ngOnInit()
    },error => {
      alert('Failed to Delete Task');
    })
    
  }

}
