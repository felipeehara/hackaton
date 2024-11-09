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
  allergies: string;  // Novo campo para alergias
  observations: string;  // Novo campo para observações
  tasks: { label: string; completed: boolean }[];
}

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [notes, setNotes] = useState<string>("");
  const [allergies, setAllergies] = useState<string>("");
  const [observations, setObservations] = useState<string>("");

  useEffect(() => {
    if (id && typeof id === "string") {
      const patientId = parseInt(id, 10);
      const foundPatient = patients.find((p) => p.id === patientId);
      setPatient(foundPatient || null);
      if (foundPatient) {
        setNotes(foundPatient.notes);
        setAllergies(foundPatient.allergies);
        setObservations(foundPatient.observations);
      }
    }
  }, [id]);

  if (!patient) return <p>Carregando paciente ou paciente não encontrado...</p>;

  const handleUpdate = () => {
    if (patient) {
      patient.notes = notes;
      patient.allergies = allergies;
      patient.observations = observations;
      alert("Informações atualizadas com sucesso!");
    }
  };

  const handleTaskChange = (index: number) => {
    const updatedTasks = [...(patient?.tasks || [])];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setPatient({ ...patient!, tasks: updatedTasks });
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
