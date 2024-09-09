import { ChangeEvent, useEffect, useState } from "react";
import { Advertisment } from "../types/types";
import { CustomModal } from "./CustomModal/customModal";
import TextField from "./Form/textField";
import TextAreaField from "./Form/textAreaField";

type ModalProps = {
    advertisment: Advertisment;
    isOpen: boolean;
    onClose: Function;
};

export default function ModalAdvertisementEdit({
    advertisment,
    isOpen,
    onClose,
}: ModalProps) {
    const [editAdvertisment, setEditAdvertisment] =
        useState<Advertisment>(advertisment);
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        if (JSON.stringify(editAdvertisment) !== JSON.stringify(advertisment)) {
            setIsChanged(true);
        } else {
            setIsChanged(false);
        }
    }, [editAdvertisment]);

    async function editData() {
        const url = `http://localhost:3000/advertisements/${advertisment.id}`;
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editAdvertisment),
        };
        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            console.log("изменено");

            setEditAdvertisment(json);
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
        setEditAdvertisment((prevState) => ({
            ...prevState,
            [event.target.name]: value,
        }));
    }

    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        if (editAdvertisment !== advertisment) {
            editData();
        }
        onClose(editAdvertisment);
    }

    return (
        <CustomModal isOpen={isOpen} onClose={onClose}>
            <>
                <h3 className="mb-2">Редактирование товара</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            required={true}
                            label="Название"
                            name="name"
                            type="text"
                            value={editAdvertisment.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                            required={true}
                            label="Цена, руб."
                            name="price"
                            type="number"
                            value={editAdvertisment.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                            required={false}
                            label="Ссылка на изображение"
                            name="imageUrl"
                            type="text"
                            value={editAdvertisment.imageUrl}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextAreaField
                            required={false}
                            label="Описание"
                            name="description"
                            value={editAdvertisment.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="d-flex justify-content-between gap-10">
                        <button
                            className="w-100 btn btn-primary"
                            type="submit"
                            disabled={!isChanged}
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
