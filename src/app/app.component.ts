import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';

import { CommonModule } from '@angular/common';
import { MatAnchor } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TransferModalComponent } from './transfer-modal.component';

@Component({
  standalone: true,
  imports: [RouterModule, HdWalletMultiButtonComponent, CommonModule, MatAnchor],
  selector: 'heavy-duty-builders-solana-bootcamp-root',
  template: `
  <header class="w-full flex justify-between items-center gap-x-8 gap-y-4 flex-wrap">
    <div class="flex justify-start items-center gap-x-3">
      <h1 class="text-3xl">Dashboard</h1>
      <nav class="w-full">
        <ul class="flex justify-end items-center gap-x-2">
          <li>
            <a [routerLink]="['']" mat-stroked-button>Balance</a>
          </li>
          <li>
            <a [routerLink]="['settings']"
            mat-stroked-button>Settings</a>
          </li>
        </ul>
      </nav>
    </div>

    <hd-wallet-multi-button [hdColor]="'basic'"></hd-wallet-multi-button>
    <button (click)="onTransfer()">Transferir</button>
  </header>
  
  <main class="my-6 h-full overflow-x-auto overflow-y-hidden">
    <router-outlet></router-outlet>
  </main>
  `,
})

export class AppComponent {
  private readonly _matDialog = inject(MatDialog)

  onTransfer() {
    console.log("HELLO WORLD")

    this._matDialog.open(TransferModalComponent)
  }
}