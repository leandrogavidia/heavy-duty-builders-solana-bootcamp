import { Component, EventEmitter, Output, inject, input } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ShyftApiService } from "./shyft-api.service";
import { computedAsync } from "ngxtension/computed-async";
import { injectPublicKey } from "@heavy-duty/wallet-adapter";

export interface TransferFormModel {
    memo: string | null,
    amount: number | null,
    token: string | null,
    receiverAddress: string | null
}

export interface TransferFormPayload {
    memo: string,
    amount: number,
    token: string,
    receiverAddress: string
}

@Component({
    selector: "heavy-duty-builders-solana-bootcamp-transfer-form",
    template: `
        <form 
            #form="ngForm" 
            (ngSubmit)="onSubmitForm(form)"
        >
            <fieldset
                class="flex flex-col justify-center items-center gap-y-3"
                [disabled]="this.isDisabled()"
            >
                <mat-form-field appearance="fill">
                    <mat-label>Concepto</mat-label>
                    <input 
                        name="memo"
                        type="text"
                        matInput 
                        placeholder="Ej. Pagar el recibo de electricidad"
                        [(ngModel)]="model.memo"
                        required
                        #memoControl="ngModel"
                    >
                    <mat-icon matSuffix>description</mat-icon>
    
                    @if (form.submitted && memoControl.errors) {
                        <mat-error>
                            @if (memoControl.errors["required"]) {
                                El Concepto es obligatorio.
                            }
                        </mat-error>
                    } @else {
                        <mat-hint>Debe ser el motivo de la transferencia</mat-hint>
                    }
                </mat-form-field>
    
                <mat-form-field appearance="fill">
                    <mat-label>Token</mat-label>
                    <select 
                        name="token" 
                        placeholder="ej. Silly"
                        [(ngModel)]="model.token"
                        required
                        #tokenControl="ngModel"
                        matNativeControl
                    >
                        @for (token of tokenList(); track token.address) {
                            <option [value]="token.address">{{ token.info.name }} | {{ token.info.symbol }}</option>
                        }
                    </select>   
                    
                    <mat-icon matSuffix>attach_money</mat-icon>
    
                    @if (form.submitted && memoControl.errors) {
                        <mat-error>
                            @if (tokenControl.errors) {
                                @if (tokenControl.errors["required"]) {
                                    El Token es obligatorio.
                                }
                            }
                        </mat-error>
                    } @else {
                        <mat-hint>Debe ser el token de la transferencia</mat-hint>
                    }
                </mat-form-field>
    
                <mat-form-field appearance="fill">
                    <mat-label>Monto</mat-label>
                    <input 
                        name="amount"
                        type="number"
                        matInput
                        min="0"
                        placeholder="Ej. 15"
                        [(ngModel)]="model.amount"
                        required
                        #amountControl="ngModel"
                    >
                    <mat-icon matSuffix>attach_money</mat-icon>
    
                    @if (form.submitted && amountControl.errors) {
                        <mat-error>
                            @if (amountControl.errors["required"]) {
                                El monto es obligatorio.
                            } @else if (amountControl.errors["mint"]) {
                                El monto debe ser mayor a 0
                            }
                        </mat-error>
                    } @else {
                        <mat-hint>Debe ser un monto mayor a 0</mat-hint>
                    }
                </mat-form-field>
    
                <mat-form-field appearance="fill">
                    <mat-label>Destinatario</mat-label>
                    <input 
                        name="receiverAddress"
                        type="text"
                        matInput 
                        placeholder="Ej. Wallet del destinatario"
                        [(ngModel)]="model.receiverAddress"
                        required
                        #receiverAddressControl="ngModel"
                    >
                    <mat-icon matSuffix>key</mat-icon>
    
                    @if (form.submitted && receiverAddressControl.errors) {
                        <mat-error>
                            @if (receiverAddressControl.errors["required"]) {
                                El La wallet del destinatario es obligatoria.
                            }
                        </mat-error>
                    } @else {
                        <mat-hint>Wallet del destinatario en la transferencia</mat-hint>
                    }
                </mat-form-field>
    
                <button type="submit">Enviar</button>
            </fieldset>
        </form>
    `,
    standalone: true,
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInput,
        MatIcon,
        MatButton
    ]
})

export class TransferFormComponent {
    readonly isDisabled = input.required<boolean>();

    readonly model: TransferFormModel = {
        memo: null,
        amount: null,
        receiverAddress: null,
        token: null
    }

    private readonly _publicKey = injectPublicKey()
    private readonly _shyApiService = inject(ShyftApiService);
    readonly tokenList = computedAsync(
        () => this._shyApiService.getAccountTokenList(this._publicKey()?.toBase58()),
        { requireSync: false }
    )

    @Output() readonly submitForm = new EventEmitter<TransferFormPayload>()

    onSubmitForm(form: NgForm) {
        if (
            form.invalid ||
            this.model.amount === null ||
            this.model.memo === null ||
            this.model.receiverAddress === null ||
            this.model.token === null
        ) {
            console.error("El formulario es invalido")
        } else {
            const decimals = this.tokenList()?.find((token) => token.address === this.model.token)?.info?.decimals
            if (decimals) {
                this.submitForm.emit({
                    memo: this.model.memo,
                    amount: this.model.amount * 10 ** decimals,
                    token: this.model.token,
                    receiverAddress: this.model.receiverAddress
                })
            }
        }
    }
}