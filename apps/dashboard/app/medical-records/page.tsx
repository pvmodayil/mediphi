// app/medical-records/page.tsx
import React from 'react';

interface MedicalEntry {
  date: string;
  description: string;
}

const placeholderData: MedicalEntry[] = [
  { date: '2023-10-27', description: 'Annual physical examination.' },
  { date: '2023-09-15', description: 'Visited primary care physician for flu symptoms.' },
  { date: '2023-08-01', description: 'Blood test results reviewed.' },
  { date: '2023-06-20', description: 'Follow-up appointment after sprained ankle.' },
];

const MedicalRecordsPage: React.FC = () => {
  // Sort data by date in descending order
  const sortedData = [...placeholderData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Medical Records</h1>
      <div className="overflow-y-auto h-[calc(100vh-100px)] border rounded p-4"> {/* Example scrollable area */}
        {sortedData.map((entry, index) => (
          <div key={index} className="border-b last:border-b-0 py-2">
            <h2 className="text-lg font-semibold">{entry.date}</h2>
            <p>{entry.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalRecordsPage;