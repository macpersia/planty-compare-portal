import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PurchasingPower } from 'app/shared/model/PlantyComparePurchasingPower/purchasing-power.model';
import { PurchasingPowerService } from './purchasing-power.service';
import { PurchasingPowerComponent } from './purchasing-power.component';
import { PurchasingPowerDetailComponent } from './purchasing-power-detail.component';
import { PurchasingPowerUpdateComponent } from './purchasing-power-update.component';
import { PurchasingPowerDeletePopupComponent } from './purchasing-power-delete-dialog.component';
import { IPurchasingPower } from 'app/shared/model/PlantyComparePurchasingPower/purchasing-power.model';

@Injectable({ providedIn: 'root' })
export class PurchasingPowerResolve implements Resolve<IPurchasingPower> {
  constructor(private service: PurchasingPowerService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPurchasingPower> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PurchasingPower>) => response.ok),
        map((purchasingPower: HttpResponse<PurchasingPower>) => purchasingPower.body)
      );
    }
    return of(new PurchasingPower());
  }
}

export const purchasingPowerRoute: Routes = [
  {
    path: '',
    component: PurchasingPowerComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'plantyComparePortalApp.plantyComparePurchasingPowerPurchasingPower.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PurchasingPowerDetailComponent,
    resolve: {
      purchasingPower: PurchasingPowerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'plantyComparePortalApp.plantyComparePurchasingPowerPurchasingPower.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PurchasingPowerUpdateComponent,
    resolve: {
      purchasingPower: PurchasingPowerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'plantyComparePortalApp.plantyComparePurchasingPowerPurchasingPower.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PurchasingPowerUpdateComponent,
    resolve: {
      purchasingPower: PurchasingPowerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'plantyComparePortalApp.plantyComparePurchasingPowerPurchasingPower.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const purchasingPowerPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PurchasingPowerDeletePopupComponent,
    resolve: {
      purchasingPower: PurchasingPowerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'plantyComparePortalApp.plantyComparePurchasingPowerPurchasingPower.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
