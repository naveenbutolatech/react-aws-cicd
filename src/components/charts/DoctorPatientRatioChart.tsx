import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface DoctorPatientRatioChartProps {
  doctors: number;
  appointments: number;
}

const COLORS = ['#4a90e2', '#9b51e0', '#ff9f43'];

export default function DoctorPatientRatioChart({ doctors, appointments }: DoctorPatientRatioChartProps) {
  // Calculate the average appointments per doctor
  const appointmentsPerDoctor = doctors > 0 ? (appointments / doctors).toFixed(1) : 0;
  
  // Data for the pie chart
  const data = [
    { name: 'Doctors', value: doctors },
    { name: 'Appointments', value: appointments },
  ];
  
  return (
    <div className="chart-wrapper">
      <div className="chart-header">
        <h3>Doctor-Patient Appointment Ratio</h3>
        <div className="ratio-indicator">
          <span className="ratio-value">{appointmentsPerDoctor}</span>
          <span className="ratio-label">Appointments per Doctor</span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
           {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}`, '']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

