import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { PlantyComparePortalSharedModule } from 'app/shared';
import {
  PurchasingPowerComponent,
  PurchasingPowerDetailComponent,
  PurchasingPowerUpdateComponent,
  PurchasingPowerDeletePopupComponent,
  PurchasingPowerDeleteDialogComponent,
  purchasingPowerRoute,
  purchasingPowerPopupRoute
} from './';

const ENTITY_STATES = [...purchasingPowerRoute, ...purchasingPowerPopupRoute];

@NgModule({
  imports: [PlantyComparePortalSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PurchasingPowerComponent,
    PurchasingPowerDetailComponent,
    PurchasingPowerUpdateComponent,
    PurchasingPowerDeleteDialogComponent,
    PurchasingPowerDeletePopupComponent
  ],
  entryComponents: [
    PurchasingPowerComponent,
    PurchasingPowerUpdateComponent,
    PurchasingPowerDeleteDialogComponent,
    PurchasingPowerDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlantyComparePurchasingPowerPurchasingPowerModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
