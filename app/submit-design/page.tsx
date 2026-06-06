"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";

const productTypes = ["T-shirt", "Long Sleeve", "Sweatshirt", "Hoodie", "Pants", "Joggers", "Cargo Pants", "Shorts"] as const;
const colors = ["Black", "White", "Grey", "Navy", "Cream"] as const;

const productOptions = {
  "T-shirt": {
    fits: ["Regular Fit", "Slim Fit", "Oversized Fit", "Boxy Fit"],
    fabric: ["Lightweight", "Medium Weight", "Heavyweight"],
    branding: ["No Branding", "Embroidery", "Printed Logo", "Woven Label"],
    details: [
      { name: "collar", label: "Collar", options: ["Crew Neck", "Heavy Crew Neck", "Mock Neck"] },
      { name: "sleeve", label: "Sleeve", options: ["Short Sleeve", "Long Sleeve"] }
    ]
  },
  "Long Sleeve": {
    fits: ["Regular Fit", "Slim Fit", "Oversized Fit", "Boxy Fit"],
    fabric: ["Lightweight", "Medium Weight", "Heavyweight"],
    branding: ["No Branding", "Embroidery", "Printed Logo", "Woven Label"],
    details: [
      { name: "collar", label: "Collar", options: ["Crew Neck", "Heavy Crew Neck", "Mock Neck"] },
      { name: "sleeve", label: "Sleeve", options: ["Long Sleeve"] }
    ]
  },
  Sweatshirt: {
    fits: ["Regular", "Oversized", "Boxy"],
    fabric: ["Standard Fleece", "Heavy Fleece", "Premium Heavyweight"],
    branding: ["Embroidery", "Screen Print", "Puff Print", "Woven Label"],
    details: []
  },
  Hoodie: {
    fits: ["Regular", "Oversized", "Boxy"],
    fabric: ["Standard Fleece", "Heavy Fleece", "Premium Heavyweight"],
    branding: ["Embroidery", "Screen Print", "Puff Print", "Woven Label"],
    details: []
  },
  Pants: {
    fits: ["Skinny", "Slim", "Straight", "Baggy", "Flare", "Bootcut", "Relaxed"],
    fabric: ["Cotton Twill", "Heavy Cotton", "Nylon Cotton"],
    branding: ["Embroidery", "Printed Logo", "Woven Label"],
    details: [{ name: "legOpening", label: "Leg Opening", options: ["Tapered", "Straight", "Wide"] }]
  },
  Joggers: {
    fits: ["Skinny", "Slim", "Straight", "Baggy", "Flare", "Bootcut", "Relaxed"],
    fabric: ["Cotton Fleece", "Nylon Cotton", "Heavy Cotton"],
    branding: ["Embroidery", "Printed Logo", "Woven Label"],
    details: [{ name: "legOpening", label: "Leg Opening", options: ["Tapered", "Straight", "Wide"] }]
  },
  "Cargo Pants": {
    fits: ["Skinny", "Slim", "Straight", "Baggy", "Flare", "Bootcut", "Relaxed"],
    fabric: ["Cotton Twill", "Ripstop Cotton", "Nylon Cotton"],
    branding: ["Embroidery", "Printed Logo", "Woven Label"],
    details: [{ name: "legOpening", label: "Leg Opening", options: ["Tapered", "Straight", "Wide"] }]
  },
  Shorts: {
    fits: ["Regular", "Relaxed", "Oversized"],
    fabric: ["Cotton Twill", "Fleece Cotton", "Nylon Cotton"],
    branding: ["Embroidery", "Printed Logo", "Woven Label"],
    details: []
  }
} as const;

type ProductType = (typeof productTypes)[number];

function optionId(name: string, value: string) {
  return `${name}-${value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

function PillGroup({ label, name, options }: { label: string; name: string; options: readonly string[] }) {
  return (
    <fieldset className="production-option-group">
      <legend>{label}</legend>
      <div className="option-pills">
        {options.map((option, index) => {
          const id = optionId(name, option);
          return (
            <label className="option-pill" htmlFor={id} key={option}>
              <input id={id} type="radio" name={name} value={option} defaultChecked={index === 0} />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

async function uploadCover(file: File) {
  const signatureResponse = await fetch("/api/uploads/signature", { method: "POST" });
  const signature = await signatureResponse.json().catch(() => ({}));
  if (!signatureResponse.ok) throw new Error(signature.error || "Image upload is unavailable.");

  const body = new FormData();
  body.set("file", file);
  body.set("api_key", signature.apiKey);
  body.set("timestamp", String(signature.timestamp));
  body.set("folder", signature.folder);
  body.set("signature", signature.signature);

  const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`, {
    method: "POST",
    body
  });
  const upload = await uploadResponse.json().catch(() => ({}));
  if (!uploadResponse.ok || !upload.secure_url) throw new Error(upload.error?.message || "Cloudinary upload failed.");
  return upload.secure_url as string;
}

