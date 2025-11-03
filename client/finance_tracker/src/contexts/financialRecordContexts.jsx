import { useContext, createContext, useState, useEffect } from "react";


// // Default values for the context
const contextDefaults = {
    records: [],
    addRecord: () => { },
    updateRecord: () => { }, 
    deleteRecord: () => { }
};

// // Create ONE context with defaults
export const FinancialRecordContext = createContext(contextDefaults);




// create the provider component
// Provider component
export const FinancialRecordProvider = ({ children }) => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all records on mount
    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await fetch("/api/records/getAll");
                const data = await response.json();
                setRecords(data);
            } catch (err) {
                console.error("Error fetching records:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecords();
    }, []);

    // ---- CRUD FUNCTIONS ----

    // Create
    const addRecord = async (record) => {
        console.log("Incoming record:", record);
        try {
            const response = await fetch("http://localhost:3001/api/records/create", {

                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(record),
            });
            console.log(response);
            if (!response.ok) throw new Error("Failed to add record");

            const newRecord = await response.json();
            setRecords((prev) => [...prev, newRecord]); // update local state
        } catch (err) {
            console.error(err);
        }
    };

    // Update
    const updateRecord = async (id, newRecord) => {
        try {
            const response = await fetch(`/api/records/update/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newRecord),
            });

            if (!response.ok) throw new Error("Failed to update record");

            const updated = await response.json();
            setRecords((prev) =>
                prev.map((r) => (r._id === id ? updated : r))
            );
        } catch (err) {
            console.error(err);
        }
    };

    // Delete
    const deleteRecord = async (id) => {
        try {
            const response = await fetch(`/api/records/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete record");

            setRecords((prev) => prev.filter((r) => r._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <FinancialRecordContext.Provider
            value={{ records, addRecord, updateRecord, deleteRecord, loading }}
        >
            {children}
        </FinancialRecordContext.Provider>
    );
};

