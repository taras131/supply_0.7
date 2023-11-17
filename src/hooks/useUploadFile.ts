import {useEffect, useState} from "react";
import {pdfjs} from "react-pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.entry";
// Установка пути к рабочему потоку
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const validationFile = (file: File): boolean => {
    return file && file.name.split(".").pop() === "pdf"
}
const readText = async (file: File,
                        setPaymentErrorMessage: (message: string) => void,
                        setIsLoading: (isLoading: boolean) => void,
                        setText: (text: string) => void) => {
    try {
        let fullText = "";
        const fileReader = new FileReader();
        fileReader.onload = async () => {
            const url = fileReader.result;
            const pdf = await pdfjs.getDocument(url).promise;
            const totalPages = pdf.numPages;
            for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const content = await page.getTextContent();
                const pageText = content.items.map((item) => item.str).join(" ");
                fullText += pageText + " ";
            }
        };
        fileReader.readAsDataURL(file);
        setText(fullText)
    } catch (error) {
        setPaymentErrorMessage("Ошибка чтения файла");
        setIsLoading(false);
    }
}
const checkPayment = (text: string): boolean => {
    let isPaymentOrder = false;
    const textArr = text.split(" ");
    for (let i = 0; i < textArr.length - 1; i++) {
        if (textArr[i] === "ПЛАТЕЖНОЕ" && textArr[i + 1] === "ПОРУЧЕНИЕ") {
            isPaymentOrder = true;
        }
    }
    return isPaymentOrder
}
const readAmount = (text: string): number => {
    let amount = 0
    const textArr = text.split(" ");
    for (let i = 0; i < textArr.length - 1; i++) {
        if (textArr[i] === "Сумма") {
            amount = +textArr[i + 1].split("-").join(".");
        }
    }
    return amount
}

export const useUploadFile = () => {
    const [file, setFile] = useState<null | File>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentErrorMessage, setPaymentErrorMessage] = useState("");
    const [amount, setAmount] = useState(0);
    const [text, setText] = useState("");
    useEffect(() => {
        setIsLoading(true);
        if (file && isLoading && text.length > 0) {
            const isPayment = checkPayment(text);
            if (isPayment) {
                const amount = readAmount(text)
                if (amount > 0) {
                    setAmount(amount)
                } else {
                    setPaymentErrorMessage("Не удалось распознать сумму");
                }
            } else {
                setPaymentErrorMessage("Не является платёжным поручением.");
            }
        } else {
            if (file) {
                setPaymentErrorMessage("Ошибка при чтении PDF файла");
            }
        }
        setIsLoading(false);
    }, [text])
    useEffect(() => {
        if (file) {
            const fileIsValid = validationFile(file)
            if (fileIsValid) {
                readText(file, setPaymentErrorMessage, setIsLoading, setText)
            } else {
                setPaymentErrorMessage("Не является pdf файлом.")
            }
        }
        setIsLoading(false)
    }, [file])
    const onFileChange = (event: any) => {
        setIsLoading(true);
        setPaymentErrorMessage("");
        const file = event.target.files[0];
        if (file) {
            setFile(file);
        }
    }
    return {file, onFileChange, paymentErrorMessage, amount, isLoading}
}