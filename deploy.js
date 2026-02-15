import FtpDeploy from "ftp-deploy";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const ftpDeploy = new FtpDeploy();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
    user: "lacasdt",
    password: "Amordemivida2",
    host: "ftp.cluster129.hosting.ovh.net",
    port: 21,
    localRoot: __dirname + "/dist",
    remoteRoot: "/www/",
    include: ["*", "**/*"],
    // On désactive deleteRemote temporairement pour tester si c'est ça qui bloque
    deleteRemote: false,
    forcePasv: true,
    sftp: false
};

console.log("⏳ Début du déploiement sur OVH...");

// AJOUT DU SUIVI EN TEMPS RÉEL
ftpDeploy.on("uploading", function (data) {
    console.log(`📤 Envoi (${data.transferredFileCount}/${data.totalFilesCount}) : ${data.filename}`);
});

ftpDeploy.on("uploaded", function (data) {
    console.log(`✅ Réussi : ${data.filename}`);
});

ftpDeploy.on("upload-error", function (data) {
    console.log(`❌ Erreur sur le fichier : ${data.filename} -> ${data.err}`);
});

ftpDeploy
    .deploy(config)
    .then((res) => console.log("\n🚀 SUCCÈS : Ton site est en ligne sur lacasadeburger.es !"))
    .catch((err) => {
        console.log("\n❌ ERREUR DÉTAILLÉE :");
        console.error(err);
    });
