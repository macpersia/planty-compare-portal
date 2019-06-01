import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPurchasingPower, PurchasingPower } from 'app/shared/model/PlantyComparePurchasingPower/purchasing-power.model';
import { PurchasingPowerService } from './purchasing-power.service';

@Component({
  selector: 'jhi-purchasing-power-update',
  templateUrl: './purchasing-power-update.component.html'
})
export class PurchasingPowerUpdateComponent implements OnInit {
  purchasingPower: IPurchasingPower;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    year: [],
    city: [],
    category: [],
    value: []
  });

  constructor(
    protected purchasingPowerService: PurchasingPowerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ purchasingPower }) => {
      this.updateForm(purchasingPower);
      this.purchasingPower = purchasingPower;
    });
  }

  updateForm(purchasingPower: IPurchasingPower) {
    this.editForm.patchValue({
      id: purchasingPower.id,
      year: purchasingPower.year,
      city: purchasingPower.city,
      category: purchasingPower.category,
      value: purchasingPower.value
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const purchasingPower = this.createFromForm();
    if (purchasingPower.id !== undefined) {
      this.subscribeToSaveResponse(this.purchasingPowerService.update(purchasingPower));
    } else {
      this.subscribeToSaveResponse(this.purchasingPowerService.create(purchasingPower));
    }
  }

  private createFromForm(): IPurchasingPower {
    const entity = {
      ...new PurchasingPower(),
      id: this.editForm.get(['id']).value,
      year: this.editForm.get(['year']).value,
      city: this.editForm.get(['city']).value,
      category: this.editForm.get(['category']).value,
      value: this.editForm.get(['value']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPurchasingPower>>) {
    result.subscribe((res: HttpResponse<IPurchasingPower>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
