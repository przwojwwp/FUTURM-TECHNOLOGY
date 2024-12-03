import { Injectable } from '@angular/core';
import { Campaign } from './models/campaign.model';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private campaigns: Campaign[] = [
    new Campaign('Black Friday Sale', ['Electronics', 'Discount'], 100, 500, true, 'New York', 10),
    new Campaign('Christmas Sale', ['Toys', 'Gift'], 150, 300, false, 'Los Angeles', 20),
  ];

  getCampaigns() {
    return [...this.campaigns];
  }

  createCampaign(campaign: Campaign) {
    this.campaigns.push(campaign);
  }

  updateCampaign(index: number, updatedCampaign: Campaign) {
    this.campaigns[index] = updatedCampaign;
  }

  deleteCampaign(index: number) {
    this.campaigns.splice(index, 1);
  }
}
