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
      this.client.startTime = this.convertTimeString(data.startTime);
      this.client.endTime = this.convertTimeString(data.endTime);
    });
  }

  convertTimeString(time: string) {
    const hour = time.substring(0, 2);
    const minute = time.substring(2);
    const am = 'am';
    const pm = 'pm';
    
    if(hour[0] === '0') {
      time = (parseInt(hour[1], 10) % 12).toString() + minute + am;
    } else if(hour[0] === '1' && hour[1] === '0') {
      time = '10' + minute + am;
    } else if(hour[0] === '1' && hour[1] === '1') {
      time = '11' + minute + am;
    } else if(hour[0] === '1' && hour[1] === '2') {
      time = '12' + minute + pm;
    } else {
      time = (parseInt(hour, 10) % 12).toString() + minute + pm;
    }
    return time;
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
  }

}
