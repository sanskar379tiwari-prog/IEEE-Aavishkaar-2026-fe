"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { RegistrationSchema, RegistrationFormValues } from "@/lib/validations/registration";
import { ReceiptSuccessCard } from "./ReceiptSuccessCard";

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<RegistrationFormValues | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [maxMembers, setMaxMembers] = useState<number>(Infinity);
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ?? '';

  useEffect(() => {
    // If we have an external API, use it. Otherwise, use local /api (which user will delete).
    const settingsUrl = `${apiBase}/api/settings`;
    fetch(settingsUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.maxMembers) {
          setMaxMembers(data.maxMembers);
        }
      })
      .catch((err) => console.error("Failed to fetch settings:", err));
  }, [apiBase]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      teamName: "",
      leadName: "",
      leadEmail: "",
      leadPhone: "",
      leadUSN: "",
      teamMembers: [{ name: "", usn: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "teamMembers",
    control,
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const registerUrl = `${apiBase}/api/register`;
      const response = await fetch(registerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      let result;
      const text = await response.text();
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error("Server returned invalid non-JSON response.");
      }

      if (!response.ok) {
        setErrorMsg(result.message || "Failed to establish connection.");
      } else {
        setSubmittedData(data);
        setIsSuccess(true);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("CRITICAL ERROR: Uplink terminated.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess && submittedData) {
    return (
      <ReceiptSuccessCard
        data={submittedData}
        onReset={() => {
          setIsSuccess(false);
          setSubmittedData(null);
        }}
      />
    );
  }

  return (
    <div
      className="w-full bg-panel p-1 border border-panel-border"
      style={{ boxShadow: "0 0 50px rgba(0,0,0,0.5)" }}
    >
      <div className="border border-panel-border p-6 sm:p-10 relative">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-orange -translate-x-[2px] -translate-y-[2px]" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-orange translate-x-[2px] -translate-y-[2px]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-orange -translate-x-[2px] translate-y-[2px]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-orange translate-x-[2px] translate-y-[2px]" />

        <div className="mb-10 text-center">
          <p className="text-cyan font-space text-xs tracking-[0.3em] uppercase mb-2">{"// EXECUTE REGISTRATION PROTOCOL //"}</p>
          <h2 className="text-3xl font-space font-bold text-white uppercase tracking-widest">
            Team <span className="text-orange">Registrations</span>
          </h2>
        </div>

        {errorMsg && (
          <div className="mb-8 p-4 bg-orange/10 border border-orange text-orange font-space text-sm tracking-widest uppercase text-center">
            [ERROR] {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

          <div className="space-y-6">
            <h3 className="flex items-center gap-4 text-orange font-space font-bold tracking-widest uppercase opacity-80">
              <span className="h-[2px] w-8 bg-orange flex-shrink-0" />
              Lead Details
              <span className="h-[2px] w-full bg-panel-border" />
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs text-text-dim uppercase tracking-[0.15em] pl-1 font-space">TEAM NAME *</label>
                <input
                  {...register("teamName")}
                  placeholder="Team Name"
                  className={`w-full px-4 py-3 bg-bg-main border ${errors.teamName ? 'border-orange' : 'border-panel-border'} text-white focus:outline-none focus:border-cyan transition-colors font-space`}
                />
                {errors.teamName && <p className="text-orange text-xs mt-1 uppercase pl-1">{errors.teamName.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs text-text-dim uppercase tracking-[0.15em] pl-1 font-space">LEAD NAME *</label>
                <input
                  {...register("leadName")}
                  placeholder="Enter your name"
                  className={`w-full px-4 py-3 bg-bg-main border ${errors.leadName ? 'border-orange' : 'border-panel-border'} text-white focus:outline-none focus:border-cyan transition-colors font-space`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-text-dim uppercase tracking-[0.15em] pl-1 font-space">LEAD EMAIL *</label>
                <input
                  {...register("leadEmail")}
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3 bg-bg-main border ${errors.leadEmail ? 'border-orange' : 'border-panel-border'} text-white focus:outline-none focus:border-cyan transition-colors font-space`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-text-dim uppercase tracking-[0.15em] pl-1 font-space">LEAD PHONE NO. *</label>
                <input
                  {...register("leadPhone")}
                  placeholder="Phone Number"
                  className={`w-full px-4 py-3 bg-bg-main border ${errors.leadPhone ? 'border-orange' : 'border-panel-border'} text-white focus:outline-none focus:border-cyan transition-colors font-space`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-text-dim uppercase tracking-[0.15em] pl-1 font-space">LEAD USN *</label>
                <input
                  {...register("leadUSN")}
                  placeholder="ex-1MS24CS000"
                  className={`w-full px-4 py-3 bg-bg-main border ${errors.leadUSN ? 'border-orange' : 'border-panel-border'} text-white focus:outline-none focus:border-cyan transition-colors font-space uppercase`}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="flex items-center gap-4 text-orange font-space font-bold tracking-widest uppercase opacity-80">
              <span className="h-[2px] w-8 bg-orange flex-shrink-0" />
              Team Members
              <span className="h-[2px] w-full bg-panel-border" />
            </h3>

            <div className="flex justify-between items-center bg-bg-main border border-panel-border px-4 py-2">
              <span className="text-cyan text-xs uppercase tracking-widest">
                MEMBERS Registered: {fields.length}
              </span>
              <span className="text-text-dim text-xs uppercase tracking-widest">
                Max Capacity: {maxMembers === Infinity ? "--" : maxMembers.toString().padStart(2, '0')}
              </span>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="relative group bg-bg-main border border-panel-border p-4 transition-colors hover:border-cyan/50">
                  <div className="absolute top-0 right-0 bg-panel-border px-2 py-1 text-[10px] text-text-dim font-space">
                    MEMBER_{index.toString().padStart(2, '0')}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <div className="space-y-1">
                      <label className="text-[10px] text-cyan uppercase tracking-widest font-space">MEMBER NAME *</label>
                      <input
                        {...register(`teamMembers.${index}.name`)}
                        className="w-full bg-transparent border-0 border-b border-panel-border text-white text-sm focus:ring-0 focus:border-orange font-space py-1"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-cyan uppercase tracking-widest font-space flex justify-between">
                        <span>MEMBER USN</span>
                      </label>
                      <input
                        {...register(`teamMembers.${index}.usn`)}
                        className="w-full bg-transparent border-0 border-b border-panel-border text-white text-sm focus:ring-0 focus:border-orange font-space py-1 uppercase"
                      />
                    </div>
                  </div>

                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-orange/60 hover:text-orange text-[10px] uppercase tracking-widest mt-3 underline"
                    >
                      [ Remove Node ]
                    </button>
                  )}
                </div>
              ))}

              {errors.teamMembers && !Array.isArray(errors.teamMembers) && (
                <p className="text-orange text-xs mt-1 uppercase text-center block w-full">{errors.teamMembers.message}</p>
              )}

              {fields.length < maxMembers ? (
                <button
                  type="button"
                  onClick={() => append({ name: "", usn: "" })}
                  className="w-full py-4 border-2 border-dashed border-panel-border text-cyan font-space text-xs uppercase tracking-[0.2em] hover:bg-bg-main hover:border-cyan/50 transition-all active:scale-[0.98]"
                >
                  + Append Squad Node
                </button>
              ) : (
                <div className="w-full py-4 bg-orange/10 border border-orange text-orange font-space text-xs uppercase tracking-[0.2em] text-center">
                  CAPACITY LIMIT REACHED
                </div>
              )}
            </div>
          </div>

          <div className="pt-8 mb-2 border-t border-panel-border">
            <button
              type="submit"
              disabled={isSubmitting}
              style={{ boxShadow: "0 0 25px rgba(255,95,52,0.4)" }}
              className="w-full py-5 bg-orange text-white font-space font-bold uppercase tracking-[0.3em] hover:bg-orange-dim transition-colors disabled:opacity-50 disabled:bg-panel-border flex justify-center items-center gap-3"
            >
              {isSubmitting ? "Transmitting..." : (
                <>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11 2v10h-3l4 10 4-10h-3v-10z" /></svg>
                  JOIN THE FLEET
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
