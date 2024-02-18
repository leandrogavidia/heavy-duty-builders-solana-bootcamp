import { Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { computedAsync } from "ngxtension/computed-async";
import { ShyftApiService } from "./shyft-api.service";
import { WalletStore } from "@heavy-duty/wallet-adapter";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'heavy-duty-builders-solana-bootcamp-transactions-section',
    template: `
        <div *ngIf="accountTransactionHistory()" class="bg-gray-900/30 rounded-xl p-4 shadow-xl h-[90%] overflow-x-auto w-full min-w-[1200px]">
            
            <h2 class="text-2xl mb-8">Transactions: {{ accountTransactionHistory()?.length }}</h2>
            
            <div class="grid grid-cols-{{ tableOptions.length }} gap-x-8 mb-6">
                <p *ngFor="let option of tableOptions" class="font-medium">
                    {{ option }}
                </p>
            </div>

            <div *ngFor="let transaction of accountTransactionHistory(); index as i" class="grid grid-cols-{{ tableOptions.length }} gap-x-8 mb-4">
                    <p>{{ i + 1 }}</p>
                    <p>{{ transaction.type }}</p>
                    <p class="overflow-auto">{{ transaction.actions.at(-1)?.info?.sender }}</p>
                    <p class="overflow-auto">{{ transaction.actions.at(-1)?.info?.receiver }}</p>
                    <p>{{ transaction.actions.at(-1)?.info?.amount }}</p>
                    <p class="overflow-auto">{{ transaction.signatures[0] }}</p>
                    <p>{{ formatDate(transaction.timestamp) }}</p>
            </div>
        </div>
    `,
    standalone: true,
    imports: [CommonModule]
})

export class TransactionsSectionComponent {
    private readonly _shyftApiService = inject(ShyftApiService);
    private readonly _walletStore = inject(WalletStore);
    private readonly _publicKey = toSignal(this._walletStore.publicKey$);

    readonly accountTransactionHistory = computedAsync(
        () => this._shyftApiService.getTransactions(this._publicKey()?.toBase58()),
        { requireSync: false, }
    );

    readonly tableOptions = ["Nº", "Type", "Sender", "Receiver", "Amount", "Signature", "Date"]

    formatDate(date: string) {
        const parsedDate = new Date(date);

        const formattedDate = parsedDate.toLocaleString("es-419", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

        return formattedDate;
    }
}