export function LoadDataSource (searchString) {

    //-----LOAD TASKS FOR THE GRID -----//
    //const [dataSource, setDataSource] = useState([]);
    //const [taskAmount, setTaskAmount] = useState(0);

    let dataSource = []
    let taskAmount = 0;

    const SearchString = searchString;
    
    
      const newDataSource = (SearchString) =>{
        
        let string = SearchString
        if(string==='') {
          string = 'EMPTY_SEARCH_STRING'
        }
        return fetch('/returnStock/'+ string).then(response => {

          return response.json().then(data => {
            taskAmount = data.length;
            return { data, count: data.length };
          })
        });
      }
      dataSource = newDataSource(SearchString);
    
    //----------//

    let returnValues = {
      data: dataSource,
      count: taskAmount
    }

    return returnValues;
}