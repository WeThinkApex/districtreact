// src/config/formsFields.js
export const formsFields = {
  crimeData: [
    { name: "crimeHead", label: "Crime Head", required: true },
    { name: "firNo", label: "FIR No", required: true },
    { name: "factsOfCase", label: "Facts of the Case", type: "textarea" },
    { name: "accusedStatus", label: "Accused Status" },
    { name: "actionTaken", label: "Action Taken", type: "textarea" },
    { name: "legalProgress", label: "Legal Progress" },
  ],

  nonbailableWarrants: [
    { name: "pending", label: "Pending" },
    { name: "executedToday", label: "Executed Today" },
    { name: "oneWeekTotal", label: "1-Week Total" },
    { name: "oneMonthTotal", label: "1-Month Total" },
    { name: "remarks", label: "Remarks", type: "textarea" },
  ],

  actProposals: [
    { name: "caseNo", label: "Case No." },
    { name: "accusedProfile", label: "Accused Profile", type: "textarea" },
    { name: "crimeType", label: "Crime Type" },
    { name: "grounds", label: "Grounds" },
    { name: "currentStatus", label: "Current Status" },
    { name: "remarks", label: "Remarks", type: "textarea" },
  ],

  externmentActions: [
    { name: "accusedGang", label: "Accused / Gang" },
    { name: "activityProfile", label: "Activity Profile", type: "textarea" },
    { name: "legalGrounds", label: "Legal Grounds" },
    { name: "jurisdictionPS", label: "Jurisdiction PS" },
    { name: "status", label: "Status" },
    { name: "date", label: "Date", type: "date" },
    { name: "remarks", label: "Remarks", type: "textarea" },
  ],

  sensitivePoliticalCases: [
    { name: "firNo", label: "FIR No." },
    { name: "caseCategory", label: "Case Category" },
    { name: "crimeHead", label: "Crime Head" },
    { name: "summary", label: "Summary", type: "textarea" },
    { name: "todaysProgress", label: "Today’s Progress" },
    { name: "pendingAction", label: "Pending Action", type: "textarea" },
    { name: "riskFlag", label: "Risk Flag" },
    { name: "leadOfficer", label: "Lead Officer" },
  ],

  vcProductions: [
    { name: "noProduced", label: "No. Produced" },
    { name: "mode", label: "Mode" },
    { name: "courtsCovered", label: "Courts Covered" },
    { name: "issuesFaced", label: "Issues Faced" },
    { name: "mitigationSteps", label: "Mitigation Steps", type: "textarea" },
  ],

  importantCases: [
    { name: "firNo", label: "FIR No." },
    { name: "dateAdded", label: "Date Added", type: "date" },
    { name: "todaysProgress", label: "Today’s Progress" },
    { name: "pendingAction", label: "Pending Action", type: "textarea" },
    { name: "responsibleOfficer", label: "Responsible Officer" },
    { name: "nextReviewDate", label: "Next Review Date", type: "date" },
  ],

  cctvSurveillance: [
    { name: "installedToday", label: "Installed Today" },
    { name: "totalThisMonth", label: "Total This Month" },
    { name: "commandCentreIntegrated", label: "Command Centre Integrated" },
    { name: "capabilities", label: "Capabilities" },
    { name: "maintenanceIssues", label: "Maintenance Issues" },
  ],

  cyberCrimeMonitoring: [
    { name: "complaintsToday", label: "Complaints Today" },
    { name: "firsRegistered", label: "FIRs Registered" },
    { name: "crimeType", label: "Crime Type" },
    { name: "financialImpact", label: "Financial Impact" },
    { name: "progress", label: "Progress" },
    { name: "agencySupportRequired", label: "Agency Support Required" },
  ],

  womensSafety: [
    { name: "complaintType", label: "Complaint Type" },
    { name: "noReceived", label: "No. Received" },
    { name: "avgResponseTime", label: "Avg Response Time" },
    { name: "firs", label: "FIRs" },
    { name: "shaktiTeamAction", label: "Shakti Team Action", type: "textarea" },
    { name: "communityFeedback", label: "Community Feedback" },
  ],

  focusArea: [
    { name: "date", label: "Date", type: "date" },
    { name: "theme", label: "Theme / Problem Area" },
    { name: "expectedResponse", label: "Expected Officer Response" },
    { name: "actualCompliance", label: "Actual Compliance" },
    { name: "gapsIdentified", label: "Gaps Identified" },
  ],

  legalMonitoring: [
    { name: "caseName", label: "Case Name" },
    { name: "courtBench", label: "Court / Bench" },
    { name: "nextHearingDate", label: "Next Hearing Date", type: "date" },
    { name: "reliefSought", label: "Relief Sought" },
    { name: "policeActionRequired", label: "Police Action Required", type: "textarea" },
  ],

  dsrSummary: [
    { name: "component", label: "Component" },
    { name: "highlights", label: "Highlights" },
  ],

  fertilizerMonitoring: [
    { name: "shortageCrisis", label: "Shortage / Crisis" },
    { name: "demandVsSupply", label: "Demand vs Supply" },
    { name: "casesRegistered", label: "Cases Registered" },
    { name: "diversionMisuse", label: "Diversion / Misuse" },
    { name: "statusOfPreviousCases", label: "Status of Previous Cases" },
    { name: "checkPosts", label: "Check-posts" },
    { name: "otherInfo", label: "Other Info" },
  ],
};
