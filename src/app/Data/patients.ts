export const patients = [
    {
      id: 1,
      name: "João da Silva",
      age: 45,
      department: "Cardiologia",
      identificationNumber: "123456789",
      status: "Em tratamento",
      notes: "Paciente com histórico de alergias",
      allergies: "Alergia a amendoim",
      observations: "Requere acompanhamento diário",
      tasks: [
        { label: "Café da manhã", completed: false },
        { label: "Tomar banho", completed: false },
        { label: "Medicação", completed: false },
        { label: "Almoço", completed: false },
        { label: "Exame físico", completed: false },
      ]
    },
    {
      id: 2,
      name: "Maria Oliveira",
      age: 30,
      department: "Pediatria",
      identificationNumber: "987654321",
      status: "Alta médica",
      notes: "Paciente está se recuperando bem",
      allergies: "Sem alergias",
      observations: "Apenas repouso recomendado",
      tasks: [
        { label: "Café da manhã", completed: true },
        { label: "Tomar banho", completed: true },
        { label: "Medicação", completed: false },
        { label: "Almoço", completed: false },
        { label: "Exame físico", completed: true },
      ]
    },
    // Adicione outros pacientes conforme necessário
  ];
  