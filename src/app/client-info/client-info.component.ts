import { Location } from '@angular/common';
import { IClient } from './../shared/interfaces';
import { DataService } from './../core/data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent implements OnInit, OnDestroy {
  
  client: IClient;
  clientSubscription: Subscription
  
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getClient();
  }

  getClient(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.clientSubscription = this.dataService.getClient(id).subscribe(data => {
      this.client = data;   
    });
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
  }

}
