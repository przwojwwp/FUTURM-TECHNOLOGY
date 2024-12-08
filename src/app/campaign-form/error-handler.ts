import { FormGroup } from "@angular/forms";
import { Campaign } from "../models/campaign.model";

export class ErrorHandler {
  static handleCampaignErrors(
    campaignForm: FormGroup,
    availableFunds: number,
    campaign?: Campaign | null
  ): { errorMessage: string; isValid: boolean } {
    const newCampaignFund = campaignForm.get('campaignFund')?.value;
    const oldCampaignFund = campaign?.campaignFund || 0;
    const adjustedAvailableFunds = availableFunds + oldCampaignFund;

    if (adjustedAvailableFunds < newCampaignFund) {
      return { errorMessage: 'Not enough funds to submit the campaign.', isValid: false };
    }

    if (campaignForm.invalid) {
      return { errorMessage: 'All fields are required.', isValid: false };
    }

    if (campaignForm.get('bidAmount')?.value > newCampaignFund) {
      return { errorMessage: 'Campaign Funds must be greater than Minimal Bid.', isValid: false };
    }

    return { errorMessage: '', isValid: true };
  }
}
