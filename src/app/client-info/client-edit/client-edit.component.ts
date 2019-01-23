import { Component, OnInit, OnDestroy } from '@angular/core';
import { IClient } from '../../shared/interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DataService } from '../../core/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit, OnDestroy {

  client: IClient;
  clientSubscription: Subscription;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getClient();
  }

  getClient(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.clientSubscription = this.dataService.getClient(id)
      .subscribe(client => this.client = client);
  }

  editClient(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.clientSubscription = this.dataService.updateClient(this.client)
      .subscribe(
        data => {
          alert('Update successful for ' + this.client.firstName + ' ' + this.client.lastName);
          this.goBack(id);
        }
      );
  }

  goBack(id: string) {
    // const id = this.route.snapshot.paramMap.get('id');
    this.router.navigateByUrl('client-info/' + id);
  }

  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
  }

}