export default function SubmitDesignPage() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [productType, setProductType] = useState<ProductType>("T-shirt");
  const [fit, setFit] = useState("Regular Fit");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const config = productOptions[productType];
  const previewUrl = useMemo(() => (coverFile ? URL.createObjectURL(coverFile) : ""), [coverFile]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function chooseProduct(nextType: ProductType) {
    setProductType(nextType);
    setFit(productOptions[nextType].fits[0]);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("submit start");
    console.log("formRef", formRef?.current);
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const title = String(form.get("title") || "").trim();
    const description = String(form.get("description") || "").trim();
    if (!title || !description) {
      setStatus("Add a title and description before publishing.");
      return;
    }
    if (!coverFile) {
      setStatus("Upload a cover mockup before publishing.");
      return;
    }

    setSubmitting(true);
    setStatus("Uploading mockup...");
    try {
      const uploadResult = await uploadCover(coverFile);
      console.log("upload result", uploadResult);
      setStatus("Saving submission...");
      const response = await fetch("/api/designs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          branding: form.get("branding"),
          collar: form.get("collar") || undefined,
          color: form.get("color"),
          coverImageUrl: uploadResult,
          description,
          fabric: form.get("fabric"),
          fit: form.get("fit"),
          galleryImageUrls: [],
          legOpening: form.get("legOpening") || undefined,
          productType,
          sleeve: form.get("sleeve") || undefined,
          tags: String(form.get("tags") || "")
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
          title
        })
      });
      const result = await response.json().catch(() => ({}));
      console.log("insert result", result);
      if (!response.ok) throw new Error(result.error || "Submission failed.");
      setStatus(`Submission saved for moderation: ${result.design?.slug || title}.`);
      (formRef.current ?? formElement)?.reset();
      setCoverFile(null);
      chooseProduct("T-shirt");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="section-tight">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="section-kicker">Submit design</span>
            <h1 className="section-title">Professional product builder</h1>
          </div>
          <p className="section-copy">Choose realistic clothing specs before the community votes your concept toward production.</p>
        </div>
        <div className="split">
          <form className="form-card submit-builder" onSubmit={submit} ref={formRef}>
            <p className="production-note">To keep production realistic, PULSE currently only accepts limited clothing types and production options.</p>
            <div className="production-matrix">
              <fieldset className="production-option-group full">
                <legend>Product Type</legend>
                <div className="option-pills">
                  {productTypes.map((option) => {
                    const id = optionId("productType", option);
                    return (
                      <label className="option-pill" htmlFor={id} key={option}>
                        <input
                          checked={productType === option}
                          id={id}
                          name="productType"
                          onChange={() => chooseProduct(option)}
                          type="radio"
                          value={option}
                        />
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              <fieldset className="production-option-group fit-option-group">
                <legend>Fit</legend>
                <div className="fit-chip-grid">
                  {config.fits.map((option) => {
                    const id = optionId("fit", option);
                    return (
                      <label className="option-pill fit-pill" htmlFor={id} key={option}>
                        <input checked={fit === option} id={id} name="fit" onChange={() => setFit(option)} type="radio" value={option} />
                        <span><span className="fit-label">{option}</span></span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              {config.details.map((group) => (
                <PillGroup key={`${productType}-${group.name}`} label={group.label} name={group.name} options={group.options} />
              ))}
              <PillGroup key={`${productType}-fabric`} label="Fabric" name="fabric" options={config.fabric} />
              <PillGroup key={`${productType}-branding`} label="Branding" name="branding" options={config.branding} />
              <PillGroup label="Color" name="color" options={colors} />
            </div>
            <div className="builder-step-card">
              <label className="upload-zone" htmlFor="coverImage">
                <strong>Upload Design Mockup</strong>
                <span className="muted">PNG, JPG or WebP. Cloudinary signed upload is used in production.</span>
                <input
                  accept="image/png,image/jpeg,image/webp"
                  id="coverImage"
                  name="coverImage"
                  onChange={(event) => setCoverFile(event.target.files?.[0] || null)}
                  type="file"
                />
              </label>
            </div>
            <div className="builder-step-card">
              <div className="form-grid">
                <input className="field" name="title" placeholder="Title" required />
                <textarea className="textarea full" name="description" placeholder="Description" required />
                <input className="field full" name="tags" placeholder="Tags separated by commas" />
              </div>
            </div>
            <button className="primary-btn" disabled={submitting} style={{ marginTop: 14 }} type="submit">
              {submitting ? "Publishing..." : "Publish concept"}
            </button>
            {status ? <p className="muted form-status">{status}</p> : null}
          </form>
          <aside className="panel preview-panel">
            <h3>Fit Preview</h3>
            <p className="muted">The selected configuration stays constrained so production costing can stay realistic.</p>
            {previewUrl ? <img className="submit-preview-image" src={previewUrl} alt="Selected mockup preview" /> : null}
            <div className="card-meta" style={{ marginTop: 12 }}>
              <span className="metric-pill">{productType}</span>
              <span className="metric-pill">{fit}</span>
              <span className="metric-pill">Pending approval</span>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
