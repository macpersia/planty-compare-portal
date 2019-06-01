/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { PlantyComparePortalTestModule } from '../../../../test.module';
import { PurchasingPowerUpdateComponent } from 'app/entities/PlantyComparePurchasingPower/purchasing-power/purchasing-power-update.component';
import { PurchasingPowerService } from 'app/entities/PlantyComparePurchasingPower/purchasing-power/purchasing-power.service';
import { PurchasingPower } from 'app/shared/model/PlantyComparePurchasingPower/purchasing-power.model';

describe('Component Tests', () => {
  describe('PurchasingPower Management Update Component', () => {
    let comp: PurchasingPowerUpdateComponent;
    let fixture: ComponentFixture<PurchasingPowerUpdateComponent>;
    let service: PurchasingPowerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PlantyComparePortalTestModule],
        declarations: [PurchasingPowerUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PurchasingPowerUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PurchasingPowerUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PurchasingPowerService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PurchasingPower('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new PurchasingPower();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
