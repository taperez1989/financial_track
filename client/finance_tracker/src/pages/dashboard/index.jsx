import { SignedIn, SignedOut, SignIn,SignOutButton } from "@clerk/clerk-react";
import { FinancialRecordForm } from "./financialRecordForm";
import { useFinancialRecords } from "../../contexts/useFinancialRecords";
import '../../App.css';




export const Dashboard = () => {
    const { records, loading, deleteRecord } = useFinancialRecords();

    const handleDelete = async (id) => {
        try {
            await deleteRecord(id);

        } catch (error) {
            console.error('Delete failed:', error);
        }
    }

    return (
        <>
           
            <SignedIn>
                <div className="dashboard-container">
                    {/* 🔘 Clerk Sign Out button */}
                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
                        <SignOutButton>
                           
                            <button className="signOut">Sign Out</button>
                        </SignOutButton>
                    </div>
                    <h1>Your Finances</h1>

            {/* Render the form */}
            <FinancialRecordForm />

            {/* Show records */}
            {loading && <p>Loading...</p>}
            {!loading && records.length === 0 && <p>No records yet.</p>}
                    {!loading && records.map((rec, idx) => (
                        <div  key={idx} className="expense-card">
                            <div className="expense-card-header">
                                <h3>{rec.description}</h3>
                                <span className="expense-amount">${rec.amount}</span>
                            </div>
                            <div className="expense-card-body">
                                <p><strong>Category:</strong> {rec.category || "Uncategorized"}</p>
                                <p><strong>Date:</strong> {new Date(rec.date).toLocaleDateString()}</p>
                            </div>
                            <button   onClick={() => handleDelete(rec._id)} className="delete">Delete</button>
                        </div>
                    ))}

            </div>
        </SignedIn>

        <SignedOut>
                <SignIn path="/login" routing="path"/>
        </SignedOut>
        </>
    );
};

