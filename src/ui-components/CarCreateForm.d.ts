/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CarCreateFormInputValues = {
    description?: string;
    brand?: string;
    image?: string;
    model?: string;
    year?: string;
    identificationNumber?: string;
};
export declare type CarCreateFormValidationValues = {
    description?: ValidationFunction<string>;
    brand?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
    model?: ValidationFunction<string>;
    year?: ValidationFunction<string>;
    identificationNumber?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CarCreateFormOverridesProps = {
    CarCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    brand?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    model?: PrimitiveOverrideProps<TextFieldProps>;
    year?: PrimitiveOverrideProps<TextFieldProps>;
    identificationNumber?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CarCreateFormProps = React.PropsWithChildren<{
    overrides?: CarCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CarCreateFormInputValues) => CarCreateFormInputValues;
    onSuccess?: (fields: CarCreateFormInputValues) => void;
    onError?: (fields: CarCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CarCreateFormInputValues) => CarCreateFormInputValues;
    onValidate?: CarCreateFormValidationValues;
} & React.CSSProperties>;
export default function CarCreateForm(props: CarCreateFormProps): React.ReactElement;
