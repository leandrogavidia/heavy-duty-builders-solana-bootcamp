import { Component, computed } from "@angular/core";
import { TransferFormComponent, TransferFormPayload } from "./transfer-form.component";
import { injectTransactionSender } from "@heavy-duty/wallet-adapter";
import { createTransferInstructions } from "@heavy-duty/spl-utils";

@Component({
    selector: "heavy-duty-builders-solana-bootcamp-transfer-modal",
    template: `
        <div class="p-4">
            <h2 class="mb-4">Transferir fondos</h2>
            <heavy-duty-builders-solana-bootcamp-transfer-form 
                (submitForm)="onTransfer($event)"
                [isDisabled]="this.isRunning()"
            ></heavy-duty-builders-solana-bootcamp-transfer-form>
        </div>
    `,
    standalone: true,
    imports: [TransferFormComponent],
})

export class TransferModalComponent {
    private readonly _transactionSender = injectTransactionSender();
    private readonly _transactionStatus = computed(() => this._transactionSender().status);

    readonly isRunning = computed(() =>
        this._transactionStatus() === "confirming" ||
        this._transactionStatus() === "finalizing" ||
        this._transactionStatus() === "confirming"
    )

    readonly isSuccess = computed(() => this._transactionStatus() === "finalized");
    readonly isFailed = computed(() => this._transactionStatus() === "failed")

    onTransfer(payload: TransferFormPayload) {
        this._transactionSender.send(({ publicKey }) => createTransferInstructions({
            amount: payload.amount,
            mintAddress: payload.token,
            receiverAddress: payload.receiverAddress,
            senderAddress: publicKey.toBase58(),
            fundReceiver: true,
            memo: payload.memo
        })).subscribe({
            next: (signature) => console.log(`Firma: ${signature}`),
            error: (error) => console.error(error),
            complete: () => console.log("Transaction lista"),
        })
    }
}