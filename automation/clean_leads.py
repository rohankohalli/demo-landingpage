"""
LionReach Media - Lead Data Cleaning & Automation Pipeline
==========================================================
Automates the weekly ingestion, validation, deduplication, standardization,
and enrichment of inbound campaign leads.

Author: Web Developer Candidate (Front-End & Automation Assessment)
Requirements: Python 3.8+ (Zero external dependencies required)
"""

import os
import sys
import csv
import re
from datetime import datetime
from collections import Counter, defaultdict

# --- CONFIGURATION & RULES ---

PERSONAL_EMAIL_DOMAINS = {
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "icloud.com",
    "aol.com",
    "live.com",
    "protonmail.com",
    "mail.com",
}

COUNTRY_MAPPING = {
    "in": "India",
    "ind.": "India",
    "india": "India",
    "jp": "Japan",
    "japan": "Japan",
    "sg": "Singapore",
    "singapore": "Singapore",
    "my": "Malaysia",
    "malaysia": "Malaysia",
    "au": "Australia",
    "aus": "Australia",
    "australia": "Australia",
    "id": "Indonesia",
    "indonesia": "Indonesia",
}

# Known company to industry mapping for tech companies in campaign
INDUSTRY_MAPPING = {
    "zentrix": "Cloud & Enterprise SaaS",
    "orbitware": "Aerospace & SatTech",
    "cloudpeak": "Cloud Infrastructure & DevOps",
    "byteharbor": "Cybersecurity & Storage",
    "stackwise": "Developer Tools & Observability",
    "datanest": "Big Data & Business Intelligence",
    "lumen systems": "Enterprise IT & Automation",
    "nexora tech": "AI & Enterprise Software",
    "finlytic": "Financial Technology (FinTech)",
    "quantica": "Algorithmic & DeepTech",
}

EMAIL_REGEX = re.compile(
    r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$"
)


def clean_lead_name(name: str) -> str:
    """Cleans whitespace and normalizes name to Title Case."""
    if not name:
        return "Unknown"
    cleaned = re.sub(r"\s+", " ", name.strip())
    return cleaned.title()


def clean_country(country_raw: str) -> str:
    """Normalizes country variations to standardized country names."""
    if not country_raw:
        return "Unknown"
    norm = country_raw.strip().lower()
    return COUNTRY_MAPPING.get(norm, country_raw.strip().title())


def clean_utm_source(utm_raw: str) -> str:
    """Standardizes UTM source naming conventions."""
    if not utm_raw or not utm_raw.strip():
        return "Direct / None"
    norm = utm_raw.strip().lower()
    mapping = {
        "linkedin": "LinkedIn",
        "google": "Google",
        "direct": "Direct",
        "newsletter": "Newsletter",
    }
    return mapping.get(norm, utm_raw.strip().title())


def infer_industry(company_name: str) -> str:
    """Tags the lead's industry from company name heuristics."""
    if not company_name:
        return "Technology"
    key = company_name.strip().lower()
    for company_key, industry in INDUSTRY_MAPPING.items():
        if company_key in key:
            return industry
    return "B2B Technology"


def parse_timestamp(ts_str: str) -> datetime:
    """Parses timestamp string to datetime object."""
    try:
        return datetime.strptime(ts_str.strip(), "%Y-%m-%d %H:%M")
    except ValueError:
        return datetime.min


