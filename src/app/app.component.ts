import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'heavy-duty-builders-solana-bootcamp-root',
  template: `
  <header>
    <h1>Hi, I'm Bob</h1>
  </header>`,
})
export class AppComponent {
  title = 'heavy-duty-builders-solana-bootcamp';
}