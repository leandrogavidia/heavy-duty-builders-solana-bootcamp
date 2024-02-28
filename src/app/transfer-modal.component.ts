import { Component } from "@angular/core";
import { TransferFormComponent } from "./transfer-form.component";

@Component({
    selector: "heavy-duty-builders-solana-bootcamp-transfer-modal",
    template: `
        <h2>Transferir fondos</h2>

        <heavy-duty-builders-solana-bootcamp-transfer-form></heavy-duty-builders-solana-bootcamp-transfer-form>
    `,
    standalone: true,
    imports: [TransferFormComponent]
})

export class TransferModalComponent {

}