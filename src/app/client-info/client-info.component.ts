import { Location } from '@angular/common';
import { IClient } from './../shared/interfaces';
import { DataService } from './../core/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent implements OnInit {
  client: IClient;
  
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private location: Location
  ) { }

  ngOnInit(): void {
    // this.getClient();
  }

  // getClient(): void {
  //   const id = +this.route.snapshot.paramMap.get('id');
  //   this.dataService.getMyClient(id)
  //     .subscribe(client => this.client = client);
  // }

  

  goBack(): void {
    this.location.back();
  }

}
