import React, { useState } from "react";
import { Home } from "lucide-react";

import { InicioAcceso } from "./components/screens/InicioAcceso";
import { SalaDashboard } from "./components/screens/SalaDashboard";
import { SalaNuevaIncidencia } from "./components/screens/SalaNuevaIncidencia";
import { SalaFichaIncidente } from "./components/screens/SalaFichaIncidente";
import { SalaClasificacion } from "./components/screens/SalaClasificacion";
import { SalaDespacho } from "./components/screens/SalaDespacho";
import { SalaConfirmacion } from "./components/screens/SalaConfirmacion";
import { CampoMision } from "./components/screens/CampoMision";
import { CampoNavegacion } from "./components/screens/CampoNavegacion";
import { CampoEvidencias } from "./components/screens/CampoEvidencias";
import { CampoCierre } from "./components/screens/CampoCierre";
import { CampoFeedbackCierre } from "./components/screens/CampoFeedbackCierre";
import { CampoReportarNovedad } from "./components/screens/CampoReportarNovedad";
import { OVLoading } from "./components/screens/OVLoading";
import { OVModalVerEvidencias } from "./components/screens/OVModalVerEvidencias";
import { Toast } from "./components/design-system/Toast";

import { TTSReaderBridge } from "./components/TTSReaderBridge";

