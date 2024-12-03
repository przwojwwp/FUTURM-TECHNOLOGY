export class Campaign {
  constructor(
    public name: string,
    public keywords: string[],
    public bidAmount: number,
    public campaignFund: number,
    public status: boolean,
    public town: string,
    public radius: number
  ) {}
}
