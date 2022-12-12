export interface DateValidationProtocol {
    dateConvert: DateValidationFunction;
}

export interface DateValidationFunction {
    (value: string): string;
}

// Adapter pattern -> Conversão de valores para funcionamento no backend