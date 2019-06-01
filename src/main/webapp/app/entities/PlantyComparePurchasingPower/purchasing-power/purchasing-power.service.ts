import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPurchasingPower } from 'app/shared/model/PlantyComparePurchasingPower/purchasing-power.model';

type EntityResponseType = HttpResponse<IPurchasingPower>;
type EntityArrayResponseType = HttpResponse<IPurchasingPower[]>;

@Injectable({ providedIn: 'root' })
export class PurchasingPowerService {
  public resourceUrl = SERVER_API_URL + 'services/plantycomparepurchasingpower/api/purchasing-powers';
  public resourceSearchUrl = SERVER_API_URL + 'services/plantycomparepurchasingpower/api/_search/purchasing-powers';

  constructor(protected http: HttpClient) {}

  create(purchasingPower: IPurchasingPower): Observable<EntityResponseType> {
    return this.http.post<IPurchasingPower>(this.resourceUrl, purchasingPower, { observe: 'response' });
  }

  update(purchasingPower: IPurchasingPower): Observable<EntityResponseType> {
    return this.http.put<IPurchasingPower>(this.resourceUrl, purchasingPower, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IPurchasingPower>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPurchasingPower[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPurchasingPower[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
