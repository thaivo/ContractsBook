import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  addContact(contact: Contact): Observable<any> {
    return this.http.post<Contact>('http://localhost:3000/api/create-contact', contact, this.httpOptions)
      .pipe(
        catchError(this.handleError<Contact>('Add Contact'))
      );
  }

  getContact(id): Observable<Contact[]> {
    return this.http.get<Contact[]>('http://localhost:3000/api/get-contact/' + id)
      .pipe(
        tap(_ => console.log(`Contact fetched: ${id}`)),
        catchError(this.handleError<Contact[]>(`Get Contact id=${id}`))
      );
  }

  getContactList(): Observable<Contact[]> {
    return this.http.get<Contact[]>('http://localhost:3000/api')
      .pipe(
        tap(contacts => console.log('Contacts fetched!')),
        catchError(this.handleError<Contact[]>('Get Contacts', []))
      );
  }

  updateContact(id, contact: Contact): Observable<any> {
    return this.http.put('http://localhost:3000/api/update-contact/' + id, contact, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Contact updated: ${id}`)),
        catchError(this.handleError<Contact[]>('Update Contact'))
      );
  }

  deleteContact(id): Observable<Contact[]> {
    return this.http.delete<Contact[]>('http://localhost:3000/api/delete-contact/' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Contact deleted: ${id}`)),
        catchError(this.handleError<Contact[]>('Delete Contact'))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}