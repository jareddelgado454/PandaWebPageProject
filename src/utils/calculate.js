export const totalNumbers = (list = []) => {

    const totalUsers        = list !== null ? list.length : 0;
    const totalActiveUser   = list !== null ? list.filter((e) => e.status === "active").length : 0;
    const totalInactiveUser = list !== null ? list.filter((e) => e.status === "inactive").length : 0;

    return [
        {mode: 'total', number: totalUsers}, {mode: 'active', number: totalActiveUser}, {
            mode: 'inactive',
            number: totalInactiveUser
        }
    ];

  }

 export const calculateTotalPages = (list = [], rowsPerPage) => {
    if (list === null) return 0;
    
    return Math.ceil(list.length / rowsPerPage);
    
  };