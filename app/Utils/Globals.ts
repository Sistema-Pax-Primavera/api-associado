import { DateTime } from "luxon";

export interface FieldOptions {
    type: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'datetime';
    required: boolean;
    unique?: boolean;
    format?: string;
    default?: string | boolean | number | object | any[] | DateTime;
    enumValues?: string[] | number[];
    nestedFields?: Record<string, FieldOptions>;
}

export const portes = ['P', 'M', 'G', 'GG']
