import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CampaignService } from '../campaign.service';
import { Campaign } from '../models/campaign.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss'],
  imports: [CommonModule, MatTableModule, MatButtonModule]
})
export class CampaignListComponent implements OnInit {
  @Input() campaigns: Campaign[] = [];
  @Output() campaignSelected = new EventEmitter<Campaign>();

  displayedColumns: string[] = ['name', 'keywords', 'bidAmount', 'campaignFund', 'status', 'town', 'radius', 'actions'];

  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {
    this.campaignService.getCampaigns().subscribe(campaigns => {
      this.campaigns = campaigns;
    });
  }

  deleteCampaign(index: number): void {
    this.campaignService.deleteCampaign(index);
  }

  editCampaign(campaign: Campaign): void {
    this.campaignSelected.emit(campaign);
  }

}
