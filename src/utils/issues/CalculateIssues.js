export const totalNumbers = (list = []) => {
    const totalIssues        = list !== null ? list.length : 0;
    const totalActiveIssues   = list !== null ? list.filter((e) => e.status === "solved").length : 0;
    const totalInactiveIssues = list !== null ? list.filter((e) => e.status === "unsolved").length : 0;
    return [
        {mode: 'total', number: totalIssues}, {mode: 'solved', number: totalActiveIssues}, {
            mode: 'unsolved',
            number: totalInactiveIssues
        }
    ];
  }

 export const calculateTotalPages = (list = [], rowsPerPage) => {
    if (list === null) return 0;
    
    return Math.ceil(list.length / rowsPerPage);
    
  };