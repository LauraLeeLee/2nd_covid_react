// import { isCompositeComponent } from "react-dom/test-utils";

let today = new Date();
let date = today.getDate();
let month = today.getMonth()+1;
const year = today.getFullYear();


export const findYesterday = function() {
  let date = new Date();
  date.setDate(date.getDate() -1);
  let yy = date.getFullYear();
  let mm = date.getMonth()+1;
  if(mm < 10) {
    mm = '0' + mm;
  }
  let dd = date.getDate();
  if(dd < 10 ) {
    dd = '0' + dd;
  }
  return (yy +'/'+ mm+'/'+  dd).split("/").join("");
}

export const yesterday = findYesterday();

// console.log(date);

if(date < 10 ) {
  date = '0' + date;
}
if(month < 10 ) {
  month = '0' + month;
}

export const inputDate = `${year}-${month}-${date}`

// formats date for MM/DD/YYYY format when date is in --- format
export const formatDate = (date) => {
  // console.log(date);
  if(date) {
  const d = date.slice(0, 10).split('-');
  return `${d[1]}/${d[2]}/${d[0]}`;
  }
}

// formats date to MM/DD/YYYY when date is in YYYYMMDD format
// used in State component
export const formatDate2 = (date) => {
  if(date !== undefined) {
  const dateStr = date.toString();
  const yr = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const dt = dateStr.slice(6, 8);

  return`${month}/${dt}/${yr}`;
  } else {
    console.log("***date was undefined***");
    return null;
  }
}

export const formatDate3 = (date) => {
  // console.log(date);
  if(date) {
  const d = date.slice(0, 10).split('-');
  return `${d[1]}-${d[2]}-${d[0]}`;
  }
}