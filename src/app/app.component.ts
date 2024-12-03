import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CampaignFormComponent } from "./campaign-form/campaign-form.component";
import { CampaignListComponent } from "./campaign-list/campaign-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CampaignFormComponent, CampaignListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'campaign-crud';
}
