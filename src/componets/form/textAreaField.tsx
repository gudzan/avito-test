import { ChangeEvent } from "react";

type TextAreaFieldProps = {
    label: string;
    name: string;
    value: any | null;
    required: boolean;
    error?: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function TextAreaField({
    label,
    name,
    value,
    required,
    onChange,
}: TextAreaFieldProps) {
    return (
        <div className="mb-4">
            <label className="mb-1" htmlFor={name}>
                {label}
            </label>
            <div className="has-validation input-group">
                <textarea
                    required={required}
                    className="form-control"
                    id={name}
                    name={name}
                    onChange={onChange}
                    value={value !== null ? value : ""}
                />
            </div>
        </div>
    );
}
