
export class Todo {
  filter(arg0: (completedTask: { completed: boolean; }) => boolean): Todo[] {
    throw new Error('Method not implemented.');
  }
  id:number=0;
  task:string="";
  complete:boolean= false;
}
