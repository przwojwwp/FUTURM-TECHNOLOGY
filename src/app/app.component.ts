import { Component, OnInit } from '@angular/core';
import { Campaign } from './models/campaign.model';
import { CampaignService } from './campaign.service';
import { CampaignFormComponent } from './campaign-form/campaign-form.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CommonModule } from '@angular/common';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CampaignFormComponent, CampaignListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'campaign-crud';
  selectedCampaign: Campaign | null = null;
  showModal = false;
  campaigns: Campaign[] = [];
  availableFunds = 5000;
  allFunds = this.availableFunds;

  errorMessage: string | null = null;
  showErrorMessage = false;

  constructor(private campaignService: CampaignService, private storageService: StorageService) {}

  ngOnInit(): void {
    const storedCampaigns = this.storageService.getItem<Campaign[]>('campaigns');
    if (storedCampaigns) {
      this.campaignService.setCampaigns(storedCampaigns);
    }

    this.campaignService.getCampaigns().subscribe(campaigns => {
      this.campaigns = campaigns;
      this.storageService.setItem('campaigns', campaigns);
      this.updateAvailableFunds();
    });
  }

  onFormSubmitted(newCampaign: Campaign): void {
    this.campaignService.createCampaign(newCampaign);
    this.updateAvailableFunds();
  }

  onCampaignSelected(campaign: Campaign): void {
    this.selectedCampaign = campaign;
    this.allFunds = this.selectedCampaign.campaignFund + this.availableFunds;
    console.log(this.allFunds);
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedCampaign = null;
  }

  onCampaignUpdated(updatedCampaign: Campaign): void {
    if (this.selectedCampaign)
    {
      const index = this.campaigns.indexOf(this.selectedCampaign);
      if (index !== -1) {
        this.campaignService.updateCampaign(index, updatedCampaign);
        this.updateAvailableFunds();
      }
    }
    this.closeModal();
  }

  updateAvailableFunds(): void {
    this.availableFunds = this.campaigns.reduce((funds, campaign) => {
      return campaign.status ? funds - campaign.campaignFund : funds;
    }, 5000);
  }
}
