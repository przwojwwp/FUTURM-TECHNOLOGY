import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign.service';
import { Campaign } from '../models/campaign.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-campaign-list',
  standalone: true, // Ustawienie na standalone component
  imports: [CommonModule], // Importowanie CommonModule
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss']
})
export class CampaignListComponent implements OnInit {
  campaigns: Campaign[] = [];

  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {
    this.campaigns = this.campaignService.getCampaigns();
  }

  deleteCampaign(index: number): void {
    this.campaignService.deleteCampaign(index);
    this.campaigns = this.campaignService.getCampaigns();
  }

  // Nowa metoda editCampaign
  editCampaign(index: number): void {
    const campaignToEdit = this.campaigns[index];

    console.log('Edit campaign:', campaignToEdit);
  }
}
