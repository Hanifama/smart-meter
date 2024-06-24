import React from 'react';

const data = [
  { tagihanPerLiter: 'Rp 10,000', tanggalPengajuan: '2024-06-01', harga: 'Rp 100,000' },
  { tagihanPerLiter: 'Rp 15,000', tanggalPengajuan: '2024-06-05', harga: 'Rp 150,000' },
  { tagihanPerLiter: 'Rp 15,000', tanggalPengajuan: '2024-06-05', harga: 'Rp 150,000' },
  { tagihanPerLiter: 'Rp 15,000', tanggalPengajuan: '2024-06-05', harga: 'Rp 150,000' },
  { tagihanPerLiter: 'Rp 15,000', tanggalPengajuan: '2024-06-05', harga: 'Rp 150,000' },
];

const UpdateSection = ({ user }) => {
  return (
    <div className="w-full">
      <table className="table-auto border-collapse border border-gray-200 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2 text-left">Tagihan per Liter</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Tanggal Pengajuan</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Harga</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-2">{row.tagihanPerLiter}</td>
              <td className="border border-gray-200 px-4 py-2">{row.tanggalPengajuan}</td>
              <td className="border border-gray-200 px-4 py-2">{row.harga}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpdateSection;
