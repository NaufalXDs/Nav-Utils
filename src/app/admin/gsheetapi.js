import { google } from "googleapis";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GSheetAPI(absen) {
    try {
        // Mengambil data absen pertama dari database menggunakan Prisma
        const absenPertama = await prisma.dataAbsensi.findFirst({
            where: {
                absen: absen
            }
        });

        if (!absenPertama) {
            throw new Error("Tidak ada data absen yang ditemukan di database.");
        }

        const namaAbsenPertama = absenPertama.nama;
        const auth = new google.auth.GoogleAuth({
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            },
        });
        const sheets = google.sheets({ version: "v4", auth: await auth.getClient() });
        const ranges = "Juni!A:Z"
        const sheet = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: ranges
        });

        // Mencari nama absen pertama di dalam sheet
        const rows = sheet.data.values;
        const rowIndex = rows.findIndex(row => row.includes(namaAbsenPertama));

        if (rowIndex === -1) {
            console.log(`Nama ${namaAbsenPertama} tidak ditemukan di dalam sheet.`);
        } else {
            console.log(`Nama ${namaAbsenPertama} ditemukan di baris ke-${rowIndex + 1} di dalam sheet.`);
            // date harus berupa string
            const currentDate = new Date().toLocaleDateString('id-ID', { day: 'numeric' });
            // const currentDate = new Date().toLocaleDateString('id-ID', {
            //     day: '2-digit',
            // });

            const headerRow = rows[1];
            const dateColumnIndex = headerRow.findIndex(date => date === currentDate);

            if (dateColumnIndex === -1) {
                console.log(`Tanggal ${currentDate} tidak ditemukan di dalam sheet.`);
            } else {
                const updateData = {
                    range: `Juni!${String.fromCharCode(65 + dateColumnIndex)}${rowIndex + 1}`,
                    valueInputOption: 'RAW',
                    resource: {
                        values: [
                            [`${absenPertama.status}`]
                        ]
                    }
                };

                await sheets.spreadsheets.values.update({
                    spreadsheetId: process.env.GOOGLE_SHEET_ID,
                    ...updateData
                });

                console.log(`Data absen untuk ${namaAbsenPertama} pada tanggal ${currentDate} telah diperbarui.`);
            }
        }
    } catch (error) {
        console.error("Error accessing Google Sheets API:", error);
    }
};
