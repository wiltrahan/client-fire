import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject} from '@angular/core';

@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal.component.html',
  styleUrls: ['./calendar-modal.component.scss']
})
export class CalendarModalComponent  {

  constructor(
    public dialogRef: MatDialogRef<CalendarModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public passedData: any) { }

    closeModal(): void {
      this.dialogRef.close();
    }
}
