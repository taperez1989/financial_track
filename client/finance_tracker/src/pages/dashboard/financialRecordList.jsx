import { FinancialRecord Context } from "../../contexts/financialRecordContexts";
import { useContext } from "react";

export const FinancialRecordList = () => {

  const { records, loading } = useContext(FinancialRecordContext);

  if (loading) return <p>Loading.....</p>;
  if (records.length === 0) return <p>No records found.</p>

  return (
    <div className='list-container'>financial-record-list</div>
  )
}