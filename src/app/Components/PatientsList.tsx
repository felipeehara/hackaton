"use client";

import Link from "next/link";
import { patients } from "@/app/Data/patients";

const PatientList = () => (
  <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h2 className="text-2xl font-semibold text-blue-600 mb-6">Lista de Pacientes</h2>
    <ul className="space-y-4">
      {patients.map((patient) => (
        <li key={patient.id} className="bg-gray-50 p-4 rounded-lg shadow-md hover:bg-blue-50">
          <Link href={`/patient/${patient.id}`} legacyBehavior>
            <a className="text-lg font-bold text-blue-600 hover:text-blue-800">{patient.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default PatientList;
