import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPurchasingPower } from 'app/shared/model/PlantyComparePurchasingPower/purchasing-power.model';

@Component({
  selector: 'jhi-purchasing-power-detail',
  templateUrl: './purchasing-power-detail.component.html'
})
export class PurchasingPowerDetailComponent implements OnInit {
  purchasingPower: IPurchasingPower;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ purchasingPower }) => {
      this.purchasingPower = purchasingPower;
    });
  }

  previousState() {
    window.history.back();
  }
}
