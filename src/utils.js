// utils.js
export function assignProofType(stepText) {
    const text = stepText.toLowerCase();
  
    if (text.includes("quiz") || text.includes("interview") || text.includes("questions")) {
      return "quiz";
    } else if (
      text.includes("upload") ||
      text.includes("certificate") ||
      text.includes("file") ||
      text.includes("project") ||
      text.includes("visualization") ||
      text.includes("analyze")
    ) {
      return "upload";
    } else if (
      text.includes("write") ||
      text.includes("reflect") ||
      text.includes("diary") ||
      text.includes("update") ||
      text.includes("journal")
    ) {
      return "text";
    }
  
    return "none";
  }
  