import { Injectable, TemplateRef } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { NotifyDialogComponent } from '../../dialogs/notify-dialog/notify-dialog.component';
import { TaskDialogComponent } from '../../dialogs/task-dialog/task-dialog.component';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  header: TemplateRef<any> | undefined;

  constructor(

    private dialogService: DialogService

  ) { }

  openTaskDialog() {
    this.dialogService.open(
      TaskDialogComponent, {
        width: '96vw',
        contentStyle: { overflow: 'auto' },
        styleClass: 'p-dialog-custom',
        maximizable: true,
      }
    );
  }

  openNotifyDialog() {
    this.dialogService.open(
      NotifyDialogComponent, {
        width: '96vw',
        contentStyle: { overflow: 'auto' },
        styleClass: 'p-dialog-custom',
        maximizable: true,
      }
    );
  }
}
