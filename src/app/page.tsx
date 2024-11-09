// pages/index.js
import PatientList from "@/app/Components/PatientsList";

export default function Home() {
  return (
    <div>
      <h1>Sistema de Comunicação de Plantão</h1>
      <PatientList />
    </div>
  );
}
