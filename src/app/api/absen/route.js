import { Gprisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const GET = async (req) => {
    try {
        const { searchParams } = new URL(req.url);
        const absen = searchParams.get('absen');

        let absensi;
        if (absen) {
            absensi = await Gprisma.dataAbsensi.findFirst({
                where: { absen: Number(absen) },
                include: {
                    Siswa: {
                        select: {
                            hadir: true,
                            sakit: true,
                            izin: true,
                            alfa: true,
                            uuid: true,
                        },
                    },
                },
            });
        } else {
            absensi = await Gprisma.dataAbsensi.findMany({
                include: {
                    Siswa: {
                        select: {
                            hadir: true,
                            sakit: true,
                            izin: true,
                            alfa: true,
                            uuid: true,
                        },
                    },
                },
            });
        }

        return NextResponse.json(absensi, {
            status: 200,
            headers: { ...corsHeaders },
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, {
            status: 500,
            headers: { ...corsHeaders }
        });
    }
};

export const POST = async (req) => {
    const body = await req.json();
    const { absen, nama, uuid, status } = body;
    try {
        const siswa = await Gprisma.siswa.upsert({
            where: { absen: absen },
            update: { nama: nama, uuid: uuid },
            create: { absen: absen, nama: nama, uuid: uuid || 'uuid' }
        });

        const dataAbsensi = await Gprisma.dataAbsensi.create({
            data: {
                absen: absen,
                nama: nama,
                status: status,
            }
        });

        return NextResponse.json([siswa, dataAbsensi], { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export const PUT = async (req) => {
    try {
        const body = await req.json();
        const { absen, status, alfa, sakit, izin, hadir, hadirtelat, uuid } = body;

        const statusFields = ['alfa', 'sakit', 'izin', 'hadir', 'hadirtelat'];
        try {
            if (statusFields.includes(status)) {
                await Gprisma.siswa.update({
                    where: { absen: Number(absen) },
                    data: {
                        [status]: { increment: 1 }
                    }
                });
                console.log(`Berhasil update status ${status}`);
            }

        } catch (error) {
            console.log(error.message);
        }
        const updatedSiswa = await Gprisma.siswa.update({
            where: { absen: Number(absen) },
            data: {
                ...(alfa !== undefined && { alfa }),
                ...(sakit !== undefined && { sakit }),
                ...(izin !== undefined && { izin }),
                ...(hadir !== undefined && { hadir }),
                ...(hadirtelat !== undefined && { hadirtelat }),
                ...(uuid !== undefined && { uuid }),
            },
        });

        const updatedDataAbsensi = await Gprisma.dataAbsensi.update({
            where: { absen: Number(absen) },
            data: {
                ...(status !== undefined && { status: status.charAt(0).toUpperCase() + status.slice(1) }),
                updateAt: new Date(),
            },
            include: {
                Siswa: {
                    select: {
                        alfa: true,
                        sakit: true,
                        izin: true,
                        hadir: true,
                        uuid: true,
                        hadirtelat: true,
                    },
                },
            },
        });

        return NextResponse.json({ updatedSiswa, updatedDataAbsensi }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export const DELETE = async (req) => {
    try {
        const body = await req.json();
        const { absen } = body;
        const deletedDataAbsensi = await Gprisma.dataAbsensi.delete({
            where: { absen: Number(absen) },
        });

        const deletedSiswa = await Gprisma.siswa.delete({
            where: { absen: Number(absen) },
        });
        return NextResponse.json({ deletedDataAbsensi, deletedSiswa }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
};
