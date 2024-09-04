import "./App.css";
import {Routes, Route} from "react-router-dom";
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
import TrackStatus from "./pages/parishioner/TrackStatus";
import FAQ from "./pages/parishioner/FAQ";
import TrackRequest from "./pages/parishioner/TrackRequest";
import Login from "./pages/staff/Login";
import StaffDashboard from "./pages/staff/StaffDashboard";
import ServiceRequests from "./pages/staff/ServiceRequests";
import ManageEvents from "./pages/staff/ManageEvents";
import ManageIntentions from "./pages/staff/ManageIntentions";
import ManageAccounts from "./pages/admin/ManageAccounts";
import GenerateReports from "./pages/staff/GenerateReports";
import ManageSchedules from "./pages/staff/ManageSchedules";
import ManageTransactions from "./pages/staff/ManageTransactions";
import FuneralMassModalApproved from "./components/service-request-modals/pending/approved/funeralMassApproved";
import FuneralMassModalCancelled from "./components/service-request-modals/pending/cancelled/funeralMassCancelled";
import FuneralMassModalPending from "./components/service-request-modals/pending/funeralMassPending";
import AnointingPending from "./components/service-request-modals/pending/anointingPending";
import AnointingApproved from "./components/service-request-modals/pending/approved/anointingApproved";
import AnointingCancelled from "./components/service-request-modals/pending/cancelled/anointingCancelled";
  
function App() {
  return (
    <main>
      <Routes>
        {/*  -----------PARISHIONER-----------  */}
        <Route path="/" element={<Home />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/certificate-baptism" element={<CertificateBaptism />} />
        <Route path="/certificate-confirmation" element={<CertificateConfirmation />}/>
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
        <Route path="/track-status" element={<TrackStatus />} />
        <Route path="/track-request" element={<TrackRequest />} />
        <Route path="/frequently-asked" element={<FAQ />} />

        {/*  unya na nani e lahi2 og routes ang parishioner & staff... diri lang sa tanan  */}
        {/*  -----------STAFF-----------  */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<StaffDashboard />} />
        <Route path="/staff-events" element={<ManageEvents />}/>
        <Route path="/service-requests" element={<ServiceRequests />} />
        <Route path="/manage-intentions" element={<ManageIntentions />} />
        <Route path="/generate-reports" element={<GenerateReports />} />
        <Route path="/manage-schedules" element={<ManageSchedules />} />
        <Route path="/manage-transactions" element={<ManageTransactions />} />

         {/* Temporary modals wala pa na integrate */}
        <Route path="/funeralpending" element={<FuneralMassModalPending/>}/>
        <Route path="/funeralapproved" element={<FuneralMassModalApproved/>}/>
        <Route path="/funeralcancelled" element={<FuneralMassModalCancelled/>}/>
        <Route path="/anointingpending" element={<AnointingPending/>}/>
        <Route path="/anointingapproved" element={<AnointingApproved/>}/>
        <Route path="/anointingcancelled" element={<AnointingCancelled/>}/>

        {/*  -----------ADMIN-----------  */}
        {<Route path="/manage-accounts" element={<ManageAccounts />} /> }
      </Routes>
    </main>
  );
}

export default App;
