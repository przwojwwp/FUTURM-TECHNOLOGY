import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Campaign } from "../models/campaign.model";
import { CampaignService } from "../campaign.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
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

  ngOnInit(): void {
    if (this.campaign) {
      this.campaignForm.patchValue(this.campaign);
    }
  }

  onSubmit(): void {
    if (this.campaignForm.valid) {
      const formValues = this.campaignForm.value;
      const newCampaign = new Campaign(
        formValues.name,
        formValues.keywords.split(','),
        formValues.bidAmount,
        formValues.campaignFund,
        formValues.status,
        formValues.town,
        formValues.radius
      );

      if (this.campaign) {
        const index = this.campaignService.getCampaigns().indexOf(this.campaign);
        this.campaignService.updateCampaign(index, newCampaign);
      } else {
        this.campaignService.createCampaign(newCampaign);
      }
      this.formSubmitted.emit();
      this.campaignForm.reset();
    }
  }
}
