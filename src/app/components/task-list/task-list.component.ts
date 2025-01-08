import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { MatInputModule } from '@angular/material/input';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms'; 
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone:true,
  imports: [    
    MatFormFieldModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatOptionModule,
    ReactiveFormsModule,
    FormsModule,    
  ],
})
export class TaskListComponent {
  tasks = [
    { title: 'Task 1', description: 'Description', priority: 'High', status: 'Pending' },
    { title: 'Task 2', description: 'Description ', priority: 'Medium', status: 'In Progress' },
    { title: 'Task 3', description: 'Description', priority: 'Low', status: 'Completed' }
  ];

  filteredTasks = [...this.tasks];
  filterStatus = '';

  displayedColumns: string[] = ['title', 'description', 'priority', 'status', 'actions'];

  constructor(private dialog: MatDialog) {}

  filterTasks() {
    this.filteredTasks = this.filterStatus
      ? this.tasks.filter(task => task.status === this.filterStatus)
      : [...this.tasks];
  }

  openTaskModal(task: any = null) {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '400px',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (task) {
          Object.assign(task, result);
        } else {
          this.tasks.push(result);
        }
        this.filterTasks();
      }
    });
  }

  confirmDelete(task: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete '${task.title}'?` }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.tasks = this.tasks.filter(t => t !== task);
        this.filterTasks();
      }
    });
  }

  editTask(task: any) {
    this.openTaskModal(task);
  }
}
