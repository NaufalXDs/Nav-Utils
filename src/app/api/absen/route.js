import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
const prisma = new PrismaClient();

export const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const GET = async (req) => {
    try {
        const absensi = await prisma.dataAbsensi.findMany({
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
        const siswa = await prisma.siswa.upsert({
            where: { absen: absen },
            update: { nama: nama, uuid: uuid },
            create: { absen: absen, nama: nama, uuid: uuid }
        });

        const dataAbsensi = await prisma.dataAbsensi.create({
            data: {
                absen: absen,
                nama: nama,
                status: status.charAt(0).toUpperCase() + status.slice(1),
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

        const updatedSiswa = await prisma.siswa.update({
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

        const updatedDataAbsensi = await prisma.dataAbsensi.update({
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
        const deletedDataAbsensi = await prisma.dataAbsensi.delete({
            where: { absen: Number(absen) },
        });

        const deletedSiswa = await prisma.siswa.delete({
            where: { absen: Number(absen) },
        });
        return NextResponse.json({ deletedDataAbsensi, deletedSiswa }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
};
