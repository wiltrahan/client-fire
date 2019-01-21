import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { IClient } from '../shared/interfaces';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {
  private myClients: Observable<any[]>;
  private myClient: Observable<IClient>;
  private allMyClients: IClient[] = [];
  private noteDoc: AngularFirestoreDocument<IClient>;
  constructor(private db: AngularFirestore) { }

  fetchMyClients() {
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

  getMyClient(selectedId: string): Observable<IClient> {
    this.noteDoc = this.db.doc(`clients/${selectedId}`);
    this.myClient = this.noteDoc.valueChanges();
    return this.myClient;
  }
  
  
}
