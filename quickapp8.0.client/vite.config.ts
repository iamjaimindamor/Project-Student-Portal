import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';

const baseFolder =
    env.APPDATA !== undefined && env.APPDATA !== ''
        ? `${env.APPDATA}/ASP.NET/https`
        : `${env.HOME}/.aspnet/https`;

const certificateName = "quickapp.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    if (0 !== child_process.spawnSync('dotnet', [
        'dev-certs',
        'https',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password',
    ], { stdio: 'inherit', }).status) {
        throw new Error("Could not create certificate.");
    }
}

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7264';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '^/api': {
                target,
                secure: false
            },
            '^/connect': {
                target,
                secure: false
            },
            '^/Auth': {
                target,
                secure: false
            },
            '^/get-subjects':{
                target,
                secure: false
            },
            '^/add-subjects':{
                target,
                secure: false
            },
            '^/delete-subject':{
                target,
                secure: false
            },
            '^/assign-subject-to-faculty':{
                target,
                secure: false
            },
            '^/assigned-faculty':{
                target,
                secure: false
            },
            '^/remove-assigned-subject':{
                target,
                secure: false
            },
            '^/start-exam':{
                target,
                secure: false
            },
            '^/get-exams-list':{
                target,
                secure: false
            },
            '^/delete-exam':{
                target,
                secure: false
            },
            '^/grading-students':{
                target,
                secure: false
            },
            '^/results':{
                target,
                secure: false
            },
            '^/delete-grade-history':{
                target,
                secure: false
            },
            '^/all-students-opted-subject':{
                target,
                secure: false
            },
            '^/delete-opted-subject':{
                target,
                secure: false
            },
            '^/opt-subject':{
                target,
                secure: false
            },
            '^/update-exam-state':{
                target,
                secure: false
            },
            '/lock-unlock-subject-select':{
                target,
                secure: false
            }

        },
        port: 5173,
        https: {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
        }
    }
})
