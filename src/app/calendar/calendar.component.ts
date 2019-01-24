import { CalendarModalComponent } from './calendar-modal/calendar-modal.component';
import { IClient } from './../shared/interfaces';
import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { DataService } from '../core/data.service';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnDestroy {

  clients: IClient[];
  calendarSubscription: Subscription;
  constructor(
    private dataService: DataService,
    private dialog: MatDialog
  ) { }

  view = 'month';
  viewDate: Date = new Date();
  events: CalendarEvent[] = this.getClients();
  client: IClient;

  getClients(): CalendarEvent[] {
    this.calendarSubscription = this.dataService.fetchClients()
      .subscribe(clients => {
        this.clients = clients;
        this.events = this.clients.map(event => ({
          id: event.id,
          start: this.getDate(event.nextAppt, event.startTime),
          end: this.getDate(event.nextAppt, event.endTime),
          title: event.firstName + ' ' + event.lastName,
          service: event.service,
          phone: event.phone
        }));
      });
      return this.events;
  }

  getDate(nextDate, time): Date {
    const seconds = nextDate.seconds * 1000;
    const fullDate = new Date(seconds);
    time = time + ' ';
    const index = time.indexOf(':');
    const index2 = time.indexOf(' ');

    const hours = time.substring(0, index);
    const minutes = time.substring(index + 1, index2);

    fullDate.setHours(hours);
    fullDate.setMinutes(minutes);
    fullDate.setSeconds(0o0);
    return fullDate;
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    this.dialog.open(CalendarModalComponent, {
      data: {
        title: event.title,
        startTime: event.start,
        service: event.service,
        phone: event.phone
      }
    });
  }

  ngOnDestroy(): void {
    this.calendarSubscription.unsubscribe();
  }
}
