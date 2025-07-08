import {BASE_URL} from '../const/constant';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StockMap} from '../const/stockMap';


@Injectable({providedIn:'root'})
export class AmazonService {
  private apiA = BASE_URL + 'amazon';
  constructor(private http: HttpClient) {}

//  /amazon/cmdtotalanalyse
  getCmdTotal(): Observable<number> {
    return this.http.get<number>(this.apiA + '/cmdtotalanalyse');
  }
//  /amazon/statusSTT
  getStatusSTT(): Observable<StockMap> {
    return this.http.get<StockMap>(this.apiA + '/statusSTT');
  }
//  /amazon/topmodelivraison
  getTopmodelivraison(): Observable<StockMap> {
    return this.http.get<StockMap>(this.apiA + '/topmodelivraison');
  }
//  /amazon/dayofweek
  getDayofweek(): Observable<StockMap> {
    return this.http.get<StockMap>(this.apiA + '/dayofweek');
  }
//  /amazon/topstates
  getTopstates(): Observable<StockMap> {
    return this.http.get<StockMap>(this.apiA + '/topstates');
  }
}
