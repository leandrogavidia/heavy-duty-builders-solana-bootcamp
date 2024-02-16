import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, of } from "rxjs";

@Injectable({ providedIn: "root" })
export class ShyftApiService {
    private readonly _httpClient = inject(HttpClient);
    private readonly _header = { "x-api-key": "IKuvnVDhazm7wB27" };

    getAccountTokenList(publicKey: string | undefined | null) {
        if (!publicKey) {
            return of(null);
        }

        const url = new URL(`https://api.shyft.to/sol/v1/wallet/all_tokens`);
        url.searchParams.set("network", "mainnet-beta")
        url.searchParams.set("wallet", publicKey)

        const response = this._httpClient.get<{
            result: {
                balance: number,
                info: {
                    name: string,
                    symbol: string,
                    image: string
                }
            }[]
        }>(url.toString(), { headers: this._header })
            .pipe(map((response) => response.result))

        return response;
    }
}