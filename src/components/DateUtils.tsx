// Fungsi untuk memformat tanggal
export const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('-').map(Number);

  // Nama bulan dalam bahasa Indonesia
  const monthNames = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  return `${day.toString().padStart(2, '0')} ${monthNames[month - 1]} ${year}`;
};
