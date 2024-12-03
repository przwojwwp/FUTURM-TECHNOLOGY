import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CampaignFormComponent } from "./campaign-form/campaign-form.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CampaignFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'campaign-crud';
}
