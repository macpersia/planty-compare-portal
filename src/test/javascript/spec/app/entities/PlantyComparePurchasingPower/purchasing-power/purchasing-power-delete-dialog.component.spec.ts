/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PlantyComparePortalTestModule } from '../../../../test.module';
import { PurchasingPowerDeleteDialogComponent } from 'app/entities/PlantyComparePurchasingPower/purchasing-power/purchasing-power-delete-dialog.component';
import { PurchasingPowerService } from 'app/entities/PlantyComparePurchasingPower/purchasing-power/purchasing-power.service';

describe('Component Tests', () => {
  describe('PurchasingPower Management Delete Component', () => {
    let comp: PurchasingPowerDeleteDialogComponent;
    let fixture: ComponentFixture<PurchasingPowerDeleteDialogComponent>;
    let service: PurchasingPowerService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PlantyComparePortalTestModule],
        declarations: [PurchasingPowerDeleteDialogComponent]
      })
        .overrideTemplate(PurchasingPowerDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PurchasingPowerDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PurchasingPowerService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete('123');
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith('123');
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
