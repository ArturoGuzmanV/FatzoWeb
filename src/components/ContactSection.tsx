import React, { useState } from 'react';
import { AlertCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { ACTIVATION_STEPS } from '../data/landingData';
import {
  LeadFormErrors,
  LeadFormValues,
  TABLE_RANGE_OPTIONS,
  validateLeadForm,
} from '../utils/leadValidation';
import { getMenuAppUrl } from '../utils/menuConnection';

const INITIAL_VALUES: LeadFormValues = {
  ownerName: '',
  restaurantName: '',
  email: '',
  phone: '',
  tableRange: '',
};

export const ContactSection: React.FC = () => {
  const [values, setValues] = useState<LeadFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [submittedLead, setSubmittedLead] = useState<LeadFormValues | null>(null);
  const menuAppUrl = getMenuAppUrl();

  const handleFieldChange = (field: keyof LeadFormValues, nextValue: string) => {
    setValues((prev) => ({ ...prev, [field]: nextValue }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateLeadForm(values);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setSubmittedLead({
      ownerName: values.ownerName.trim(),
      restaurantName: values.restaurantName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      tableRange: values.tableRange,
    });
  };

  const handleReset = () => {
    setSubmittedLead(null);
    setValues(INITIAL_VALUES);
    setErrors({});
  };

  return (
    <section id="contacto" className="bg-[#fcfdfb]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Onboarding Sequence & Direct Client Redirect */}
          <div className="lg:col-span-5">
            <p className="text-sm font-medium text-[#3a5a18] mb-3">
              Activación asistida
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#111111] tracking-tight leading-[1.12] text-balance">
              Pon tu menú QR y pagos en mesa en marcha en 48 horas
            </h2>
            <p className="mt-4 text-base text-[#465242] leading-relaxed">
              Agenda una sesión de 20 minutos con nuestro equipo en Santiago. Revisamos tu flujo de
              salón actual y te mostramos una prueba con tu propia carta.
            </p>

            <ol className="mt-8 divide-y divide-[#dce7ce] border-t border-b border-[#dce7ce]">
              {ACTIVATION_STEPS.map((step) => (
                <li key={step.index} className="py-5">
                  <p className="font-serif text-base font-semibold text-[#111111]">
                    <span className="text-[#3a5a18] mr-1.5 tabular-nums">{step.index}</span>
                    {step.title}
                  </p>
                  <p className="mt-1.5 text-sm text-[#465242] leading-relaxed">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>

            {/* Direct Link for Existing Clients to Digital Menu App */}
            <div className="mt-7">
              <p className="text-xs text-[#465242]">¿Ya operas tu restaurante con Gustō?</p>
              <a
                href={menuAppUrl}
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-[#111111] hover:text-[#3a5a18] underline underline-offset-4 decoration-[#c5e19b] hover:decoration-[#3a5a18] transition-colors"
              >
                <span>Acceder directamente a tu menú digital</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Column: Validated Lead Capture Form */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-[#dce7ce] p-7 sm:p-10">
            {submittedLead ? (
              <div
                data-testid="lead-confirmation"
                className="py-6 space-y-6"
                role="status"
                aria-live="polite"
              >
                <div className="w-12 h-12 rounded-full bg-[#eaf4de] text-[#3a5a18] flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                </div>

                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#111111]">
                    Solicitud recibida para {submittedLead.restaurantName}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-[#465242] leading-relaxed">
                    Gracias, {submittedLead.ownerName}. Un especialista de implementación te
                    escribirá a <span className="font-semibold text-[#111111]">{submittedLead.email}</span>{' '}
                    o por WhatsApp al{' '}
                    <span className="font-semibold text-[#111111] tabular-nums">
                      {submittedLead.phone}
                    </span>{' '}
                    en menos de un día hábil.
                  </p>
                </div>

                <dl className="pt-5 border-t border-[#dce7ce] grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-xs text-[#465242]">Restaurante</dt>
                    <dd className="mt-0.5 font-semibold text-[#111111]">
                      {submittedLead.restaurantName}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#465242]">Capacidad informada</dt>
                    <dd className="mt-0.5 font-semibold text-[#111111]">
                      {submittedLead.tableRange}
                    </dd>
                  </div>
                </dl>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-5 py-2.5 min-h-[44px] rounded-full border border-[#dce7ce] bg-[#f4f9ee] hover:bg-[#eaf4de] text-sm font-semibold text-[#111111] transition-colors"
                  >
                    Registrar otro local
                  </button>
                  <a
                    href={menuAppUrl}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111111] hover:text-[#3a5a18] underline underline-offset-4"
                  >
                    <span>Ir al menú digital</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="pb-4 border-b border-[#dce7ce]">
                  <h3 className="font-serif text-2xl font-semibold text-[#111111]">
                    Solicitar demostración personalizada
                  </h3>
                  <p className="mt-1 text-sm text-[#465242]">
                    Sin compromisos ni costos de instalación ocultos.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Owner Name */}
                  <div>
                    <label
                      htmlFor="lead-owner-name"
                      className="block text-sm font-semibold text-[#111111] mb-1.5"
                    >
                      Nombre y apellido
                    </label>
                    <input
                      id="lead-owner-name"
                      name="ownerName"
                      type="text"
                      autoComplete="name"
                      placeholder="Ej. Camila Soto"
                      value={values.ownerName}
                      onChange={(e) => handleFieldChange('ownerName', e.target.value)}
                      aria-invalid={Boolean(errors.ownerName)}
                      aria-describedby={errors.ownerName ? 'err-owner-name' : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-[#fcfdfb] border text-sm text-[#111111] placeholder:text-[#6e7b68] focus:outline-none focus:ring-2 focus:ring-[#111111] transition-colors ${
                        errors.ownerName ? 'border-red-600' : 'border-[#cbd8bc]'
                      }`}
                    />
                    {errors.ownerName && (
                      <p
                        id="err-owner-name"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.ownerName}</span>
                      </p>
                    )}
                  </div>

                  {/* Restaurant Name */}
                  <div>
                    <label
                      htmlFor="lead-restaurant-name"
                      className="block text-sm font-semibold text-[#111111] mb-1.5"
                    >
                      Nombre del restaurante
                    </label>
                    <input
                      id="lead-restaurant-name"
                      name="restaurantName"
                      type="text"
                      autoComplete="organization"
                      placeholder="Ej. Bistró Cordillera"
                      value={values.restaurantName}
                      onChange={(e) => handleFieldChange('restaurantName', e.target.value)}
                      aria-invalid={Boolean(errors.restaurantName)}
                      aria-describedby={errors.restaurantName ? 'err-restaurant-name' : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-[#fcfdfb] border text-sm text-[#111111] placeholder:text-[#6e7b68] focus:outline-none focus:ring-2 focus:ring-[#111111] transition-colors ${
                        errors.restaurantName ? 'border-red-600' : 'border-[#cbd8bc]'
                      }`}
                    />
                    {errors.restaurantName && (
                      <p
                        id="err-restaurant-name"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.restaurantName}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="lead-email"
                      className="block text-sm font-semibold text-[#111111] mb-1.5"
                    >
                      Correo electrónico
                    </label>
                    <input
                      id="lead-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="nombre@restaurante.cl"
                      value={values.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'err-email' : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-[#fcfdfb] border text-sm text-[#111111] placeholder:text-[#6e7b68] focus:outline-none focus:ring-2 focus:ring-[#111111] transition-colors ${
                        errors.email ? 'border-red-600' : 'border-[#cbd8bc]'
                      }`}
                    />
                    {errors.email && (
                      <p
                        id="err-email"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <label
                      htmlFor="lead-phone"
                      className="block text-sm font-semibold text-[#111111] mb-1.5"
                    >
                      Teléfono o WhatsApp
                    </label>
                    <input
                      id="lead-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+56 9 8412 3301"
                      value={values.phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'err-phone' : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-[#fcfdfb] border text-sm text-[#111111] placeholder:text-[#6e7b68] focus:outline-none focus:ring-2 focus:ring-[#111111] transition-colors ${
                        errors.phone ? 'border-red-600' : 'border-[#cbd8bc]'
                      }`}
                    />
                    {errors.phone && (
                      <p
                        id="err-phone"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Table Count Select */}
                <div>
                  <label
                    htmlFor="lead-table-range"
                    className="block text-sm font-semibold text-[#111111] mb-1.5"
                  >
                    Cantidad aproximada de mesas
                  </label>
                  <select
                    id="lead-table-range"
                    name="tableRange"
                    value={values.tableRange}
                    onChange={(e) => handleFieldChange('tableRange', e.target.value)}
                    aria-invalid={Boolean(errors.tableRange)}
                    aria-describedby={errors.tableRange ? 'err-table-range' : undefined}
                    className={`w-full px-4 py-3 rounded-xl bg-[#fcfdfb] border text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111] transition-colors ${
                      errors.tableRange ? 'border-red-600' : 'border-[#cbd8bc]'
                    }`}
                  >
                    <option value="">Selecciona una opción</option>
                    {TABLE_RANGE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.tableRange && (
                    <p
                      id="err-table-range"
                      role="alert"
                      className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.tableRange}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 min-h-[48px] rounded-full bg-[#111111] hover:bg-[#262626] text-white text-sm sm:text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
                  >
                    Agendar demostración gratuita
                  </button>
                  <p className="mt-3 text-xs text-center text-[#465242]">
                    Respuesta directa de nuestro equipo comercial en Santiago, de lunes a sábado.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
