export const formsFields = {
  "Form 1 – Crime Data": [
    { name: "crimeHead", label: "Crime Head", required: true },
    { name: "firNo", label: "FIR No", required: true },
    { name: "factsOfCase", label: "Facts of the Case", type: "textarea" },
    { name: "accusedStatus", label: "Accused Status" },
    { name: "actionTaken", label: "Action Taken", type: "textarea" },
    { name: "legalProgress", label: "Legal Progress" },
  ],

  "Form 2 – Non-Bailable Warrants": [
    { name: "pending", label: "Pending" },
    { name: "executedToday", label: "Executed Today" },
    { name: "oneWeekTotal", label: "1-Week Total" },
    { name: "oneMonthTotal", label: "1-Month Total" },
    { name: "remarks", label: "Remarks", type: "textarea" },
  ],

  "Form 3 – PD Act Proposals": [
    { name: "caseNo", label: "Case No." },
    { name: "accusedProfile", label: "Accused Profile", type: "textarea" },
    { name: "crimeType", label: "Crime Type" },
    { name: "grounds", label: "Grounds" },
    { name: "currentStatus", label: "Current Status" },
    { name: "remarks", label: "Remarks", type: "textarea" },
  ],

  "Form 4 – Externment Actions": [
    { name: "accusedGang", label: "Accused/Gang" },
    { name: "activityProfile", label: "Activity Profile", type: "textarea" },
    { name: "legalGrounds", label: "Legal Grounds" },
    { name: "jurisdictionPS", label: "Jurisdiction PS" },
    { name: "status", label: "Status" },
    { name: "date", label: "Date", type: "date" },
    { name: "remarks", label: "Remarks", type: "textarea" },
  ],

  "Form 5 – Sensitive / Political Cases": [
    { name: "firNo", label: "FIR No." },
    { name: "caseCategory", label: "Case Category" },
    { name: "crimeHead", label: "Crime Head" },
    { name: "summary", label: "Summary", type: "textarea" },
    { name: "todaysProgress", label: "Today’s Progress" },
    { name: "pendingAction", label: "Pending Action", type: "textarea" },
    { name: "riskFlag", label: "Risk Flag" },
    { name: "leadOfficer", label: "Lead Officer" },
  ],

  "Form 6 – VC Productions": [
    { name: "noProduced", label: "No. Produced" },
    { name: "mode", label: "Mode" },
    { name: "courtsCovered", label: "Courts Covered" },
    { name: "issuesFaced", label: "Issues Faced" },
    { name: "mitigationSteps", label: "Mitigation Steps", type: "textarea" },
  ],

  "Form 7 – Important Cases": [
    { name: "firNo", label: "FIR No." },
    { name: "dateAdded", label: "Date Added", type: "date" },
    { name: "todaysProgress", label: "Today’s Progress" },
    { name: "pendingAction", label: "Pending Action", type: "textarea" },
    { name: "responsibleOfficer", label: "Responsible Officer" },
    { name: "nextReviewDate", label: "Next Review Date", type: "date" },
  ],

  "Form 8 – CCTV Surveillance": [
    { name: "installedToday", label: "Installed Today" },
    { name: "totalThisMonth", label: "Total This Month" },
    { name: "commandCentreIntegrated", label: "Command Centre Integrated" },
    { name: "capabilities", label: "Capabilities" },
    { name: "maintenanceIssues", label: "Maintenance Issues" },
  ],

  "Form 9 – Cyber Crime Monitoring": [
    { name: "complaintsToday", label: "Complaints Today" },
    { name: "firsRegistered", label: "FIRs Registered" },
    { name: "crimeType", label: "Crime Type" },
    { name: "financialImpact", label: "Financial Impact" },
    { name: "progress", label: "Progress" },
    { name: "agencySupportRequired", label: "Agency Support Required" },
  ],

  "Form 10 – Women’s Safety": [
    { name: "complaintType", label: "Complaint Type" },
    { name: "noReceived", label: "No. Received" },
    { name: "avgResponseTime", label: "Avg Response Time" },
    { name: "firs", label: "FIRs" },
    { name: "shaktiTeamAction", label: "Shakti Team Action", type: "textarea" },
    { name: "communityFeedback", label: "Community Feedback" },
  ],

  "Form 11 – Focus Area": [
    { name: "date", label: "Date", type: "date" },
    { name: "theme", label: "Theme / Problem Area" },
    { name: "expectedResponse", label: "Expected Officer Response" },
    { name: "actualCompliance", label: "Actual Compliance" },
    { name: "gapsIdentified", label: "Gaps Identified" },
  ],

  "Form 12 – Legal Monitoring": [
    { name: "caseName", label: "Case Name" },
    { name: "courtBench", label: "Court / Bench" },
    { name: "nextHearingDate", label: "Next Hearing Date", type: "date" },
    { name: "reliefSought", label: "Relief Sought" },
    { name: "policeActionRequired", label: "Police Action Required", type: "textarea" },
  ],

  "Form 13 – DSR Summary": [
    { name: "component", label: "Component" },
    { name: "highlights", label: "Highlights" },
  ],

  "Form 14 – Fertilizer Monitoring": [
    { name: "shortageCrisis", label: "Shortage / Crisis" },
    { name: "demandVsSupply", label: "Demand vs Supply" },
    { name: "casesRegistered", label: "Cases Registered" },
    { name: "diversionMisuse", label: "Diversion / Misuse" },
    { name: "statusOfPreviousCases", label: "Status of Previous Cases" },
    { name: "checkPosts", label: "Check-posts" },
    { name: "otherInfo", label: "Other Info" },
  ],
};
