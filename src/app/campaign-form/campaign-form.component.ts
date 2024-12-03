import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Campaign } from "../models/campaign.model";
import { CampaignService } from "../campaign.service";

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.scss']
})
export class CampaignFormComponent implements OnInit
{

  @Input() campaign: Campaign | null = null;
  @Output() formSubmitted = new EventEmitter<void>();
  campaignForm: FormGroup;

  towns = ['New York', 'Los Angeles', 'Chicago', 'Houston'];
  statusOptions = [true, false];

  constructor(private fb: FormBuilder, private campaignService: CampaignService) {
    this.campaignForm = this.fb.group({
      name: ['', Validators.required],
      keywords: ['', Validators.required],
      bidAmount: [0, [Validators.required, Validators.min(1)]],
      campaignFund: [0, [Validators.required, Validators.min(1)]],
      status: [true, Validators.required],
      town: ['', Validators.required],
      radius: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void
  {
    throw new Error("Method not implemented.");
  }
}
