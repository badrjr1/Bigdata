import {Injectable} from '@angular/core';
import {StockMap} from '../const/stockMap';
import {BASE_URL} from '../const/constant';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn:'root'})
export class SalereportServiceService {
  private apiS = BASE_URL + 'salereport';

  constructor(private http: HttpClient) {
  }
//  /salereport/nbrtotalproduit 1V
  getNbrproduit(): Observable<number> {
    return this.http.get<number>(this.apiS+'/nbrtotalproduit');
  }
//  /salereport/sizegrandstock
  getSizegrandStock(): Observable<StockMap> {
    return this.http.get<StockMap>(this.apiS+'/sizegrandstock');
  }
//  /salereport/couleurgrandstock
  getCouleurgrandStock(): Observable<StockMap> {
    return this.http.get<StockMap>(this.apiS+'/couleurgrandstock');
  }


}
