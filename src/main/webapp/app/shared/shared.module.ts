import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  PlantyComparePortalSharedLibsModule,
  PlantyComparePortalSharedCommonModule,
  JhiLoginModalComponent,
  HasAnyAuthorityDirective
} from './';

@NgModule({
  imports: [PlantyComparePortalSharedLibsModule, PlantyComparePortalSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [PlantyComparePortalSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlantyComparePortalSharedModule {
  static forRoot() {
    return {
      ngModule: PlantyComparePortalSharedModule
    };
  }
}
