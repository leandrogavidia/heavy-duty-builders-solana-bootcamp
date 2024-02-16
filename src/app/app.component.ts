import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';

@Component({
  standalone: true,
  imports: [RouterModule, HdWalletMultiButtonComponent],
  selector: 'heavy-duty-builders-solana-bootcamp-root',
  template: `
  <header>
    <h1>Hi, I'm Bob</h1>
    <hd-wallet-multi-button></hd-wallet-multi-button>
  </header>`,
})
export class AppComponent {
  title = 'Heavy Duty Builders Solana Bootcamp';
}