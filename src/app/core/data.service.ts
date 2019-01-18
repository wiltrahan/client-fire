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
  private myClient;
  private allMyClients: IClient[] = [];

  constructor(private db: AngularFirestore) { }

  fetchMyClients() {
    return this.myClients = this.db.collection('clients').valueChanges();
  }

  addNewClient(client: IClient) {
    this.db.collection('clients').add(client);
  }

  // getMyClient(selectedId: string) {
  //   return this.myClient = this.allMyClients.find(
  //     ex => ex.id === selectedId
  //   );
  // }

  getMyClient(selectedId: string) {
    // return this.myClient = this.db.collection('clients').doc(selectedId);
    return this.myClient = this.db.collection('clients', selectedId => selectedId.where('id', '==', selectedId));
  }
}
