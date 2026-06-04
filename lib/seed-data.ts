export const business = {
  name: "Vraj Online Center",
  legalType: "Digital Service Center & Government Service Center",
  location: "Tarsadi, Kosamba, Gujarat, India",
  phone: "7874467775",
  whatsapp: "917874467775",
  email: "admin@vrajonlinecenter.in",
  baseUrl: process.env.APP_BASE_URL || "https://www.vrajonlinecenter.in",
  localAreas: ["Tarsadi", "Kosamba", "Surat District", "Gujarat"]
};

export const servicesSeed = [
  {
    slug: "aadhaar-services",
    name: "Aadhaar Services",
    category: "Identity",
    charges: 50,
    processingTime: "Same day to 7 working days",
    description: "Assistance for Aadhaar update guidance, document preparation, mobile linking guidance, and appointment support.",
    documents: ["Aadhaar Card", "Proof of Address", "Proof of Identity", "Mobile Number"]
  },
  {
    slug: "pan-card",
    name: "PAN Card",
    category: "Identity",
    charges: 150,
    processingTime: "7 to 15 working days",
    description: "New PAN, correction, reprint, and e-PAN support with document verification and status tracking.",
    documents: ["Aadhaar Card", "Photo", "Signature", "Mobile Number", "Email"]
  },
  {
    slug: "voter-id",
    name: "Voter ID",
    category: "Identity",
    charges: 80,
    processingTime: "15 to 30 working days",
    description: "Voter registration, correction, address change, and status follow-up assistance.",
    documents: ["Aadhaar Card", "Address Proof", "Age Proof", "Photo"]
  },
  {
    slug: "ayushman-card",
    name: "Ayushman Card",
    category: "Health",
    charges: 60,
    processingTime: "Same day when eligible",
    description: "Eligibility check, Ayushman card download, PVC print queue, and family member guidance.",
    documents: ["Aadhaar Card", "Ration Card", "Mobile Number", "Family ID if available"]
  },
  {
    slug: "esic",
    name: "ESIC",
    category: "Health",
    charges: 100,
    processingTime: "1 to 3 working days",
    description: "ESIC card, employee details support, form filling, and document upload assistance.",
    documents: ["Aadhaar Card", "ESIC Number", "Mobile Number", "Employer Details"]
  },
  {
    slug: "ration-card",
    name: "Ration Card",
    category: "Government",
    charges: 120,
    processingTime: "15 to 45 working days",
    description: "New ration card, family member addition, correction, and document submission assistance.",
    documents: ["Aadhaar Cards", "Address Proof", "Income Proof", "Family Details"]
  },
  {
    slug: "income-certificate",
    name: "Income Certificate",
    category: "Certificate",
    charges: 120,
    processingTime: "7 to 21 working days",
    description: "Online application support for income certificate with document checklist and timeline tracking.",
    documents: ["Aadhaar Card", "Ration Card", "Income Proof", "Photo", "Mobile Number"]
  },
  {
    slug: "caste-certificate",
    name: "Caste Certificate",
    category: "Certificate",
    charges: 150,
    processingTime: "15 to 30 working days",
    description: "Caste certificate application support with form filling and status follow-up.",
    documents: ["Aadhaar Card", "School Leaving Certificate", "Ration Card", "Caste Proof"]
  },
  {
    slug: "ews",
    name: "EWS",
    category: "Certificate",
    charges: 150,
    processingTime: "15 to 30 working days",
    description: "EWS certificate application guidance and documentation support for eligible applicants.",
    documents: ["Aadhaar Card", "Income Proof", "Property Details", "Ration Card", "Photo"]
  },
  {
    slug: "scholarships",
    name: "Scholarships",
    category: "Education",
    charges: 100,
    processingTime: "As per scheme deadline",
    description: "Scholarship form filling, document upload, bank detail verification, and deadline follow-up.",
    documents: ["Aadhaar Card", "Marksheet", "Bank Passbook", "Income Certificate", "Caste Certificate if applicable"]
  },
  {
    slug: "pm-kisan",
    name: "PM Kisan",
    category: "Government",
    charges: 80,
    processingTime: "7 to 30 working days",
    description: "PM Kisan registration, eKYC guidance, status check, and correction support.",
    documents: ["Aadhaar Card", "Land Records", "Bank Passbook", "Mobile Number"]
  },
  {
    slug: "passport-assistance",
    name: "Passport Assistance",
    category: "Travel",
    charges: 300,
    processingTime: "Appointment based",
    description: "Passport form filling, appointment booking support, and document checklist preparation.",
    documents: ["Aadhaar Card", "Address Proof", "Birth Proof", "Photo", "Mobile Number"]
  },
  {
    slug: "railway-forms",
    name: "Railway Forms",
    category: "Forms",
    charges: 70,
    processingTime: "Same day",
    description: "Railway recruitment and service form assistance with print and scan support.",
    documents: ["Aadhaar Card", "Qualification Documents", "Photo", "Signature"]
  },
  {
    slug: "government-job-forms",
    name: "Government Job Forms",
    category: "Jobs",
    charges: 120,
    processingTime: "Same day",
    description: "Government job form filling, document resize, fee payment support, and application print.",
    documents: ["Aadhaar Card", "Photo", "Signature", "Qualification Certificates", "Category Certificate if applicable"]
  },
  {
    slug: "iti-admission",
    name: "ITI Admission",
    category: "Admissions",
    charges: 150,
    processingTime: "As per admission schedule",
    description: "ITI admission form, choice filling, document upload, and merit follow-up support.",
    documents: ["Aadhaar Card", "10th Marksheet", "School Leaving Certificate", "Caste Certificate if applicable"]
  },
  {
    slug: "college-admission",
    name: "College Admission",
    category: "Admissions",
    charges: 200,
    processingTime: "As per admission schedule",
    description: "College admission registration, document upload, choice filling, and merit list tracking.",
    documents: ["Aadhaar Card", "Marksheets", "School Leaving Certificate", "Photo", "Caste Certificate if applicable"]
  },
  {
    slug: "pvc-card-printing",
    name: "PVC Card Printing",
    category: "Printing",
    charges: 80,
    processingTime: "Same day",
    description: "High-quality PVC printing for eligible cards with queue, print, and delivery tracking.",
    documents: ["Digital Card PDF or ID", "Mobile Number"]
  },
  {
    slug: "xerox",
    name: "Xerox",
    category: "Office",
    charges: 2,
    processingTime: "Instant",
    description: "Black-and-white and color photocopy support for documents and forms.",
    documents: ["Original Document"]
  },
  {
    slug: "printing",
    name: "Printing",
    category: "Office",
    charges: 5,
    processingTime: "Instant",
    description: "Document, form, admit card, result, photo, and certificate printing.",
    documents: ["Printable File or Link"]
  },
  {
    slug: "scanning",
    name: "Scanning",
    category: "Office",
    charges: 10,
    processingTime: "Instant",
    description: "Document scanning, PDF creation, compression, and upload-ready formatting.",
    documents: ["Original Document"]
  }
] as const;

