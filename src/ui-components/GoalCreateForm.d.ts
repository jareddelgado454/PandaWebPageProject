/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type GoalCreateFormInputValues = {
    type?: string;
    goal?: number;
    monthYear?: string;
    createdAt?: string;
    updatedAt?: string;
};
export declare type GoalCreateFormValidationValues = {
    type?: ValidationFunction<string>;
    goal?: ValidationFunction<number>;
    monthYear?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    updatedAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GoalCreateFormOverridesProps = {
    GoalCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    type?: PrimitiveOverrideProps<SelectFieldProps>;
    goal?: PrimitiveOverrideProps<TextFieldProps>;
    monthYear?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    updatedAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type GoalCreateFormProps = React.PropsWithChildren<{
    overrides?: GoalCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: GoalCreateFormInputValues) => GoalCreateFormInputValues;
    onSuccess?: (fields: GoalCreateFormInputValues) => void;
    onError?: (fields: GoalCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GoalCreateFormInputValues) => GoalCreateFormInputValues;
    onValidate?: GoalCreateFormValidationValues;
} & React.CSSProperties>;
export default function GoalCreateForm(props: GoalCreateFormProps): React.ReactElement;
