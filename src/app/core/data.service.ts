import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { IClient } from '../shared/interfaces';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class DataService {
  private myClients: Observable<any[]>;
  private myClient: Observable<IClient>;
  private clientDoc: AngularFirestoreDocument<IClient>;
  private editedClient: IClient;
  constructor(private db: AngularFirestore) { }
  private snapClient: Observable<any>;
  
  fetchClients() {
    this.myClients = this.db.collection('clients').snapshotChanges().pipe(
      map(clients => clients.map(a => {
        const data = a.payload.doc.data() as IClient;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.myClients;
  }

  getClient(selectedId: string) {
    this.clientDoc = this.db.doc(`clients/${selectedId}`);
    this.snapClient = this.clientDoc.snapshotChanges().pipe(
      map(client => {
        const data = client.payload.data() as IClient;
        const id = client.payload.id
        return { id, ...data };
      })
    )
    return this.snapClient;
  }

  addClient(client: IClient) {
    this.db.collection('clients').add(client);
  }

  updateClient(client: IClient):Observable<any> {
   return of(this.db.doc(`clients/${client.id}`).update(client));
  }

}
