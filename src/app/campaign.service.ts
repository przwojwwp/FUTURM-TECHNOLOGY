import { Injectable } from '@angular/core';
import { Campaign } from './models/campaign.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private campaigns: Campaign[] = [
    new Campaign('Black Friday Sale', ['Electronics', 'Discount'], 100, 500, true, 'New York', 10),
    new Campaign('Christmas Sale', ['Toys', 'Gift'], 150, 300, false, 'Los Angeles', 20),
  ];

  private campaignsSubject = new BehaviorSubject<Campaign[]>(this.campaigns);

  setCampaigns(campaigns: Campaign[]): void {
    this.campaigns = campaigns;
    this.campaignsSubject.next([...this.campaigns]);
  }


  getCampaigns() {
    return this.campaignsSubject.asObservable();
  }

  createCampaign(campaign: Campaign) {
    this.campaigns.push(campaign);
    this.campaignsSubject.next([...this.campaigns]);
  }

  updateCampaign(index: number, updatedCampaign: Campaign) {
    this.campaigns[index] = updatedCampaign;
    this.campaignsSubject.next([...this.campaigns]);
  }

  deleteCampaign(index: number) {
    this.campaigns.splice(index, 1);
    this.campaignsSubject.next([...this.campaigns]);
  }
}
