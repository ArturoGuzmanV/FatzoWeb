export interface LeadFormValues {
  ownerName: string;
  restaurantName: string;
  email: string;
  phone: string;
  tableRange: string;
}

export type LeadFormErrors = Partial<Record<keyof LeadFormValues, string>>;

export const TABLE_RANGE_OPTIONS = [
  'Menos de 15 mesas',
  '15 a 35 mesas',
  '36 a 70 mesas',
  'Más de 70 mesas / Cadena',
] as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validates restaurant owner demo request fields without bypassing missing or malformed inputs.
 */
export function validateLeadForm(values: LeadFormValues): {
  isValid: boolean;
  errors: LeadFormErrors;
} {
  const errors: LeadFormErrors = {};

  const ownerName = values.ownerName.trim();
  if (ownerName.length < 2) {
    errors.ownerName = 'Ingresa tu nombre y apellido.';
  }

  const restaurantName = values.restaurantName.trim();
  if (restaurantName.length < 2) {
    errors.restaurantName = 'Indica el nombre de tu restaurante o bar.';
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = 'Ingresa un correo electrónico de contacto.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'El formato del correo no es válido (ej. nombre@restaurante.cl).';
  }

  const phoneDigits = values.phone.replace(/\D/g, '');
  if (!phoneDigits) {
    errors.phone = 'Ingresa tu número de WhatsApp o teléfono.';
  } else if (phoneDigits.length < 8 || phoneDigits.length > 15) {
    errors.phone = 'Ingresa un número válido de al menos 8 dígitos (ej. +56 9 8412 3301).';
  }

  if (!values.tableRange.trim()) {
    errors.tableRange = 'Selecciona el tamaño aproximado de tu local.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
