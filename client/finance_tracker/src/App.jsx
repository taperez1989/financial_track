// import { Auth } from './pages/auth';
import { Login } from "./pages/auth/Login";
import { Dashboard } from './pages/dashboard';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FinancialRecordProvider } from './contexts/financialRecordContexts';
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";

function App() {


  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SignedIn>
                  <FinancialRecordProvider>
                    <Dashboard />
                  </FinancialRecordProvider>
                </SignedIn>

                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
