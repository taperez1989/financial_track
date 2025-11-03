
import { useContext } from "react";
import { FinancialRecordContext } from "../contexts/financialRecordContexts";

export const useFinancialRecords = () => {
    const context = useContext(FinancialRecordContext);

    if (!context) {
        throw new Error("useFinancialRecords must be used inside FinancialRecordProvider");
    }

    return context;
};

