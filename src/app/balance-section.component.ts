import { Component } from "@angular/core";
import { ShyftApiService } from './shyft-api.service';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { toSignal } from "@angular/core/rxjs-interop";
import { computedAsync } from "ngxtension/computed-async";
import { inject } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'heavy-duty-builders-solana-bootcamp-balance-section',
    template: `
        <div class="bg-gray-900/30 rounded-xl p-4 shadow-xl h-[90%]">
            <div class="flex justify-between items-center mb-8">
                <h2 class="text-2xl">Tokens: {{ accountTokenList()?.length }}</h2>
                <p class="text-2xl">Balance</p>
            </div>
            <ul class="flex flex-col justify-center items-start gap-y-6">
                <li *ngFor="let token of accountTokenList()" class="flex justify-between items-center gap-x-4 w-full border-b-gray-700 border-b-[1px] pb-3">
                    <div class="flex justify-start gap-x-2 items-center">
                        <img [src]="token.info.image" class="w-8 h-8 rounded-full" />
                        <p class="font-medium">{{ token.info.name }}</p>
                    </div>
                    <p>{{ token.balance }} {{ token.info.symbol }}</p>
                </li>
            </ul>
        </div>
    `,
    standalone: true,
    imports: [CommonModule]
})

export class BalanceSectionComponent {
    private readonly _shyftApiService = inject(ShyftApiService);
    private readonly _walletStore = inject(WalletStore);
    private readonly _publicKey = toSignal(this._walletStore.publicKey$);

    readonly accountTokenList = computedAsync(
        () => this._shyftApiService.getAccountTokenList(this._publicKey()?.toBase58()),
        { requireSync: false }
    );
}