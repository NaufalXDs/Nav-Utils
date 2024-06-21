import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async (req) => {
    try {
        const absensi = await prisma.dataAbsensi.findMany({
            include: {
                Siswa: {
                    select: {
                        alfa: true,
                        sakit: true,
                        izin: true,
                        hadir: true,
                        uid: true,
                    },
                },
            },
        });
        return NextResponse.json(absensi, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export const POST = async (req) => {
    const body = await req.json();
    const { absen, nama, uid, status } = body;
    try {
        const siswa = await prisma.siswa.upsert({
            where: { absen: absen },
            update: { nama: nama, uid: uid },
            create: { absen: absen, nama: nama, uid: uid }
        });

        const dataAbsensi = await prisma.dataAbsensi.create({
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
        const { absen, status, alfa, sakit, izin, hadir, hadirtelat, uid } = body;

        const updatedSiswa = await prisma.siswa.update({
            where: { absen: Number(absen) },
            data: {
                ...(alfa !== undefined && { alfa }),
                ...(sakit !== undefined && { sakit }),
                ...(izin !== undefined && { izin }),
                ...(hadir !== undefined && { hadir }),
                ...(hadirtelat !== undefined && { hadirtelat }),
                ...(uid !== undefined && { uid }),
            },
        });

        const updatedDataAbsensi = await prisma.dataAbsensi.update({
            where: { absen: Number(absen) },
            data: {
                ...(status !== undefined && { status }),
            },
            include: {
                Siswa: {
                    select: {
                        alfa: true,
                        sakit: true,
                        izin: true,
                        hadir: true,
                        uid: true,
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
        await prisma.dataAbsensi.delete({
            where: { absen: Number(absen) },
        });
        return NextResponse.json(null, { status: 204 });
    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
};
