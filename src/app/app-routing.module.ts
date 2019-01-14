import { AboutComponent } from './about/about.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ClientFormComponent } from './client-info/client-form/client-form.component';
import { ClientInfoComponent } from './client-info/client-info.component';
import { ClientsTableComponent } from './clients-table/clients-table.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientEditComponent } from './client-info/client-edit/client-edit.component';

const routes: Routes = [
  { path: '', component: ClientsTableComponent },
  { path: 'client-form', component: ClientFormComponent },
  { path: 'client-info/:id', component: ClientInfoComponent },
  { path: 'client-edit/:id', component: ClientEditComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
