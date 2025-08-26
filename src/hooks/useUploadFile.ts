import {ChangeEvent, useState} from "react";
import { pdfjs } from "react-pdf";
// ВАЖНО: используем .mjs и тип 'module'
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

const isPdfFile = async (file: File): Promise<boolean> => {
    if (!file) return false;
    if (file.type === "application/pdf") return true;
    const name = (file.name || "").toLowerCase();
    if (name.endsWith(".pdf")) return true;
    try {
        const header = new Uint8Array(await file.slice(0, 5).arrayBuffer());
        const signature = new TextDecoder("ascii").decode(header);
        if (signature === "%PDF-") return true;
    } catch(e) {
        console.log(e);
    }
    return false;
};

const readText = async (
    file: File,
    setPaymentErrorMessage: (message: string) => void
): Promise<string> => {
    try {
        const fileBuffer = await file.arrayBuffer();
        const pdf = await pdfjs.getDocument({data: fileBuffer}).promise;
        const totalPages = pdf.numPages;
        let fullText = "";
        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const content = await page.getTextContent();
            const pageText = (content.items as any[])
                .map((item) => item.str)
                .join(" ");
            fullText += pageText + " ";
        }
        return fullText.trim();
    } catch (error) {
        setPaymentErrorMessage("Ошибка чтения файла");
        return "";
    }
};

const isPaymentOrder = (text: string): boolean => /ПЛАТЕЖНОЕ\s+ПОРУЧЕНИЕ/iu.test(text);

const readAmount = (text: string): number | null => {
    const dashRe = /[–—−-]/; // любые дефисы
    const exact = [...text.matchAll(new RegExp(`Сумма\\s+([\\d\\s]+)${dashRe.source}(\\d{2})`, "giu"))];
    if (exact.length) {
        const rub = exact[0][1].replace(/\s+/g, "");
        const kop = exact[0][2];
        return Number(`${rub}.${kop}`);
    }
    const alt = text.match(/Сумма\s+([\d\s]+)[.,](\d{2})/iu);
    if (alt) {
        const rub = alt[1].replace(/\s+/g, "");
        const kop = alt[2];
        return Number(`${rub}.${kop}`);
    }
    const any = text.match(new RegExp(`(\\d[\\d\\s]*)${dashRe.source}(\\d{2})`, "u"));
    if (any) {
        const rub = any[1].replace(/\s+/g, "");
        const kop = any[2];
        return Number(`${rub}.${kop}`);
    }
    return null;
};

type Accounts = { payer: string | null; recipient: string | null; all: string[] };
const extractAccounts = (text: string): Accounts => {
    const all = [...text.matchAll(/Сч\.\s*№\s*(\d{20})/gu)].map(m => m[1]);

    const payerNear = text.match(/Плательщик[\s\S]{0,250}?Сч\.\s*№\s*(\d{20})/u);
    const recipientNear = text.match(/Получатель[\s\S]{0,250}?Сч\.\s*№\s*(\d{20})/u);

    let payer = payerNear?.[1] ?? null;
    let recipient = recipientNear?.[1] ?? null;

    const settlement = all.filter(a => /^(407|408|423|421)/.test(a));
    if (!payer || !recipient) {
        if (!payer && settlement.length) payer = settlement[0] ?? null;
        if (!recipient && settlement.length) {
            recipient = settlement.find(a => a !== payer) ?? recipient ?? null;
        }
    }
    return {payer, recipient, all};
};

export interface IFileWithAmount {
    file: File,
    amount: number;
    payer?: string
    recipient?: string
}

export interface IFileWithAmount {
    file: File;
    amount: number;
    payer?: string;
    recipient?: string;
}

export const useUploadFile = () => {
    const [filesWithAmount, setFilesWithAmount] = useState<IFileWithAmount[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentErrorMessage, setPaymentErrorMessage] = useState("");

    const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        setPaymentErrorMessage("");
        setFilesWithAmount(null);

        const list = e.currentTarget.files;
        const files = Array.from(list ?? []);
        const tempArr: IFileWithAmount[] = [];

        if (files.length === 0) {
            setIsLoading(false);
            return;
        }
        for (const file of files) {
            const fileIsValid = await isPdfFile(file);
            if (!fileIsValid) {
                setPaymentErrorMessage((prev) => prev || `Файл ${file.name} не является PDF.`);
                continue;
            }
            const text = await readText(file, setPaymentErrorMessage);
            if (!text) {
                setPaymentErrorMessage((prev) => prev || `Не удаётся прочитать pdf файл: ${file.name}`);
                continue;
            }
            if (!isPaymentOrder(text)) {
                setPaymentErrorMessage((prev) => prev || `Не является платёжным поручением: ${file.name}`);
                continue;
            }
            const amt = readAmount(text);
            if (amt == null || Number.isNaN(amt) || amt <= 0) {
                setPaymentErrorMessage((prev) => prev || `Не удалось распознать сумму: ${file.name}`);
                continue;
            }
            const accs = extractAccounts(text);
            const fileWithAmount: IFileWithAmount = {
                file,
                amount: amt,
                ...(accs.payer ? { payer: accs.payer } : {}),
                ...(accs.recipient ? { recipient: accs.recipient } : {}),
            };
            tempArr.push(fileWithAmount);
        }
        if (tempArr.length > 0) {
            setFilesWithAmount(tempArr);
        }
        setIsLoading(false);
    };

    // Удобный ресет, чтобы компонент мог «очистить» состояние
    const resetFiles = () => setFilesWithAmount(null);

    return {
        onFileChange,
        setIsLoading,
        filesWithAmount,
        paymentErrorMessage,
        isLoading,
        resetFiles,
    };
};