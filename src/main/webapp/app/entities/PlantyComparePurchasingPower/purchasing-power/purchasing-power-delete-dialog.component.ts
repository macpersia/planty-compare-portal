import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPurchasingPower } from 'app/shared/model/PlantyComparePurchasingPower/purchasing-power.model';
import { PurchasingPowerService } from './purchasing-power.service';

@Component({
  selector: 'jhi-purchasing-power-delete-dialog',
  templateUrl: './purchasing-power-delete-dialog.component.html'
})
export class PurchasingPowerDeleteDialogComponent {
  purchasingPower: IPurchasingPower;

  constructor(
    protected purchasingPowerService: PurchasingPowerService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.purchasingPowerService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'purchasingPowerListModification',
        content: 'Deleted an purchasingPower'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-purchasing-power-delete-popup',
  template: ''
})
export class PurchasingPowerDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ purchasingPower }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PurchasingPowerDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.purchasingPower = purchasingPower;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/purchasing-power', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/purchasing-power', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
