import { Component, inject } from "@angular/core";
import { BalanceSectionComponent } from "./balance-section.component";
import { TransactionsSectionComponent } from "./transactions-section.component";
import { CommonModule } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";
import { ShyftApiService } from "./shyft-api.service";
import { WalletStore } from "@heavy-duty/wallet-adapter";
import { computedAsync } from "ngxtension/computed-async";
import { MatAnchor } from '@angular/material/button';

@Component({
    selector: 'heavy-duty-builders-solana-bootcamp-home',
    template: `
        <div *ngIf="accountTokenList()">
            <div class="flex justify-start gap-x-4 items-center mb-4">
                <button (click)="toggleSection(true)" class="bg-gray-900/30 rounded-lg shadow-sm w-28 h-11 block">Token list</button>
                <button (click)="toggleSection(false)" class="bg-gray-900/30 rounded-lg shadow-sm w-40 h-11 block">Transaction history</button>
            </div>
            <div *ngIf="isBalanceSection">
                <heavy-duty-builders-solana-bootcamp-balance-section></heavy-duty-builders-solana-bootcamp-balance-section>
            </div>
            <div *ngIf="!isBalanceSection">
                <heavy-duty-builders-solana-bootcamp-transactions-section></heavy-duty-builders-solana-bootcamp-transactions-section>
            </div>
        </div>
    `,
    standalone: true,
    imports: [
        BalanceSectionComponent,
        TransactionsSectionComponent,
        CommonModule,
        MatAnchor
    ]
})

export class BalancePageComponent {
    isBalanceSection = true;

    private readonly _shyftApiService = inject(ShyftApiService);
    private readonly _walletStore = inject(WalletStore);
    readonly _publicKey = toSignal(this._walletStore.publicKey$);

    readonly accountTokenList = computedAsync(
        () => this._shyftApiService.getAccountTokenList(this._publicKey()?.toBase58()),
        { requireSync: false }
    );

    toggleSection(value: boolean) {
        this.isBalanceSection = value;
    }
}