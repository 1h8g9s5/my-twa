import { useTonConnectUI } from '@tonconnect/ui-react';
import { Sender, SenderArguments } from '@ton/core';

export function useTonConnect() : {sender: Sender; connected: boolean } {
    const [TonConnectUI] = useTonConnectUI();
    
    return {
        sender: {
            send: async (args: SenderArguments) => {
                TonConnectUI.sendTransaction({
                    messages: [
                        {
                            address:args.to.toString(),
                            amount:args.value.toString(),
                            payload:args.body?.toBoc().toString('base64'),
                        },
                    ],
                    validUntil: Date.now() + 5 * 60 * 1000,
                });
            },
        },
        connected: TonConnectUI.connected,
    };
}