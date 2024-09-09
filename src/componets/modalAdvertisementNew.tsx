import { ChangeEvent, useState } from "react";
import { Advertisment } from "../types/types";
import { CustomModal } from "./customModal/customModal";
import TextField from "./form/textField";
import TextAreaField from "./form/textAreaField";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

type ModalProps = {
    isOpen: boolean;
    onClose: Function;
    onSubmit: Function;
};

export default function ModalAdvertisementNew({
    isOpen,
    onClose,
    onSubmit,
}: ModalProps) {
    const now = moment().toJSON();

    const newAdvertisment: Advertisment = {
        id: uuidv4(),
        name: "",
        price: 0,
        createdAt: now,
        views: 0,
        likes: 0,
    };

    const [advertisment, setAdvertisment] =
        useState<Advertisment>(newAdvertisment);

    async function newData() {
        const url = `http://localhost:3000/advertisements`;
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(advertisment),
        };
        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            setAdvertisment(json);
        } catch (error) {
            if (error instanceof Error) console.error(error.message);
        }
    }

    function handleChange(
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) {
        const value =
            event.target.type === "text" ||
            event.target.type === "textarea" ||
            event.target.value === ""
                ? event.target.value
                : +event.target.value;
        setAdvertisment((prevState) => ({
            ...prevState,
            [event.target.name]: value,
        }));
    }

    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        newData();
        onSubmit(advertisment);
    }

    return (
        <CustomModal isOpen={isOpen} onClose={onClose}>
            <>
                <h3 className="mb-2">Создание нового товара</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            required={true}
                            label="Название"
                            name="name"
                            type="text"
                            value={advertisment.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                            required={true}
                            label="Цена, руб."
                            name="price"
                            type="number"
                            value={
                                advertisment.price !== 0
                                    ? advertisment.price
                                    : ""
                            }
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                            required={false}
                            label="Ссылка на изображение"
                            name="imageUrl"
                            type="text"
                            value={advertisment.imageUrl}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextAreaField
                            required={false}
                            label="Описание"
                            name="description"
                            value={advertisment.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="d-flex justify-content-between gap-10">
                        <button
                            className="w-100 btn btn-primary"
                            type="submit"
                        >
                            Отправить
                        </button>
                        <button
                            className="w-100 btn btn-secondary"
                            onClick={() => onClose()}
                        >
                            Отмена
                        </button>
                    </div>
                </form>
            </>
        </CustomModal>
    );
}
