"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { patients } from "@/app/Data/patients";

interface Patient {
  id: number;
  name: string;
  age: number;
  department: string;
  identificationNumber: string;
  status: string;
  notes: string;
  allergies: string;
  observations: string;
  tasks: { label: string; completed: boolean }[];
  examDetails: { heartRate: string; bloodPressure: string; heartRateTime: string; bloodPressureTime: string }; // Novo campo para horários de medição
}

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [notes, setNotes] = useState<string>("");
  const [allergies, setAllergies] = useState<string>("");
  const [observations, setObservations] = useState<string>("");
  const [showExamModal, setShowExamModal] = useState<boolean>(false);
  const [heartRate, setHeartRate] = useState<string>("");
  const [bloodPressure, setBloodPressure] = useState<string>("");

  // Horários fixos para medição de frequência cardíaca e pressão arterial
  const heartRateTime = "08:00";  // 8 da manhã
  const bloodPressureTime = "20:00"; // 20 da noite

  useEffect(() => {
    if (id && typeof id === "string") {
      const patientId = parseInt(id, 10);
      const foundPatient = patients.find((p) => p.id === patientId);
      if (foundPatient) {
        setPatient(foundPatient);
        setNotes(foundPatient.notes);
        setAllergies(foundPatient.allergies);
        setObservations(foundPatient.observations);
        setHeartRate(foundPatient.examDetails?.heartRate || "");
        setBloodPressure(foundPatient.examDetails?.bloodPressure || "");
      } else {
        setPatient(null); // Garantir que o paciente seja nulo caso não encontrado
      }
    }
  }, [id]);

  if (!patient) return <p>Carregando paciente ou paciente não encontrado...</p>;

  const handleUpdate = () => {
    if (patient) {
      patient.notes = notes;
      patient.allergies = allergies;
      patient.observations = observations;
      patient.examDetails = { 
        heartRate, 
        bloodPressure, 
        heartRateTime,
        bloodPressureTime 
      }; // Atualiza os detalhes do exame com horários fixos
      alert("Informações atualizadas com sucesso!");
    }
  };

  const handleTaskChange = (index: number) => {
    const updatedTasks = [...(patient?.tasks || [])];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setPatient({ ...patient!, tasks: updatedTasks });
  };

  const handleSaveExamDetails = () => {
    if (patient) {
      patient.examDetails = { 
        heartRate, 
        bloodPressure, 
        heartRateTime,
        bloodPressureTime 
      }; // Atualiza os dados do exame físico
      setShowExamModal(false);
      alert("Exame físico registrado com sucesso!");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6">Detalhes do Paciente</h2>
      <div className="space-y-4">
        <p className="text-lg font-medium"><strong>Nome:</strong> {patient.name}</p>
        <p className="text-lg font-medium"><strong>Idade:</strong> {patient.age}</p>
        <p className="text-lg font-medium"><strong>Departamento:</strong> {patient.department}</p>
        <p className="text-lg font-medium"><strong>Número de Identificação:</strong> {patient.identificationNumber}</p>
      </div>

      <p className="text-lg font-medium mt-4"><strong>Anotações:</strong></p>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={4}
        className="w-full p-4 border-2 border-gray-300 rounded-lg mb-4"
      />

      <p className="text-lg font-medium mt-4"><strong>Alergias:</strong></p>
      <input
        type="text"
        value={allergies}
        onChange={(e) => setAllergies(e.target.value)}
        className="w-full p-4 border-2 border-gray-300 rounded-lg mb-4"
      />

      <p className="text-lg font-medium mt-4"><strong>Observações:</strong></p>
      <input
        type="text"
        value={observations}
        onChange={(e) => setObservations(e.target.value)}
        className="w-full p-4 border-2 border-gray-300 rounded-lg mb-4"
      />

      <p className="text-lg font-medium mt-4"><strong>Lista de Tarefas:</strong></p>
      <ul className="space-y-3 mb-4">
        {patient.tasks.map((task, index) => (
          <li key={index} className="flex items-center">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleTaskChange(index)}
              className="mr-3 h-5 w-5"
            />
            <span className={task.completed ? "line-through text-gray-400" : ""}>
              {task.label}
            </span>
          </li>
        ))}
      </ul>

      {/* Botão de Exame Físico */}
      <button
        onClick={() => setShowExamModal(true)}
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors mb-4"
      >
        Exame Físico
      </button>

      {/* Modal de Exame Físico */}
      {showExamModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Exame Físico</h3>

            <div className="mb-4">
              <p className="text-lg font-medium mb-2">Frequência Cardíaca (Horário: {heartRateTime})</p>
              <input
                type="text"
                value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)}
                className="w-full p-4 border-2 border-gray-300 rounded-lg"
              />
            </div>

            <div className="mb-4">
              <p className="text-lg font-medium mb-2">Pressão Arterial (Horário: {bloodPressureTime})</p>
              <input
                type="text"
                value={bloodPressure}
                onChange={(e) => setBloodPressure(e.target.value)}
                className="w-full p-4 border-2 border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setShowExamModal(false)}
                className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition-colors"
              >
                Fechar
              </button>
              <button
                onClick={handleSaveExamDetails}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Salvar Exame
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Atualizar Informações
      </button>
    </div>
  );
};

export default PatientDetails;
