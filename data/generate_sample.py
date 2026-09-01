import os

def create_sample_contract_pdf(output_path: str):
    """
    Creates a sample Master Services Agreement (MSA) PDF file.
    Includes test clauses for uncapped indemnification, data retention limits, and termination penalties.
    """
    contract_text = """
MASTER SERVICES AGREEMENT (MSA)
Document Reference: MSA-2026-LEG-9942

1. SERVICES AND DELIVERABLES
Vendor shall provide enterprise software development and artificial intelligence compliance audit services to Customer in accordance with mutually agreed Statements of Work (SOWs).

2. FEES AND PAYMENT TERMS
Customer shall pay all invoiced amounts within thirty (30) days of receipt. Late payments shall accrue interest at the rate of 1.5% per month.

5. TERMINATION AND DEFAULT
Either party may terminate this Agreement for convenience. In the event of early termination by Customer, Customer shall pay an immediate early termination penalty equal to 100% of all remaining unpaid contract value without cure period.

8. DATA PRIVACY AND GOVERNANCE
Customer data shall be retained, backed up, and archived by Vendor for a period of ten (10) years following contract termination, regardless of applicable statutory data minimization standards. Customer agrees that data purging requests shall be subject to administrative processing fees.

12. LIMITATION OF LIABILITY AND INDEMNIFICATION
Section 12.1 General Cap: Except as provided in Section 12.2, neither party's total liability shall exceed the total amounts paid in the preceding six months.
Section 12.2 Third-Party Indemnification: Vendor agrees to defend, indemnify, and hold harmless Customer without limitation against any third-party IP claims, regulatory fines, or damages arising out of performance of the Services. This indemnification obligation is uncapped and unlimited in duration and scope.

15. GOVERNING LAW AND JURISDICTION
This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware.
"""

    lines = contract_text.strip().split('\n')
    pdf_text_objs = []
    y = 750
    for line in lines:
        if line.strip():
            safe_line = line.replace('(', '\\(').replace(')', '\\)')
            pdf_text_objs.append(f"BT /F1 10 Tf 50 {y} Td ({safe_line}) Tj ET")
            y -= 15

    content_stream = "\n".join(pdf_text_objs)
    content_len = len(content_stream)

    pdf_body = f"""%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length {content_len} >>
stream
{content_stream}
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
0000000315 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
{315 + content_len + 50}
%%EOF
"""
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(pdf_body)
    print(f"Sample contract PDF created at: {output_path}")

if __name__ == "__main__":
    create_sample_contract_pdf("data/sample_contract.pdf")

