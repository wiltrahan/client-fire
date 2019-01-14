import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IClient } from '../shared/interfaces';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class DataService {
  private myClients: Observable<any[]>;

  constructor(private db: AngularFirestore) { }

  fetchMyClients() {
    return this.myClients = this.db.collection('clients').valueChanges();
  }

  addNewClient(client: IClient) {
    this.db.collection('clients').add(client);
  }
}
