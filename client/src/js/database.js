import { openDB } from 'idb';


const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


//Method Logic to Accept Content and Add it to the Database
export const putDb = async (content) => {
  console.log('Update the database.');

  //Create a Connection to the Database at Specified Version
  const textDb = await openDB('jate', 1);

  //New Transaction with SPecified Data Privileges
  const tx = textDb.transaction('jate', 'readwrite');

  //Open Object Store
  const store = tx.objectStore('jate');

  //Store and Pass in Content with .put() Method
  const request = store.put({ id: 1, value: content });

  //Returned Value From Request
  const result = await request;

  //Log the Result
  console.log('Content saved to database.', result);

  console.error('putDb not implemented');
}


//Method Logic to Get All Content from the Database
export const getDb = async () => {
  console.log('Get all from database.');
  
  //Create a Connection to the Database at Specified Version
  const textDb = await openDB('jate', 1);

  //New Transaction with SPecified Data Privileges
  const tx = textDb.transaction('jate', 'readonly');

  //Open Object Store
  const store = tx.objectStore('jate');

  //Returned Value from .get() Method
  const request = store.get(1);

  //Confirm the Data is Returned
  const result = await request;

  //Log the Result
  console.log('result.value', result);

  console.error('getDb not implemented');
}


initdb();
