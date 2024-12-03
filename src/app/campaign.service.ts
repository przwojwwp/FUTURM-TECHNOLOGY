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
}
