import { Component } from "@angular/core";
import { HeroSectionComponent } from "./hero-section.component";
import { FeaturesSectionComponent } from "./features-section.section";

@Component({
    selector: 'heavy-duty-builders-solana-bootcamp-home',
    template: `
        <heavy-duty-builders-solana-bootcamp-hero-section></heavy-duty-builders-solana-bootcamp-hero-section>
        <heavy-duty-builders-solana-bootcamp-features-section></heavy-duty-builders-solana-bootcamp-features-section>
    `,
    standalone: true,
    imports: [HeroSectionComponent, FeaturesSectionComponent]
})

export class HomePageComponent { }