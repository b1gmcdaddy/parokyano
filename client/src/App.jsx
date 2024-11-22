import "./App.css";
import {Routes, Route} from "react-router-dom";
import {Navigate} from "react-router-dom";

import Home from "./pages/parishioner/Home";
import Certificates from "./pages/parishioner/Certificate";
import About from "./pages/parishioner/About";
import Events from "./pages/parishioner/Events";
import MassSelection from "./pages/parishioner/MassSelection";
import Baptism from "./pages/parishioner/Baptism";
import WakeMass from "./pages/parishioner/mass-types/WakeMass";
import FuneralMass from "./pages/parishioner/mass-types/FuneralMass";
import OutsideMass from "./pages/parishioner/mass-types/OutsideMass";
import Blessing from "./pages/parishioner/Blessing";
import Anointing from "./pages/parishioner/Anointing";
import MassIntentions from "./pages/parishioner/MassIntentions";
import Petition from "./pages/parishioner/mass-intentions/Petition";
import Thanksgiving from "./pages/parishioner/mass-intentions/Thanksgiving";
import Souls from "./pages/parishioner/mass-intentions/Souls";
import CertificateBaptism from "./pages/parishioner/certs-types/Certificate-Baptism";
import CertificateConfirmation from "./pages/parishioner/certs-types/Certificate-Confirmation";
import CertificateWedding from "./pages/parishioner/certs-types/Certificate-Wedding";
import Wedding from "./pages/parishioner/Wedding";

import FAQ from "./pages/parishioner/FAQ";
import TrackRequest from "./pages/parishioner/TrackRequest";
import Login from "./pages/staff/Login";
import StaffDashboard from "./pages/staff/StaffDashboard";
import ServiceRequests from "./pages/staff/ServiceRequests";
import ManageEvents from "./pages/staff/ManageEvents";
import ManageIntentions from "./pages/staff/ManageIntentions";
import Configurations from "./pages/admin/Configurations";
import GenerateReports from "./pages/staff/GenerateReports";
import ManageSchedules from "./pages/staff/ManageSchedules";
import ManageTransactions from "./pages/staff/ManageTransactions";
import ForgotPassword from "./pages/staff/ForgotPassword";
import CertificateRequests from "./pages/staff/CertificateRequests";
import Settings from "./pages/staff/Settings";
import {StaffRoute, AdminRoute, LoggedInRoute} from "./utils/LoginRedirect";

function App() {
  return (
    <main>
      <Routes>
        {/*  -----------PARISHIONER-----------  */}
        <Route path="/" element={<Home />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/certificate-baptism" element={<CertificateBaptism />} />
        <Route
          path="/certificate-confirmation"
          element={<CertificateConfirmation />}
        />
        <Route path="/certificate-wedding" element={<CertificateWedding />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/mass-selection" element={<MassSelection />} />
        <Route path="/wakemass" element={<WakeMass />} />
        <Route path="/funeralmass" element={<FuneralMass />} />
        <Route path="/outsidemass" element={<OutsideMass />} />
        <Route path="/baptism" element={<Baptism />} />
        <Route path="/blessing" element={<Blessing />} />
        <Route path="/anointing" element={<Anointing />} />
        <Route path="/mass-intention-select" element={<MassIntentions />} />
        <Route path="/mass-intention-thanksgiving" element={<Thanksgiving />} />
        <Route path="/mass-intention-petition" element={<Petition />} />
        <Route path="/mass-intention-souls" element={<Souls />} />
        <Route path="/wedding" element={<Wedding />} />

        <Route path="/track-request" element={<TrackRequest />} />
        <Route path="/frequently-asked" element={<FAQ />} />

        {/*  unya na nani e lahi2 og routes ang parishioner & staff... diri lang sa tanan  */}
        {/*  -----------STAFF-----------  */}
        <Route
          path="/login"
          element={
            <LoggedInRoute>
              <Login />
            </LoggedInRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <StaffRoute>
              <StaffDashboard />
            </StaffRoute>
          }
        />
        <Route
          path="/staff-events"
          element={
            <StaffRoute>
              <ManageEvents />
            </StaffRoute>
          }
        />
        <Route
          path="/service-requests"
          element={
            <StaffRoute>
              <ServiceRequests />
            </StaffRoute>
          }
        />
        <Route
          path="/manage-intentions"
          element={
            <StaffRoute>
              <ManageIntentions />
            </StaffRoute>
          }
        />
        <Route
          path="/generate-reports"
          element={
            <StaffRoute>
              <GenerateReports />
            </StaffRoute>
          }
        />
        <Route
          path="/manage-schedules"
          element={
            <StaffRoute>
              <ManageSchedules />
            </StaffRoute>
          }
        />
        <Route
          path="/manage-transactions"
          element={
            <StaffRoute>
              <ManageTransactions />
            </StaffRoute>
          }
        />
        <Route
          path="/cert-requests"
          element={
            <StaffRoute>
              <CertificateRequests />
            </StaffRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <StaffRoute>
              <Settings />
            </StaffRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/*  -----------ADMIN-----------  */}
        <Route
          path="/manage-configurations"
          element={
            <AdminRoute>
              <Configurations />
            </AdminRoute>
          }
        />
        {<Route path="/manage-configurations" element={<Configurations />} />}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
}

export default App;
