import { DateValidationFunction } from "./date-validation-protocol";

export const dateValidationFunction: DateValidationFunction = (value: string,): string => {
    const data = new Date(value).toISOString();
    return data;
};

// Adapter pattern -> Conversão de valores para funcionamento no backend