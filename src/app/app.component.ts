import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { ShyftApiService } from './shyft-api.service';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { toSignal } from "@angular/core/rxjs-interop";
import { computedAsync } from "ngxtension/computed-async";
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, HdWalletMultiButtonComponent, CommonModule],
  selector: 'heavy-duty-builders-solana-bootcamp-root',
  template: `
  <header>
    <h1>Hi, I'm Bob</h1>
    <hd-wallet-multi-button></hd-wallet-multi-button>
    
    <div *ngIf="account()">
      <h2>Account Data:</h2>
      <ul *ngFor="let token of account()">
        <li>
          <p>Name: {{ token.info.name }}</p>
          <p>Symbol: {{ token.info.symbol }}</p>
          <p>Balance: {{ token.balance }}</p>
          <img [src]="token.info.image" class="w-8 h-8" />
        </li>
      </ul>
    </div>
  </header>`,
})

export class AppComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly account = computedAsync(
    () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
    { requireSync: true }
  );
}