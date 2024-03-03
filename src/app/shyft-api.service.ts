import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, of } from "rxjs";

@Injectable({ providedIn: "root" })
export class ShyftApiService {
    private readonly _httpClient = inject(HttpClient);
    private readonly _key = "IKuvnVDhazm7wB27";
    private readonly _header = { "x-api-key": this._key };

    getEndpoint() {
        const url = new URL("https://rpc.shyft.to");
        url.searchParams.set("api_key", this._key);
        return url.toString();
    }

    getAccountTokenList(publicKey: string | undefined | null) {
        if (!publicKey) {
            return of(null);
        }

        const allTokensUrl = new URL(`https://api.shyft.to/sol/v1/wallet/all_tokens`);
        allTokensUrl.searchParams.set("network", "mainnet-beta")
        allTokensUrl.searchParams.set("wallet", publicKey)

        const response = this._httpClient.get<{
            result: {
                address: string,
                balance: number,
                info: {
                    decimals: number,
                    name: string,
                    symbol: string,
                    image: string
                }
            }[]
        }>(allTokensUrl.toString(), { headers: this._header })
            .pipe(map((response) => response.result))

        return response;
    }

    getTransactions(publicKey: string | undefined | null) {
        if (!publicKey) {
            return of(null);
        }

        const getTransactionsUrl = new URL(`https://api.shyft.to/sol/v1/transaction/history`);
        getTransactionsUrl.searchParams.set("network", "mainnet-beta")
        getTransactionsUrl.searchParams.set("account", publicKey)
        getTransactionsUrl.searchParams.set("enable_raw", "true")

        const transactionTypes = ["SOL_TRANSFER", "TOKEN_TRANSFER", "SWAP"];

        const response = this._httpClient.get<{
            result: {
                timestamp: string,
                actions: {
                    info: {
                        sender: string,
                        receiver: string,
                        amount: number
                    }
                }[],
                signatures: string[],
                type: string
            }[]
        }>(getTransactionsUrl.toString(), { headers: this._header })
            .pipe(map((response) => {
                return response.result.filter((t) => transactionTypes.includes(t.type))
            }))
        return response;
    }
}