export const totalNumbers = (list = []) => {
    if (!Array.isArray(list)) {
      return [
          { mode: 'total', number: 0 },
          { mode: 'solved', number: 0 },
          { mode: 'pending', number: 0 },
          { mode: 'processed', number: 0 }
      ];
  }

    const totalIssues        = list !== null ? list.length : 0;
    const totalActiveIssues   = list !== null ? list.filter((e) => e.status === "solved").length : 0;
    const totalPendingIssues = list !== null ? list.filter((e) => e.status === "pending").length : 0;
    const totalProcessedIssues = list !== null ? list.filter((e) => e.status === "processed").length : 0;
    return [
        {mode: 'total', number: totalIssues},
        {mode: 'solved', number: totalActiveIssues},
        {mode: 'pending', number: totalPendingIssues},
        {mode: 'processed', number: totalProcessedIssues}
    ];
  }

 export const calculateTotalPages = (list = [], rowsPerPage) => {
    if (list === null) return 0;
    
    return Math.ceil(list.length / rowsPerPage);
    
  };