import {Injectable} from '@angular/core';
import {StockMap} from '../const/stockMap';
import {BASE_URL} from '../const/constant';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { StyleStats } from '../const/style-stats.model';
import { CustomerStats } from '../const/customerStats';

@Injectable({providedIn:'root'})
export class InterService {
  private apiI = BASE_URL + 'international';

  constructor(private http:HttpClient) {}

  //  /international/periode          2 valeur
  getPeriode(): Observable<string[]> {
    return this.http.get<string[]>(this.apiI+'/periode');
  }
//  /international/CA               1 v
  getCA(): Observable<number> {
    return this.http.get<number>(this.apiI+'/CA');
  }
//  /international/paniermoyen      1 v
  getPaniermoyn(): Observable<number> {
    return this.http.get<number>(this.apiI+'/paniermoyen');
  }
//  /international/topproduit       tab[][]
  getProduitRevenue(): Observable<Record<string, StyleStats>> {
    return this.http.get<Record<string, StyleStats>>(this.apiI+'/produitRevenue');
  }
//  /international/topproduit       tab[][]
  getCustomerMTtotal(): Observable<Record<string, CustomerStats>> {
    return this.http.get<Record<string, CustomerStats>>(this.apiI+'/customerMTtotal');
  }
}
