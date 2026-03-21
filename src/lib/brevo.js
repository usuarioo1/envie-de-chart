import { BrevoClient } from '@getbrevo/brevo';

const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
});

const SENDER = { name: 'Envie de Chant', email: process.env.NOTIFICATION_EMAIL };
const RECIPIENT = [{ email: process.env.NOTIFICATION_EMAIL }];

async function sendEmail(subject, htmlContent) {
    return brevo.transactionalEmails.sendTransacEmail({
        subject,
        htmlContent,
        sender: SENDER,
        to: RECIPIENT,
    });
}

/**
 * Formatea una fecha extrayendo los componentes del ISO string (UTC)
 * de la misma manera que createDisplayDate() en el frontend,
 * para que la hora coincida con lo que ve el usuario en la página.
 */
function formatWorkshopDate(dateInput) {
    if (!dateInput) return 'Non précisée';

    const isoString = dateInput instanceof Date
        ? dateInput.toISOString()
        : String(dateInput);

    const match = isoString.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
    if (!match) return String(dateInput);

    const [, year, month, day, hour, minute] = match;

    const monthNames = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
        'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

    return `${parseInt(day, 10)} ${monthNames[parseInt(month, 10) - 1]} ${year} à ${hour}:${minute}`;
}

export async function sendStageRegistrationEmail({ name, email, phone, stageTitle, stageDate }) {
    const formattedDate = stageDate || 'Non précisée';

    return sendEmail(
        `📋 Nouvelle inscription au stage : ${stageTitle}`,
        `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #F25A38; border-bottom: 2px solid #F2B988; padding-bottom: 10px;">
                Nouvelle inscription au stage
            </h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr style="background: #f9f9f9;">
                    <td style="padding: 12px; font-weight: bold; width: 35%;">Stage</td>
                    <td style="padding: 12px;">${stageTitle}</td>
                </tr>
                <tr>
                    <td style="padding: 12px; font-weight: bold;">Date</td>
                    <td style="padding: 12px;">${formattedDate}</td>
                </tr>
                <tr style="background: #f9f9f9;">
                    <td style="padding: 12px; font-weight: bold;">Nom</td>
                    <td style="padding: 12px;">${name}</td>
                </tr>
                <tr>
                    <td style="padding: 12px; font-weight: bold;">Email</td>
                    <td style="padding: 12px;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr style="background: #f9f9f9;">
                    <td style="padding: 12px; font-weight: bold;">Téléphone</td>
                    <td style="padding: 12px;">${phone}</td>
                </tr>
            </table>
            <p style="color: #888; font-size: 12px; margin-top: 30px;">
                Envoyé automatiquement depuis envie-de-chant.com
            </p>
        </div>
        `
    );
}

export async function sendWorkshopRegistrationEmail({ name, email, phone, workshopTitle, workshopDate }) {
    const formattedDate = formatWorkshopDate(workshopDate);

    return sendEmail(
        `🎵 Nouvelle inscription à l'atelier : ${workshopTitle}`,
        `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #F25A38; border-bottom: 2px solid #F2B988; padding-bottom: 10px;">
                Nouvelle inscription à l'atelier
            </h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr style="background: #f9f9f9;">
                    <td style="padding: 12px; font-weight: bold; width: 35%;">Atelier</td>
                    <td style="padding: 12px;">${workshopTitle}</td>
                </tr>
                <tr>
                    <td style="padding: 12px; font-weight: bold;">Date</td>
                    <td style="padding: 12px;">${formattedDate}</td>
                </tr>
                <tr style="background: #f9f9f9;">
                    <td style="padding: 12px; font-weight: bold;">Nom</td>
                    <td style="padding: 12px;">${name}</td>
                </tr>
                <tr>
                    <td style="padding: 12px; font-weight: bold;">Email</td>
                    <td style="padding: 12px;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr style="background: #f9f9f9;">
                    <td style="padding: 12px; font-weight: bold;">Téléphone</td>
                    <td style="padding: 12px;">${phone}</td>
                </tr>
            </table>
            <p style="color: #888; font-size: 12px; margin-top: 30px;">
                Envoyé automatiquement depuis envie-de-chant.com
            </p>
        </div>
        `
    );
}

export async function sendStageInquiryEmail({ name, email, phone, formationTitle, formationNumber }) {
    return sendEmail(
        `❓ Nouvelle demande de renseignement : ${formationTitle}`,
        `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #F25A38; border-bottom: 2px solid #F2B988; padding-bottom: 10px;">
                Nouvelle demande de renseignement
            </h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr style="background: #f9f9f9;">
                    <td style="padding: 12px; font-weight: bold; width: 35%;">Formation</td>
                    <td style="padding: 12px;">${formationTitle} (n° ${formationNumber})</td>
                </tr>
                <tr>
                    <td style="padding: 12px; font-weight: bold;">Nom</td>
                    <td style="padding: 12px;">${name}</td>
                </tr>
                <tr style="background: #f9f9f9;">
                    <td style="padding: 12px; font-weight: bold;">Email</td>
                    <td style="padding: 12px;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                    <td style="padding: 12px; font-weight: bold;">Téléphone</td>
                    <td style="padding: 12px;">${phone}</td>
                </tr>
            </table>
            <p style="color: #888; font-size: 12px; margin-top: 30px;">
                Envoyé automatiquement depuis envie-de-chant.com
            </p>
        </div>
        `
    );
}

export async function sendContactEmail({ name, email, subject, message, interest }) {
    return sendEmail(
        `✉️ Nouveau message de contact : ${subject}`,
        `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #F25A38; border-bottom: 2px solid #F2B988; padding-bottom: 10px;">
                Nouveau message de contact
            </h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr style="background: #f9f9f9;">
                    <td style="padding: 12px; font-weight: bold; width: 35%;">Nom</td>
                    <td style="padding: 12px;">${name}</td>
                </tr>
                <tr>
                    <td style="padding: 12px; font-weight: bold;">Email</td>
                    <td style="padding: 12px;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr style="background: #f9f9f9;">
                    <td style="padding: 12px; font-weight: bold;">Sujet</td>
                    <td style="padding: 12px;">${subject}</td>
                </tr>
                ${interest ? `
                <tr>
                    <td style="padding: 12px; font-weight: bold;">Intérêt</td>
                    <td style="padding: 12px;">${interest}</td>
                </tr>` : ''}
                <tr style="background: #f9f9f9;">
                    <td style="padding: 12px; font-weight: bold; vertical-align: top;">Message</td>
                    <td style="padding: 12px; white-space: pre-wrap;">${message}</td>
                </tr>
            </table>
            <p style="color: #888; font-size: 12px; margin-top: 30px;">
                Envoyé automatiquement depuis envie-de-chant.com
            </p>
        </div>
        `
    );
}
