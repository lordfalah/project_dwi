import Header from "@/component/dashboard/Header";
import { columns } from "./columns";
import DataTable from "./data-table";

const data = [
  {
    nama: "John Doe",
    umur: 30,
    keluhan: "Sakit kepala",
    obat: "Paracetamol",
    diagnosa: "Migren",
  },
  {
    nama: "Jane Smith",
    umur: 25,
    keluhan: "Demam",
    obat: "Ibuprofen",
    diagnosa: "Influenza",
  },
  {
    nama: "Michael Johnson",
    umur: 35,
    keluhan: "Batuk",
    obat: "Cough syrup",
    diagnosa: "Bronkitis",
  },
  {
    nama: "Sarah Brown",
    umur: 40,
    keluhan: "Sakit perut",
    obat: "Omeprazole",
    diagnosa: "Gastritis",
  },
  {
    nama: "David Lee",
    umur: 28,
    keluhan: "Pusing",
    obat: "Dizziness relief",
    diagnosa: "Vertigo",
  },
  {
    nama: "Emily Davis",
    umur: 22,
    keluhan: "Sariawan",
    obat: "Mouthwash",
    diagnosa: "Stomatitis",
  },
  {
    nama: "Robert Taylor",
    umur: 45,
    keluhan: "Nyeri punggung",
    obat: "Ibuprofen",
    diagnosa: "Sakit pinggang",
  },
  {
    nama: "Olivia Wilson",
    umur: 27,
    keluhan: "Gatal-gatal",
    obat: "Antihistamine",
    diagnosa: "Alergi",
  },
  {
    nama: "Daniel Martinez",
    umur: 33,
    keluhan: "Mual-mual",
    obat: "Ondansetron",
    diagnosa: "Mual muntah",
  },
  {
    nama: "Ava Anderson",
    umur: 29,
    keluhan: "Sesak napas",
    obat: "Ventolin",
    diagnosa: "Asma",
  },
  {
    nama: "Ethan Garcia",
    umur: 31,
    keluhan: "Diare",
    obat: "Loperamide",
    diagnosa: "Gastroenteritis",
  },
  {
    nama: "Mia Thomas",
    umur: 24,
    keluhan: "Sakit tenggorokan",
    obat: "Lozenges",
    diagnosa: "Faringitis",
  },
  {
    nama: "Liam Hernandez",
    umur: 36,
    keluhan: "Nyeri sendi",
    obat: "Ibuprofen",
    diagnosa: "Artritis",
  },
  {
    nama: "Sophia Adams",
    umur: 26,
    keluhan: "Mata merah",
    obat: "Tetrahydrozoline",
    diagnosa: "Konjungtivitis",
  },
  {
    nama: "Logan Perez",
    umur: 32,
    keluhan: "Kebas",
    obat: "Pain relief cream",
    diagnosa: "Neuropati",
  },
  {
    nama: "Isabella Ramirez",
    umur: 23,
    keluhan: "Sakit gigi",
    obat: "Ibuprofen",
    diagnosa: "Karies",
  },
  {
    nama: "Benjamin Evans",
    umur: 37,
    keluhan: "Sakit perut",
    obat: "Antacid",
    diagnosa: "Dispepsia",
  },
  {
    nama: "Avery Cook",
    umur: 21,
    keluhan: "Demam",
    obat: "Paracetamol",
    diagnosa: "Flu",
  },
  {
    nama: "Grace Brooks",
    umur: 38,
    keluhan: "Nyeri dada",
    obat: "Aspirin",
    diagnosa: "Angina",
  },
  {
    nama: "Jack Morgan",
    umur: 34,
    keluhan: "Pilek",
    obat: "Decongestant",
    diagnosa: "Rinitis",
  },
  {
    nama: "Lily Reed",
    umur: 39,
    keluhan: "Sakit pinggang",
    obat: "Ibuprofen",
    diagnosa: "Sakit pinggang",
  },
];

export default function page() {
  return (
    <main className="relative h-full min-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl w-full">
      <div className="w-full px-6 py-6 mx-auto">
        <Header />

        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}
