import { Component } from "@angular/core";
import { BalanceSectionComponent } from "./balance-section.component";
import { FeaturesSectionComponent } from "./features-section.section";

@Component({
    selector: 'heavy-duty-builders-solana-bootcamp-home',
    template: `
        <heavy-duty-builders-solana-bootcamp-balance-section></heavy-duty-builders-solana-bootcamp-balance-section>
        <!-- <heavy-duty-builders-solana-bootcamp-features-section></heavy-duty-builders-solana-bootcamp-features-section> -->
    `,
    standalone: true,
    imports: [BalanceSectionComponent, FeaturesSectionComponent]
})

export class BalancePageComponent { }