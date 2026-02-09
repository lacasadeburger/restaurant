import FtpDeploy from "ftp-deploy";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const ftpDeploy = new FtpDeploy();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
    user: "ton-identifiant-ovh", // À remplacer par tes vrais accès
    password: "ton-mot-de-pago-ovh", // À remplacer par tes vrais accès
    host: "ftp.clusterXXX.ovh.net", // À remplacer par ton hôte
    port: 21,
    localRoot: __dirname + "/dist",
    remoteRoot: "/www/",
    include: ["*", "**/*"],
    deleteRemote: true, // Très bien pour éviter les fichiers fantômes
    forcePasv: true,
    sftp: false
};

console.log("⏳ Début du déploiement sur OVH...");

ftpDeploy
    .deploy(config)
    .then((res) => console.log("🚀 Succès : Site mis à jour sur OVH !"))
    .catch((err) => console.log("❌ Erreur :", err));
