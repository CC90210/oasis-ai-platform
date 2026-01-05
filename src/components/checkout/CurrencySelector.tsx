interface CurrencySelectorProps {
    currency: 'usd' | 'cad';
    onCurrencyChange: (currency: 'usd' | 'cad') => void;
}

export function CurrencySelector({
    currency,
    onCurrencyChange,
}: CurrencySelectorProps) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Currency:</span>
            <div className="flex bg-gray-800 rounded-lg p-1">
                <button
                    onClick={() => onCurrencyChange('usd')}
                    className={`px-3 py-1 text-sm rounded-md transition ${currency === 'usd'
                            ? 'bg-cyan-500 text-black font-medium'
                            : 'text-gray-400 hover:text-white'
                        }`}
                >
                    🇺🇸 USD
                </button>
                <button
                    onClick={() => onCurrencyChange('cad')}
                    className={`px-3 py-1 text-sm rounded-md transition ${currency === 'cad'
                            ? 'bg-cyan-500 text-black font-medium'
                            : 'text-gray-400 hover:text-white'
                        }`}
                >
                    🇨🇦 CAD
                </button>
            </div>
        </div>
    );
}
