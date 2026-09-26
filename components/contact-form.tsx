"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { contactSchema } from "@/lib/contact";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const input = {
      name: String(fields.get("name") || ""),
      email: String(fields.get("email") || ""),
      message: String(fields.get("message") || ""),
      website: String(fields.get("website") || ""),
    };
    const result = contactSchema.safeParse(input);
    if (!result.success) {
      setMessage(
        "Please add your name, a valid email and a message of at least 20 characters.",
      );
      setState("error");
      return;
    }
    setState("sending");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const data: { ok: boolean; message?: string } = await response.json();
      if (!response.ok || !data.ok)
        throw new Error(
          data.message || "Delivery failed. Please email me directly.",
        );
      setState("sent");
      setMessage("Message received. I’ll be in touch soon.");
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Delivery failed. Please email me directly.",
      );
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-row">
        <label>
          Name{" "}
          <input
            name="name"
            autoComplete="name"
            placeholder="Your name"
            required
            minLength={2}
            maxLength={100}
          />
        </label>
        <label>
          Email{" "}
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </label>
      </div>
      <label>
        Tell me about your project{" "}
        <textarea
          name="message"
          rows={5}
          placeholder="What are you building? What kind of help do you need?"
          required
          minLength={20}
          maxLength={3000}
        />
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="form-footer">
        <button
          className="button button--primary"
          type="submit"
          disabled={state === "sending"}
        >
          {state === "sending" ? (
            <>
              Sending <LoaderCircle className="spin" size={18} />
            </>
          ) : (
            <>
              Send message <ArrowUpRight size={18} />
            </>
          )}
        </button>
        <span>No forms to fill twice. Just a conversation.</span>
      </div>
      {message && (
        <p
          className={`form-feedback ${state === "error" ? "form-feedback--error" : ""}`}
          role="status"
        >
          {message}
          {state === "error" && (
            <>
              {" "}
              <a href="mailto:josephchukwuka4@gmail.com">Email me directly ↗</a>
            </>
          )}
        </p>
      )}
    </form>
  );
}
