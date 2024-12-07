import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormGroupDirective } from '@angular/forms';
import { Campaign } from '../models/campaign.model';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatAutocompleteModule,
  ],
})
export class CampaignFormComponent implements OnInit
{
  @Input() showModal: boolean = false;
  @Input() campaign: Campaign | null = null;
  @Input() availableFunds: number = 0;
  @Input() allFunds: number = 5000;
  @Output() formSubmitted = new EventEmitter<Campaign>();
  @Output() closeModal = new EventEmitter<void>();
  campaignForm: FormGroup;

  towns = ['New York', 'Los Angeles', 'Chicago', 'Houston'];
  statusOptions = [true, false];
  filteredKeywords!: Observable<string[]>;
  availableKeywords = ['Marketing', 'SEO', 'Google Ads', 'Social Media', 'Branding'];
  showErrorMessage: boolean = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.campaignForm = this.fb.group({
      name: ['', Validators.required],
      keywords: ['', Validators.required],
      bidAmount: [1, [Validators.required, Validators.min(1)]],
      campaignFund: [300, [Validators.required, Validators.min(300)]],
      status: [true, Validators.required],
      town: ['', Validators.required],
      radius: [undefined, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void
  {
    if (this.campaign) {
      const formattedKeywords = this.campaign.keywords.join(', ');  // Łączenie z przecinkiem i spacją
      this.campaignForm.patchValue({
        ...this.campaign,
        keywords: formattedKeywords,  // Przekazanie odpowiednio sformatowanej wartości
        status: this.campaign.status,
      });
    }

    this.filteredKeywords = this.campaignForm.get('keywords')!.valueChanges.pipe(
      startWith(''),
      map((value: string | null) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const keywords = value.split(',').map(k => k.trim().toLowerCase());
    const lastKeyword = keywords[keywords.length - 1] || '';
    return this.availableKeywords.filter(option =>
      option.toLowerCase().includes(lastKeyword)
    );
  }

  addKeyword(keyword: string): void {
    const existingKeywords = this.campaignForm.get('keywords')!.value || '';
    const allKeywords = existingKeywords
      .split(',')
      .map((k: string) => k.trim())
      .filter((k: string) => k);

    if (!allKeywords.includes(keyword)) {
      allKeywords.push(keyword);
    }

    this.campaignForm.get('keywords')!.setValue(allKeywords.join(', '));

    if (!this.availableKeywords.includes(keyword)) {
      this.availableKeywords.push(keyword);
    }
  }

  onBlur(controlName: string): void {
    const control = this.campaignForm.get(controlName);
    if (control && control.value.trim() === '') {
      control.setErrors({ required: true });
    }
  }

  resetForm() {
    this.campaignForm.reset();
  }

  onCancel(): void {
    this.closeModal.emit();
  }

  onSubmit(form: FormGroupDirective): void
  {
    if (this.allFunds + 1 <= this.campaignForm.get('campaignFund')?.value)
    {
      this.errorMessage = 'Not enough funds';
      this.showErrorMessage = true;

      setTimeout(() => {
        this.showErrorMessage = false;
      }, 3000);

      return;
    }

      if (this.campaignForm.invalid) {
        this.errorMessage = 'All fields are required';
        this.showErrorMessage = true;

        setTimeout(() => {
          this.showErrorMessage = false;
        }, 3000);

        return;
      }

      if (this.campaignForm.get('bidAmount')?.value > this.campaignForm.get('campaignFund')?.value)
      {
        this.errorMessage = 'Campaign Funds must be greater than Minimal Bid';
        this.showErrorMessage = true;

        setTimeout(() => {
          this.showErrorMessage = false;
        }, 3000);

        return;
      }

      if (this.availableFunds < this.campaignForm.get('campaignFund')?.value) {
        this.errorMessage = 'Not enough funds to submit the campaign.';
        this.showErrorMessage = true;

        setTimeout(() => {
          this.showErrorMessage = false;
        }, 3000);

        return;
      }


    if (this.campaignForm.valid) {
      const formValues = this.campaignForm.value;
      const newCampaign = new Campaign(
        formValues.name,
        formValues.keywords.split(',').map((k: string) => k.trim()),
        formValues.bidAmount,
        formValues.campaignFund,
        formValues.status,
        formValues.town,
        formValues.radius
      );

      this.formSubmitted.emit(newCampaign);

      form.resetForm();

      this.filteredKeywords = this.campaignForm.get('keywords')!.valueChanges.pipe(
        startWith(''),
        map(() => this._filter(''))
      );
    }
  }
}
