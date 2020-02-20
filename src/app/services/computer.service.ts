import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Computer } from '../models/computer';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  public marques: string[] = ['Dell', 'HP', 'Apple', 'Asus'];
  public types: string[] = ['Portable', 'Fixe', 'Tablette hybride'];
  public categories: string[] = ['Gaming', 'Bureautique', 'Premier prix'];
  public _url: string = "http://localhost:3000/computers";

  constructor(private _httpClient: HttpClient) { }

  getComputers(): Observable<Computer[]> {
    return this._httpClient.get<Computer[]>(this._url).pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getComputerById(_id: number): Observable<Computer> {
    return this._httpClient.get<Computer>(`${this._url}/${_id}`).pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  addComputer(_computer: Computer): Observable<Computer> {
    return this._httpClient.post<Computer>(this._url, _computer).pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  updateComputer(_computer: Computer): Observable<Computer> {
    return this._httpClient.put<Computer>(`${this._url}/${_computer.id}`, _computer).pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  deleteComputer(_computer: Computer) {
    return this._httpClient.delete<Computer>(`${this._url}/${_computer.id}`).pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  errorHandler(_error: HttpErrorResponse) {
    if (_error.error instanceof ErrorEvent) { // Get client-side error
      console.error(`A client side error occurred: ${_error.error.message}`);
    } else { // Get server-side error
      console.error(
        `Backend returned code ${_error.status}, ` +
        `body was: ${_error.error}`);
    }
    return throwError(`Something bad happened (error code: ${_error.status}); please try again later.`);
  }

}
