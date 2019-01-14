import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsTableComponent } from './clients-table/clients-table.component';
import { AboutComponent } from './about/about.component';
import { CalendarHeaderComponent } from './calendar/calendar-header/calendar-header.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModalComponent } from './calendar/calendar-modal/calendar-modal.component';
import { ClientInfoComponent } from './client-info/client-info.component';
import { ClientEditComponent } from './client-info/client-edit/client-edit.component';
import { ClientFormComponent } from './client-info/client-form/client-form.component';
import { ClientModalComponent } from './client-info/client-modal/client-modal.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { DataService } from './core/data.service';
import { FlexLayoutModule, CoreModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ClientsTableComponent,
    AboutComponent,
    CalendarHeaderComponent,
    CalendarComponent,
    CalendarModalComponent,
    ClientInfoComponent,
    ClientEditComponent,
    ClientFormComponent,
    ClientModalComponent,
    FooterComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    CoreModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  entryComponents: [
    ClientModalComponent,
    CalendarModalComponent
  ]
})
export class AppModule { }