export const schemes = [
  "Ayushman Bharat health card guidance",
  "PM Kisan registration and eKYC",
  "Digital Gujarat certificate services",
  "Scholarship application support",
  "Ration card correction and addition",
  "EWS and caste certificate assistance"
];

export const jobUpdates = [
  "Government job forms with document resize and fee receipt support",
  "Railway recruitment form filling",
  "Police, clerk, talati, and technical recruitment application assistance",
  "Admit card download, result print, and document verification support"
];

export const admissionServices = [
  "ITI admission registration and choice filling",
  "College admission form support",
  "Scholarship-linked admission document preparation",
  "Deadline reminders and merit list follow-up"
];

export const blogSeed = [
  {
    slug: "pan-card-service-kosamba",
    title: "PAN Card Service in Kosamba: Documents, Fees, and Timeline",
    excerpt: "A practical guide for PAN card application, correction, and reprint support near Tarsadi and Kosamba.",
    content:
      "Vraj Online Center helps customers in Tarsadi, Kosamba, and nearby areas apply for new PAN cards, corrections, and reprints. Carry Aadhaar card, mobile number, email, photo, and signature. Our team verifies documents, submits the application, tracks status, and helps customers keep the acknowledgement safely.",
    category: "PAN Card",
    tags: ["PAN Card", "Kosamba", "Tarsadi", "Government Form"],
    featuredImage: "/images/office-work.svg",
    metaTitle: "PAN Card Service Kosamba | Vraj Online Center",
    metaDescription: "Apply for PAN card, correction, and reprint support at Vraj Online Center in Tarsadi, Kosamba."
  },
  {
    slug: "aadhaar-update-kosamba",
    title: "Aadhaar Update Help Near Kosamba",
    excerpt: "What to carry before visiting for Aadhaar update guidance and appointment support.",
    content:
      "For Aadhaar update guidance, customers should bring Aadhaar card, valid proof of identity, address proof, and linked mobile number if available. Vraj Online Center helps explain the process, prepare documents, and guide customers toward the correct update channel.",
    category: "Aadhaar",
    tags: ["Aadhaar", "Kosamba", "Tarsadi"],
    featuredImage: "/images/office-work.svg",
    metaTitle: "Aadhaar Update Kosamba | Vraj Online Center",
    metaDescription: "Get Aadhaar update document guidance and appointment support near Kosamba and Tarsadi."
  }
] as const;
