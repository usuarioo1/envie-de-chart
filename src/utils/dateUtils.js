/**
 * Utilidades para manejar fechas sin conversión de zona horaria
 * Estas funciones tratan las fechas como "naive" (sin zona horaria)
 * preservando la hora exacta como fue ingresada
 */

/**
 * Convierte un string de datetime-local a un objeto que preserva la hora exacta
 * @param {string} datetimeLocalString - String en formato "YYYY-MM-DDTHH:mm"
 * @returns {Object} Objeto con componentes de fecha
 */
export function parseDatetimeLocal(datetimeLocalString) {
    if (!datetimeLocalString) return null;
    
    // Asegurarse de que tenemos el formato correcto
    const match = datetimeLocalString.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
    if (!match) return null;
    
    const [, year, month, day, hour, minute] = match;
    
    return {
        year: parseInt(year, 10),
        month: parseInt(month, 10),
        day: parseInt(day, 10),
        hour: parseInt(hour, 10),
        minute: parseInt(minute, 10),
        toString() {
            return `${year}-${month}-${day} ${hour}:${minute}`;
        }
    };
}

/**
 * Convierte componentes de fecha a un string datetime-local para inputs
 * @param {Object|Date|string} dateInput - Fecha en varios formatos
 * @returns {string} String en formato "YYYY-MM-DDTHH:mm"
 */
export function toDatetimeLocalString(dateInput) {
    if (!dateInput) return '';
    
    let year, month, day, hour, minute;
    
    if (typeof dateInput === 'object' && dateInput.year) {
        // Ya es un objeto con componentes
        ({ year, month, day, hour, minute } = dateInput);
    } else if (typeof dateInput === 'string') {
        // Es un string - puede ser ISO o datetime-local
        if (dateInput.includes('T')) {
            // Formato ISO o datetime-local
            const match = dateInput.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
            if (match) {
                [, year, month, day, hour, minute] = match.map((v, i) => i === 0 ? v : parseInt(v, 10));
            }
        }
    } else if (dateInput instanceof Date) {
        // Es un objeto Date - extraer componentes sin conversión de zona horaria
        const isoString = dateInput.toISOString();
        const match = isoString.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
        if (match) {
            [, year, month, day, hour, minute] = match.map((v, i) => i === 0 ? v : parseInt(v, 10));
        }
    }
    
    if (!year || !month || !day) return '';
    
    const pad = (num) => String(num).padStart(2, '0');
    return `${year}-${pad(month)}-${pad(day)}T${pad(hour || 0)}:${pad(minute || 0)}`;
}

/**
 * Crea un objeto Date para display sin conversión de zona horaria
 * IMPORTANTE: Solo usar para mostrar, no para cálculos
 * @param {string} datetimeString - String de fecha
 * @returns {Date} Objeto Date
 */
export function createDisplayDate(datetimeString) {
    if (!datetimeString) return new Date();
    
    // Extraer componentes
    const match = datetimeString.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
    if (!match) {
        // Si no coincide, intentar parsearlo como está (fallback)
        return new Date(datetimeString);
    }
    
    const [, year, month, day, hour, minute] = match;
    
    // Crear Date usando los componentes directamente (interpreta como hora local)
    return new Date(
        parseInt(year, 10),
        parseInt(month, 10) - 1, // JavaScript usa meses 0-11
        parseInt(day, 10),
        parseInt(hour, 10),
        parseInt(minute, 10)
    );
}

/**
 * Formatea una fecha para mostrar al usuario
 * @param {string|Date} dateInput - Fecha a formatear
 * @param {Object} options - Opciones de formato
 * @returns {string} Fecha formateada
 */
export function formatDisplayDate(dateInput, options = {}) {
    const date = typeof dateInput === 'string' ? createDisplayDate(dateInput) : dateInput;
    
    const {
        showTime = true,
        showDate = true,
        locale = 'fr-FR'
    } = options;
    
    let result = '';
    
    if (showDate) {
        result += date.toLocaleDateString(locale, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    if (showTime) {
        if (result) result += ' à ';
        result += date.toLocaleTimeString(locale, {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    return result;
}

/**
 * Extrae el día de la semana de una fecha
 * @param {string|Date} dateInput - Fecha
 * @returns {string} Día de la semana en francés
 */
export function getDayOfWeek(dateInput) {
    const date = typeof dateInput === 'string' ? createDisplayDate(dateInput) : dateInput;
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return days[date.getDay()];
}

/**
 * Convierte una fecha a formato ISO string pero preservando la hora local
 * Útil para guardar en MongoDB
 * @param {string} datetimeLocalString - String del input datetime-local
 * @returns {string} String en formato compatible con MongoDB
 */
export function toStorageFormat(datetimeLocalString) {
    if (!datetimeLocalString) return null;
    
    // Si ya incluye segundos y zona horaria, devolverlo como está
    if (datetimeLocalString.includes('Z') || datetimeLocalString.includes('+')) {
        return datetimeLocalString;
    }
    
    // Agregar segundos si no los tiene
    const withSeconds = datetimeLocalString.includes(':') && 
                        datetimeLocalString.split(':').length === 2
        ? `${datetimeLocalString}:00`
        : datetimeLocalString;
    
    // Retornar sin zona horaria para que MongoDB lo guarde como está
    return withSeconds;
}

/**
 * Convierte desde formato de storage (MongoDB) a datetime-local
 * @param {string|Date} storageDate - Fecha desde MongoDB
 * @returns {string} String para input datetime-local
 */
export function fromStorageFormat(storageDate) {
    if (!storageDate) return '';
    
    if (typeof storageDate === 'string') {
        // Extraer solo la parte de fecha y hora, ignorar zona horaria
        const match = storageDate.match(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})/);
        return match ? match[1] : '';
    }
    
    if (storageDate instanceof Date) {
        return toDatetimeLocalString(storageDate);
    }
    
    return '';
}
