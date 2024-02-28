import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";

export interface TransferFormModel {
    memo: string | null,
    amount: number | null,
    receiverAddress: string | null
}

export interface TransferFormPayload {
    memo: string,
    amount: number,
    receiverAddress: string
}

@Component({
    selector: "heavy-duty-builders-solana-bootcamp-transfer-form",
    template: `
        <form #form="ngForm" (ngSubmit)="onSubmitForm(form)")>
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
                <mat-label>Concepto</mat-label>
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
    readonly model: TransferFormModel = {
        memo: null,
        amount: null,
        receiverAddress: null
    }

    @Output() readonly submitForm = new EventEmitter<TransferFormPayload>()

    onSubmitForm(form: NgForm) {
        if (
            form.invalid || this.model.amount === null || this.model.memo === null || this.model.receiverAddress === null
        ) {
            console.error("El formulario es invalido")
        } else {
            this.submitForm.emit({
                amount: this.model.amount,
                memo: this.model.memo,
                receiverAddress: this.model.receiverAddress
            })
        }
    }
}