import React from 'react';
import { auth, database } from './Firebase.js';

const capitalize = (s) => {
  const words = s.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return (words.join(" "));
};
async function getUsers(term) {
  var users = [];
  const uid = auth.currentUser.uid;
  term = capitalize(term);
  // console.log(term);
  const ref = database.ref('users').orderByChild("name").startAt(term);
  await ref.once('value', (snapshot) => {
    snapshot.forEach((a) => {
      // console.log(a.val());
      let v = a.val();
      if (v.name.includes(term)) {
        console.log(v);
        users.push(v);
      }
    });
  });
  return users;
}
export default getUsers;
