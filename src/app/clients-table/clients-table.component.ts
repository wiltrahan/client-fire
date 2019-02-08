import { DataService } from './../core/data.service';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss']
})
export class ClientsTableComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['firstName', 'lastName', 'phone'];
  dataSource = new MatTableDataSource();
  private clientSub: Subscription;
  constructor(private dataService: DataService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.clientSub = this.dataService.fetchClients().subscribe(
      data => {
        this.dataSource.data = data;
      }
    );
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.clientSub.unsubscribe();
  }

}
