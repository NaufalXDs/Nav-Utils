const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const siswaNames = [
    { "name": "John Doe" },
    { "name": "Jane Smith" },
    { "name": "Alice Johnson" },
    { "name": "Bob Brown" },
    { "name": "Charlie Davis" },
    { "name": "David Evans" },
    { "name": "Eva Green" },
    { "name": "Frank Harris" },
    { "name": "Grace Lee" },
    { "name": "Hank Miller" },
    { "name": "Ivy Nelson" },
    { "name": "Jack Owens" },
    { "name": "Kara Parker" },
    { "name": "Liam Quinn" },
    { "name": "Mia Roberts" },
    { "name": "Nina Scott" },
    { "name": "Oscar Taylor" },
    { "name": "Paul Walker" },
    { "name": "Quinn Young" },
    { "name": "Rachel Adams" },
    { "name": "Sam Baker" },
    { "name": "Tina Carter" },
    { "name": "Uma Diaz" },
    { "name": "Victor Edwards" },
    { "name": "Wendy Foster" },
    { "name": "Xander Garcia" },
    { "name": "Yara Hill" },
    { "name": "Zane Jackson" },
    { "name": "Amy King" },
    { "name": "Brian Lewis" },
    { "name": "Cathy Moore" },
    { "name": "Dylan Nash" },
    { "name": "Ella Owens" },
    { "name": "Finn Peterson" },
    { "name": "Gina Quinn" },
    { "name": "Harry Ross" },
    { "name": "Iris Smith" },
    { "name": "Jake Thompson" },
    { "name": "Kylie Underwood" },
    { "name": "Lara Vance" },
    { "name": "Mason White" }
];

async function main() {
    const siswaData = [];
    const dataAbsensiData = [];

    for (let i = 0; i < siswaNames.length; i++) {
        const siswa = await prisma.siswa.create({
            data: {
                absen: i + 1,
                nama: siswaNames[i].name,
                alfa: 0,
                sakit: 0,
                izin: 0,
                hadir: 0,
                hadirtelat: 0,
                uuid: `uuid-${i + 1}`,
            },
        });
        siswaData.push(siswa);

        const dataAbsensi = await prisma.dataAbsensi.create({
            data: {
                nama: siswaNames[i].name,
                status: ['Alfa', 'Izin', 'Sakit', 'Hadir', 'Hadirtelat'][Math.floor(Math.random() * 5)],
                Siswa: {
                    connect: { absen: i + 1 },
                },
            },
        });
        dataAbsensiData.push(dataAbsensi);
    }

    console.log({ siswaData, dataAbsensiData });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

