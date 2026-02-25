import FtpDeploy from "ftp-deploy";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import 'dotenv/config'; // <--- IL MANQUAIT CETTE LIGNE (très importante !)

const ftpDeploy = new FtpDeploy();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// --- CONFIGURATION CLOUDFLARE (récupérée du .env) ---
const CF_ZONE_ID = process.env.CF_ZONE_ID;
const CF_EMAIL = process.env.CF_EMAIL;
const CF_API_KEY = process.env.CF_API_KEY;

const config = {
    user: process.env.FTP_USER,         // <--- On utilise process.env
    password: process.env.FTP_PASSWORD, // <--- On utilise process.env
    host: process.env.FTP_HOST,         // <--- On utilise process.env
    port: 21,
    localRoot: __dirname + "/dist",
    remoteRoot: "/www/",
    include: ["*", "**/*", ".htaccess", ".ovhconfig"],
    deleteRemote: true,
    forcePasv: true,
    sftp: false
};

console.log("⏳ Début du déploiement sécurisé sur OVH...");

ftpDeploy.on("uploading", function (data) {
    console.log(`📤 Envoi (${data.transferredFileCount}/${data.totalFilesCount}) : ${data.filename}`);
});

ftpDeploy.on("uploaded", function (data) {
    console.log(`✅ Réussi : ${data.filename}`);
});

ftpDeploy.on("upload-error", function (data) {
    console.log(`❌ Erreur sur le fichier : ${data.filename} -> ${data.err}`);
});

// FONCTION DE PURGE
async function purgeCloudflare() {
    console.log("\n☁️  Nettoyage du cache Cloudflare...");
    try {
        const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/purge_cache`, {
            method: "POST",
            headers: {
                "X-Auth-Email": CF_EMAIL,
                "X-Auth-Key": CF_API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ purge_everything: true }),
        });
        const data = await response.json();
        if (data.success) {
            console.log("✨ CACHE PURGÉ : Les clients verront les dernières modifs (dont le nouveau logo) !");
        } else {
            console.error("⚠️ Erreur Cloudflare :", data.errors);
        }
    } catch (err) {
        console.error("❌ Impossible de contacter Cloudflare :", err);
    }
}


ftpDeploy
    .deploy(config)
    .then(async (res) => {
        console.log("\n🚀 SUCCÈS : Fichiers envoyés sur OVH !");
        await purgeCloudflare(); // Déclenchement de la purge
        console.log("\n🏁 Déploiement terminé avec succès !");
    })
    .catch((err) => {
        console.log("\n❌ ERREUR DÉTAILLÉE :");
        console.error(err);
    });
