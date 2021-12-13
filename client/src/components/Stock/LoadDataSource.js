export function LoadDataSource (user, priority, showingClosed, filterCustCode, department) {

    //-----LOAD TASKS FOR THE GRID -----//
    //const [dataSource, setDataSource] = useState([]);
    //const [taskAmount, setTaskAmount] = useState(0);

    let dataSource = []
    let taskAmount = 0;

    const filterUser = user;
    const filterPriority = priority;
    const isShowClosed = showingClosed;
    const filterCustomer = filterCustCode;
    const departmentCode = department;
    
      const newDataSource = (filterUser, filterPriority, isShowClosed, filterCustomer, departmentCode) =>{
        return fetch('/returnStock').then(response => {

          return response.json().then(data => {
            taskAmount = data.length;
            return { data, count: data.length };
          })
        });
      }
      dataSource = newDataSource(filterUser, filterPriority, isShowClosed, filterCustomer, departmentCode);
    
    //----------//

    let returnValues = {
      data: dataSource,
      count: taskAmount
    }

    return returnValues;
}