/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlantyComparePortalTestModule } from '../../../../test.module';
import { PurchasingPowerDetailComponent } from 'app/entities/PlantyComparePurchasingPower/purchasing-power/purchasing-power-detail.component';
import { PurchasingPower } from 'app/shared/model/PlantyComparePurchasingPower/purchasing-power.model';

describe('Component Tests', () => {
  describe('PurchasingPower Management Detail Component', () => {
    let comp: PurchasingPowerDetailComponent;
    let fixture: ComponentFixture<PurchasingPowerDetailComponent>;
    const route = ({ data: of({ purchasingPower: new PurchasingPower('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PlantyComparePortalTestModule],
        declarations: [PurchasingPowerDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PurchasingPowerDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PurchasingPowerDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.purchasingPower).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