type Screen =
  | "Inicio_Acceso"
  | "Sala_Dashboard"
  | "Sala_NuevaIncidencia"
  | "Sala_FichaIncidente"
  | "Sala_Clasificacion"
  | "Sala_Despacho"
  | "Sala_Confirmacion"
  | "Campo_Mision"
  | "Campo_Navegacion"
  | "Campo_Evidencias"
  | "Campo_Cierre"
  | "Campo_FeedbackCierre"
  | "Campo_ReportarNovedad";

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("Inicio_Acceso");
  const [showLoading, setShowLoading] = useState(false);
  const [showEvidencesModal, setShowEvidencesModal] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "warning" | "error"; message: string } | null>(null);

  const [userEmail, setUserEmail] = useState<string>("");
  const [userRole, setUserRole] = useState<"sala" | "campo" | null>(null);

  const [selectedIncidenciaId, setSelectedIncidenciaId] = useState<string>("INC-2025-00123");
  const [dispatchedResourcesCount, setDispatchedResourcesCount] = useState<number>(0);
  const [dashboardKey, setDashboardKey] = useState<number>(0);

  // Navigation helpers
  const navigate = (screen: Screen, delay?: number) => {
    if (delay) {
      setTimeout(() => setCurrentScreen(screen), delay);
    } else {
      setCurrentScreen(screen);
    }
  };

  const showToastMessage = (type: "success" | "warning" | "error", message: string) => {
    setToast({ type, message });
  };

  // Auth handler
  const handleAuthSuccess = (email: string, role: "sala" | "campo") => {
    setUserEmail(email);
    setUserRole(role);

    if (role === "sala") {
      navigate("Sala_Dashboard");
    } else {
      navigate("Campo_Mision");
    }
  };

  // Inicio handlers
  const handleSelectSala = () => navigate("Sala_Dashboard");
  const handleSelectCampo = () => navigate("Campo_Mision");

  // Sala handlers
  const handleNewIncident = () => navigate("Sala_NuevaIncidencia");

  const handleCreateIncident = () => {
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
      showToastMessage("success", "Incidencia creada correctamente");
      navigate("Sala_Dashboard");
    }, 600);
  };

  const handleViewIncident = (id: string) => {
    setSelectedIncidenciaId(id);
    navigate("Sala_FichaIncidente");
  };

  const handleClassify = () => {
    navigate("Sala_Clasificacion");
  };

  const handleConfirmPriority = () => {
    showToastMessage("success", "Prioridad actualizada ✅");
    setTimeout(() => navigate("Sala_Despacho"), 300);
  };

  const handleDispatchFromFicha = () => navigate("Sala_Despacho");

  const handleDispatch = (resourcesCount: number) => {
    setDispatchedResourcesCount(resourcesCount);
    showToastMessage("success", "Recursos despachados ✅");
    setTimeout(() => navigate("Sala_Confirmacion"), 300);
  };

  const handleDeleteIncident = () => {
    showToastMessage("success", "Incidencia eliminada correctamente");
    setTimeout(() => {
      setDashboardKey((prev) => prev + 1);
      navigate("Sala_Dashboard");
    }, 600);
  };

  const handleBackToDashboard = () => {
    setDashboardKey((prev) => prev + 1);
    navigate("Sala_Dashboard");
  };

  // Campo handlers
  const handleAcceptMission = () => navigate("Campo_Navegacion");
  const handleReportNovedad = () => navigate("Campo_ReportarNovedad");

  const handleSendNovedad = () => {
    showToastMessage("success", "Novedad enviada ✅");
    setTimeout(() => navigate("Campo_Mision"), 600);
  };

  const handleCancelNovedad = () => navigate("Campo_Mision");
  const handleArrived = () => navigate("Campo_Evidencias");

  const handleSendEvidences = () => {
    showToastMessage("success", "Evidencias enviadas ✅");
    setTimeout(() => navigate("Campo_Cierre"), 600);
  };

  const handleCloseMission = () => navigate("Campo_FeedbackCierre");
  const handleBackToMission = () => navigate("Campo_Mision");

  const handleViewEvidences = () => setShowEvidencesModal(true);
  const handleCloseEvidencesModal = () => setShowEvidencesModal(false);

  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case "Inicio_Acceso":
        return (
          <InicioAcceso
            onSelectSala={handleSelectSala}
            onSelectCampo={handleSelectCampo}
            onAuthSuccess={handleAuthSuccess}
          />
        );

      case "Sala_Dashboard":
        return (
          <SalaDashboard key={dashboardKey} onNewIncident={handleNewIncident} onViewIncident={handleViewIncident} />
        );

      case "Sala_NuevaIncidencia":
        return <SalaNuevaIncidencia onCreate={handleCreateIncident} onBack={handleBackToDashboard} />;

      case "Sala_FichaIncidente":
        return (
          <SalaFichaIncidente
            incidenciaId={selectedIncidenciaId}
            onClassify={handleClassify}
            onDispatch={handleDispatchFromFicha}
            onDelete={handleDeleteIncident}
            onBack={handleBackToDashboard}
          />
        );

      case "Sala_Clasificacion":
        return <SalaClasificacion onConfirm={handleConfirmPriority} onBack={() => navigate("Sala_FichaIncidente")} />;

      case "Sala_Despacho":
        return <SalaDespacho onDispatch={handleDispatch} onBack={() => navigate("Sala_FichaIncidente")} />;

      case "Sala_Confirmacion":
        return <SalaConfirmacion resourcesCount={dispatchedResourcesCount} onBackToDashboard={handleBackToDashboard} />;

      case "Campo_Mision":
        return (
          <CampoMision onAccept={handleAcceptMission} onReportNovedad={handleReportNovedad} onViewEvidences={handleViewEvidences} />
        );

      case "Campo_Navegacion":
        return <CampoNavegacion onArrived={handleArrived} />;

      case "Campo_ReportarNovedad":
        return <CampoReportarNovedad onSend={handleSendNovedad} onCancel={handleCancelNovedad} />;

      case "Campo_Evidencias":
        return <CampoEvidencias onSend={handleSendEvidences} onViewEvidences={handleViewEvidences} />;

      case "Campo_Cierre":
        return <CampoCierre onClose={handleCloseMission} />;

      case "Campo_FeedbackCierre":
        return <CampoFeedbackCierre onBackToMission={handleBackToMission} onViewEvidences={handleViewEvidences} />;

      default:
        return (
          <InicioAcceso
            onSelectSala={handleSelectSala}
            onSelectCampo={handleSelectCampo}
            onAuthSuccess={handleAuthSuccess}
          />
        );
    }
  };

  return (
    <div className="app">
      {/* Refresca TTSReader cada vez que cambias de pantalla */}
      <TTSReaderBridge screenKey={currentScreen} />

      {/* Home Button - Bottom Left */}
      {currentScreen !== "Inicio_Acceso" && (
        <button
          onClick={() => {
            setUserEmail("");
            setUserRole(null);
            navigate("Inicio_Acceso");
          }}
          className="fixed bottom-6 left-6 z-50 bg-white p-3 rounded-full hover:bg-[#f1f5f9] transition-colors"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
          aria-label="Volver al inicio"
          type="button"
        >
          <Home className="w-6 h-6 text-[var(--primary)]" />
        </button>
      )}

      {/* Render Screen */}
      {renderScreen()}

      {/* Overlays */}
      {showLoading && <OVLoading />}
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      <OVModalVerEvidencias isOpen={showEvidencesModal} onClose={handleCloseEvidencesModal} />
    </div>
  );
}

export default App;
