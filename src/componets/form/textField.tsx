import { ChangeEvent } from "react";
import "./form.css"

type TextFieldProps = {
    label: string;
    name: string;
    value: any | null;
    required: boolean;
    type: string;
    error?: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function TextField({
    label,
    name,
    value,
    required,
    type,
    onChange,
}: TextFieldProps) {
    return (
        <div className="mb-4">
            <label className="mb-1" htmlFor={name}>{label}</label>
            <div className="has-validation input-group">
                <input
                    required={required}
                    className="form-control"
                    type={type ? type : "text"}
                    id={name}
                    name={name}
                    onChange={onChange}
                    value={value !== null ? value : ""}
                />
            </div>
        </div>
    );
}
