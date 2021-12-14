//import fs from 'fs';
//import path from 'path';

// INSTALL BEFORE USING
// npm install got@9.6.0
import got from 'got';

//getting path and making const variable appending /data
//const dataDirectory = path.join(process.cwd(), "data");

//this is our REST endpoint
const dataURL =
'https://dev-srjc-cs55-13-fall-2021.pantheonsite.io/wp-json/twentytwentyone-child/v1/week14';

/*
//internal function to retreive JSON object
function getJSONObj(){
  const filepath = path.join( dataDirectory, "persons.json" );
  const filepath2 = path.join( dataDirectory, "aka.json");
  // get json file contents
  const jsonString = fs.readFileSync(filepath, "utf8");
  //read second JSON file and make a string
  const jsonString2 = fs.readFileSync(filepath2, "utf8");
  //parse both into json objects
  const jsonObject1 = JSON.parse(jsonString);
  const jsonObject2 = JSON.parse(jsonString2);
  //concatenate into a single json object and return that
  return jsonObject1.concat(jsonObject2);
}
*/

//function to return all id's for the json objects in the array
export async function getAllIds(){

  //const jsonObj = getJSONObj();

  let jsonString;
  try {
    // this line synchronously gets json data result through https
    jsonString = await got(dataURL);
    //console.log(jsonString.body);
  } catch (error) {
    jsonString.body = []
    console.log(error);
  }

  const jsonObj = JSON.parse(jsonString.body);

  return jsonObj.map(item => {
    return{
      params: {
        id: item.ID.toString()
      }
    }
  });
}


//returns names and id's of all json objects in the array, sorted by name property
export async function getSortedList(){
  
  //const jsonObj = getJSONObj();
  //sort json by name property

  
  let jsonString;
  try {
    // this line synchronously gets json data result through https
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  } catch (error) {
    jsonString.body = []
    console.log(error);
  }

  const jsonObj = JSON.parse(jsonString.body);

  jsonObj.sort(function(a, b){
    return a.post_title.localeCompare(b.post_title);
  });
  //use map() to extract just name and id properties into new obj value array
  return jsonObj.map(item => {
    return{
      id: item.ID.toString(),
      name: item.post_title
    }
  });
} // end getSortedList()

//async function to get data from one person object based on id
export async function getData(idRequested){
  
//  const jsonObj = getJSONObj();

let jsonString;
try {
  // this line synchronously gets json data result through https
  jsonString = await got(dataURL);
  //console.log(jsonString.body);
} catch (error) {
  jsonString.body = []
  console.log(error);
}

const jsonObj = JSON.parse(jsonString.body);

  //find object value in the array with a specific id
  //used by getStaticProps in [id].js
  const objMatch = jsonObj.filter(obj =>{
    return obj.ID.toString() === idRequested;
  });
  //get single object value in filtered array if there is any
  let objReturned;

  if(objMatch.length > 0 ){
    objReturned = objMatch[0];
    }
    else {
      objReturned = {};
    }
  return objReturned;
}


/*
//async function to get data from one person object based on name
export async function getAKA(akaRequested){
  
  const jsonObj = getJSONObj();
  // this was undefined, was not able to pull .aka property
  //find object value in the array with a specific id
  //used by getStaticProps in [id].js
  const objMatch = jsonObj.filter(obj =>{
    return obj.name.toString() === akaRequested;
  });
  //print to check what's going on
  //get single object value in filtered array if there is any
  let objReturned;
  if(objMatch.length > 0 ){
    objReturned = objMatch[0];
    }
    else {
      objReturned = {};
    }
  return objReturned;
}*/