def process_leads(input_path: str, output_dir: str):
    print("=" * 68)
    print("  LIONREACH MEDIA - CAMPAIGN LEADS CLEANING AUTOMATION")
    print("=" * 68)
    print(f"[*] Ingesting raw leads from: {input_path}")

    if not os.path.isfile(input_path):
        print(f"[!] Error: File not found: {input_path}")
        sys.exit(1)

    raw_rows = []
    with open(input_path, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for idx, row in enumerate(reader, start=1):
            row["_row_number"] = idx
            raw_rows.append(row)

    total_received = len(raw_rows)
    print(f"[+] Total raw records parsed: {total_received}")

    rejected_records = []
    filtered_for_dedup = []

    # --- STAGE 1: FILTER INVALID EMAILS, PERSONAL DOMAINS & TEST SUBMISSIONS ---
    for r in raw_rows:
        raw_email = (r.get("email") or "").strip()
        raw_name = (r.get("full_name") or "").strip()
        raw_company = (r.get("company") or "").strip()

        # 1. Invalid email syntax check
        if not raw_email or not EMAIL_REGEX.match(raw_email):
            rejected_records.append({
                "row_number": r["_row_number"],
                "submitted_at": r.get("submitted_at", ""),
                "full_name": raw_name,
                "email": raw_email,
                "company": raw_company,
                "reason": "Invalid email format (missing domain or TLD)",
            })
            continue

        email_domain = raw_email.lower().split("@")[-1]

        # 2. Personal email check (Gmail, Yahoo, Outlook, etc.)
        if email_domain in PERSONAL_EMAIL_DOMAINS:
            rejected_records.append({
                "row_number": r["_row_number"],
                "submitted_at": r.get("submitted_at", ""),
                "full_name": raw_name,
                "email": raw_email,
                "company": raw_company,
                "reason": f"Personal email domain rejected (@{email_domain})",
            })
            continue

        # 3. Test submission check
        if (
            "test" in raw_name.lower()
            or raw_email.lower().startswith("test@")
            or raw_company.lower() in ("test", "unknown")
        ):
            rejected_records.append({
                "row_number": r["_row_number"],
                "submitted_at": r.get("submitted_at", ""),
                "full_name": raw_name,
                "email": raw_email,
                "company": raw_company,
                "reason": "Test submission identified",
            })
            continue

        filtered_for_dedup.append(r)

    # --- STAGE 2: DEDUPLICATION (KEEP EARLIEST SUBMISSION TIMESTAMP) ---
    email_groups = defaultdict(list)
    for r in filtered_for_dedup:
        clean_email = r["email"].strip().lower()
        ts = parse_timestamp(r.get("submitted_at", ""))
        email_groups[clean_email].append((ts, r))

    clean_leads = []
    for clean_email, entries in email_groups.items():
        # Sort by timestamp ascending to locate the earliest submission
        entries.sort(key=lambda x: x[0])
        earliest_ts, earliest_row = entries[0]

        # Standardize and enrich the retained earliest lead
        name_clean = clean_lead_name(earliest_row.get("full_name", ""))
        country_clean = clean_country(earliest_row.get("country", ""))
        utm_clean = clean_utm_source(earliest_row.get("utm_source", ""))
        company_clean = earliest_row.get("company", "").strip()
        company_size_clean = (
            earliest_row.get("company_size", "").strip() or "Not Specified"
        )
        industry = infer_industry(company_clean)

        clean_leads.append({
            "submitted_at": earliest_row.get("submitted_at", "").strip(),
            "full_name": name_clean,
            "email": clean_email,
            "company": company_clean,
            "industry": industry,
            "country": country_clean,
            "company_size": company_size_clean,
            "utm_source": utm_clean,
        })

        # If duplicates were present, log all subsequent entries as rejected
        if len(entries) > 1:
            for dup_ts, dup_row in entries[1:]:
                rejected_records.append({
                    "row_number": dup_row["_row_number"],
                    "submitted_at": dup_row.get("submitted_at", ""),
                    "full_name": dup_row.get("full_name", "").strip(),
                    "email": dup_row.get("email", "").strip(),
                    "company": dup_row.get("company", "").strip(),
                    "reason": f"Duplicate email (retained earliest from {earliest_ts.strftime('%Y-%m-%d %H:%M')})",
                })

    # Sort clean leads by submission date descending for CRM consumption
    clean_leads.sort(
        key=lambda x: parse_timestamp(x["submitted_at"]), reverse=True
    )

    # --- EXPORT CLEAN CSV ---
    os.makedirs(output_dir, exist_ok=True)
    clean_csv_path = os.path.join(output_dir, "leads_clean.csv")
    fieldnames = [
        "submitted_at",
        "full_name",
        "email",
        "company",
        "industry",
        "country",
        "company_size",
        "utm_source",
    ]
    with open(clean_csv_path, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(clean_leads)

    # --- EXPORT REJECTION AUDIT CSV ---
    audit_csv_path = os.path.join(output_dir, "leads_rejected_audit.csv")
    audit_fieldnames = [
        "row_number",
        "submitted_at",
        "full_name",
        "email",
        "company",
        "reason",
    ]
    with open(audit_csv_path, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=audit_fieldnames)
        writer.writeheader()
        writer.writerows(rejected_records)

    # --- CALCULATE METRICS & BREAKDOWNS ---
    total_valid = len(clean_leads)
    total_removed = len(rejected_records)
    rejection_reasons = Counter(
        [r["reason"].split("(")[0].strip() for r in rejected_records]
    )

    country_counts = Counter([lead["country"] for lead in clean_leads])
    utm_counts = Counter([lead["utm_source"] for lead in clean_leads])
    industry_counts = Counter([lead["industry"] for lead in clean_leads])

    # --- GENERATE SLACK MESSAGE ---
    slack_msg = f"""*🚀 Weekly Campaign Lead Summary | LionReach Media*
*Date:* {datetime.now().strftime('%A, %d %B %Y')}
*Campaign:* APAC Tech B2B Demand Gen Audit

*📊 High-Level Metrics:*
• *Total Submissions:* `{total_received}`
• *Qualified Leads (Clean):* `{total_valid}` ({(total_valid/total_received)*100:.1f}%)
• *Disqualified / Removed:* `{total_removed}`

*🚫 Removal Breakdown:*
"""
    for reason, count in rejection_reasons.most_common():
        slack_msg += f"• {reason}: `{count}`\n"

    slack_msg += "\n*🌏 Qualified Leads by Country:*\n"
    for ctry, count in country_counts.most_common():
        slack_msg += f"• *{ctry}:* `{count}` leads\n"

    slack_msg += "\n*🎯 Leads by Acquisition Source (UTM):*\n"
    for src, count in utm_counts.most_common():
        slack_msg += f"• *{src}:* `{count}`\n"

    slack_msg += f"\n📁 *Clean Lead File:* `{clean_csv_path}`\n👉 Leads are verified and ready for sales routing."

    slack_path = os.path.join(output_dir, "slack_message.txt")
    with open(slack_path, mode="w", encoding="utf-8") as f:
        f.write(slack_msg)

    # --- GENERATE EMAIL TEMPLATE ---
    email_text = f"""Subject: [Weekly Leads] APAC B2B Demand Gen Campaign Summary - {total_valid} New Qualified Leads

Hi Sales Team,

Here is your cleaned and verified inbound lead summary for this week's APAC B2B Demand Gen campaign.

EXECUTIVE SUMMARY:
-----------------------------------------------------------
Total Inbound Submissions:    {total_received}
Clean Qualified Leads:        {total_valid} ({((total_valid/total_received)*100):.1f}% qualification rate)
Disqualified / Removed:       {total_removed}

DISQUALIFICATION BREAKDOWN:
-----------------------------------------------------------
"""
    for reason, count in rejection_reasons.most_common():
        email_text += f"- {reason:<38}: {count}\n"

    email_text += f"""
LEAD BREAKDOWN BY REGION:
-----------------------------------------------------------
"""
    for ctry, count in country_counts.most_common():
        pct = (count / total_valid) * 100
        email_text += f"- {ctry:<20}: {count} leads ({pct:.1f}%)\n"

    email_text += f"""
LEAD BREAKDOWN BY CHANNEL SOURCE:
-----------------------------------------------------------
"""
    for src, count in utm_counts.most_common():
        pct = (count / total_valid) * 100
        email_text += f"- {src:<20}: {count} leads ({pct:.1f}%)\n"

    email_text += f"""
TOP TARGET INDUSTRIES:
-----------------------------------------------------------
"""
    for ind, count in industry_counts.most_common():
        email_text += f"- {ind:<32}: {count}\n"

    email_text += f"""
ATTACHMENTS:
- leads_clean.csv (Uploaded to CRM queue)
- leads_rejected_audit.csv (Audit trail for verification)

Best regards,
LionReach Marketing Operations Automation
"""
    email_path = os.path.join(output_dir, "email_summary.txt")
    with open(email_path, mode="w", encoding="utf-8") as f:
        f.write(email_text)

    # --- TERMINAL REPORT ---
    print("\n" + "=" * 68)
    print("                    DATA PROCESSING COMPLETE")
    print("=" * 68)
    print(f"  • Total Received:       {total_received}")
    print(f"  • Qualified Clean Leads: {total_valid}  ({(total_valid/total_received)*100:.1f}%)")
    print(f"  • Removed / Filtered:    {total_removed}")
    print("-" * 68)
    print("  REJECTIONS BY REASON:")
    for reason, count in rejection_reasons.most_common():
        print(f"    - {reason:<42}: {count}")
    print("-" * 68)
    print("  CLEAN LEADS BY COUNTRY:")
    for ctry, count in country_counts.most_common():
        print(f"    - {ctry:<20}: {count}")
    print("-" * 68)
    print("  CLEAN LEADS BY UTM SOURCE:")
    for src, count in utm_counts.most_common():
        print(f"    - {src:<20}: {count}")
    print("-" * 68)
    print("  ARTIFACTS GENERATED:")
    print(f"    [1] Clean CSV:      {clean_csv_path}")
    print(f"    [2] Audit Log:      {audit_csv_path}")
    print(f"    [3] Slack Message:  {slack_path}")
    print(f"    [4] Email Summary:  {email_path}")
    print("=" * 68)


if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    input_file = (
        sys.argv[1]
        if len(sys.argv) > 1
        else os.path.join(current_dir, "leads_sample.csv")
    )
    output_directory = sys.argv[2] if len(sys.argv) > 2 else current_dir

    process_leads(input_file, output_directory)
