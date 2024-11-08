import { Component, OnInit } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TaskService } from '../../core/service/task.service';
import { Task } from '../../core/models/database/Task.model';
import { HttpResponse } from '../../../../shared/models/http/HttpResponse.model';
import { ListService } from '../../core/service/list.service';
import { List } from '../../core/models/database/List.model';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CheckboxModule,
    OverlayPanelModule,
  ],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss',
})
export class TodolistComponent implements OnInit {
  private onSave: boolean = false;
  private defaultList: List = new List({
    id: 1,
    name: 'Mi Lista',
    icon: 'fa-list-check',
    counter: 0,
    deleted_at: new Date(),
    tasks: [],
  });

  constructor(
    private readonly taskService: TaskService,
    private readonly listService: ListService
  ) {}

  public lists: List[] = [];
  public tasks: Task[] = [];
  public createTaskDto: FormGroup = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    owner: new FormControl<number>(1),
    assigned: new FormControl<number>(1),
    duedate: new FormControl<Date>(new Date()),
    note: new FormControl<string>(''),
    list: new FormControl<List>(this.defaultList),
  });

  ngOnInit(): void {
    this.initialize();
  }

  private async initialize() {
    this.taskService.getAllTask().subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
      },
    });
    this.listService.getAllList().subscribe({
      next: (lists: List[]) => {
        this.lists = lists;
      },
    });
  }
  private resetForm(formGroup: FormGroup): FormGroup {
    formGroup.reset({
      assigned: 1,
      duedate: new Date(),
      note: null,
      owner: 1,
      title: null,
      list: this.defaultList,
    });
    return formGroup;
  }

  public setReady(task: Task, ready: boolean): void {
    this.taskService.setReady(task.id, ready).subscribe({
      next: (response: HttpResponse) => {
        if (!response.success) {
          task.ready = !ready;
        }
      },
      error: (response: HttpResponse) => {
        // TODO Implements messages toast
        console.log(response);
        task.ready = !ready;
      },
    });
  }
  help($event: MouseEvent) {
    // const ad = $event.target as HTMLElement;
    // console.log(ad.getBoundingClientRect());
    // $event.clientX = $event.clientX - 20;
    // $event.pageX = $event.pageX - 20;
    // $event.screenX = $event.screenX - 20;
    // $event.x = $event.x - 20;
    return $event;
  }
  public saveNewTask($event: KeyboardEvent) {
    if (!($event.code === 'Enter' && !this.onSave)) return;
    this.onSave = true;

    if (!this.createTaskDto.valid) {
      // for (let control in this.createTaskDto.controls) {
      //   if (!this.createTaskDto.controls[control].valid) {
      //     console.log(control);
      //   }
      // }
      return;
    }
    this.taskService.saveTask(this.createTaskDto.value).subscribe({
      next: (response: Task) => {
        // TODO Implements message toast
        // if (!response.id) {}
        this.tasks.push(response);
        this.createTaskDto = this.resetForm(this.createTaskDto);
        this.onSave = false;
      },
    });
  }

  public selectList(id: number): void {
    this.defaultList =
      this.lists.find((value) => value.id === id) || this.defaultList;
    this.createTaskDto.controls['list'].setValue(this.defaultList);
  }
}
