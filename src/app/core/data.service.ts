import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
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
  private myClient: Observable<IClient>;
  private allMyClients: IClient[] = [];
  private noteDoc: AngularFirestoreDocument<IClient>;
  constructor(private db: AngularFirestore) { }

  fetchMyClients() {
    // return this.myClients = this.db.collection('clients').valueChanges();
    this.myClients = this.db.collection('clients').snapshotChanges().pipe(
      map(clients => clients.map(a => {
        const data = a.payload.doc.data() as IClient;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.myClients;
  }

  addNewClient(client: IClient) {
    this.db.collection('clients').add(client);
  }

  // getMyClient(selectedId: string) {
  //   return this.myClient = this.allMyClients.find(
  //     ex => ex.id === selectedId
  //   );
  // }

  // getMyClient(selectedId: string) {  
  //   this.db.collection('clients').doc(selectedId).ref.get().then(function(doc) {
  //     if (doc.exists) {
  //       this.myClient = doc.data();
  //       console.log('ClientData: ', this.myClient);
  //       return this.myClient;
  //     } else {
  //       console.log('No Client');
  //       return 'crap';
  //     }
  //   })
  //   return this.myClient;
  // }

  getMyClient(selectedId: string): Observable<IClient> {
    this.noteDoc = this.db.doc(`clients/${selectedId}`);
    this.myClient = this.noteDoc.valueChanges();
    return this.myClient;
  }
  
  
}
