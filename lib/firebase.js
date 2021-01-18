// This is where we'll add all of the functions for interacting with
// Firebase services in our app.

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const initFirebase = async () => {
  // This check prevents us from initializing more than one app.
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  }
};

// Gets all posts from the database in reverse chronological order.
export const getPosts = async () => {
  // Because our exported functions can be called at any time from
  // any place in our app, we need to make sure we've initialized
  // a Firebase app every time these functions are invoked.
  initFirebase();

  const posts = await firebase
    .database()
    .ref('/posts')
    .orderByChild('dateCreated')
    .once('value')
    .then((snapshot) => {
      const snapshotVal = snapshot.val();

      const result = [];
      for (var slug in snapshotVal) {
        const post = snapshotVal[slug];
        result.push(post);
      }

      return result.reverse();
    });

  return posts;
};

/*
Creates a new post under /posts in the Realtime Database. Automatically
generates the `dateCreated` property from the current UTC time in milliseconds.
*/
export const createPost = async (post) => {
  initFirebase();

  const dateCreated = new Date().getTime();
  post.dateCreated = dateCreated;

  return firebase.database().ref(`/posts/${post.slug}`).set(post);
};

/*
Retrieves the data for a single post from a given slug.
*/
export const getPostBySlug = async (slug) => {
  initFirebase();

  return await firebase
    .database()
    .ref(`/posts/${slug}`)
    .once('value')
    .then((snapshot) => snapshot.val());
};

/*
Observes changes in authentication. Receives a callback function that is invoked
when auth state changes. See the Firebase Reference Docs for all of the details:
https://firebase.google.com/docs/reference/js/firebase.auth.Auth#onauthstatechanged
*/
export const onAuthStateChanged = async (callback) => {
  initFirebase();

  return firebase.auth().onAuthStateChanged((user) => callback(user));
};

/*
Attempts to authenticate a user with a given email and password.
*/
export const signIn = async (email, password) => {
  initFirebase();

  return firebase.auth().signInWithEmailAndPassword(email, password);
};

/*
Signs out the authenticated user.
*/
export const signOut = async () => {
  initFirebase();

  return firebase.auth().signOut();
};

/*
Updates the data for the given post in the database.
*/
export const updatePost = async (post) => {
  initFirebase();

  return firebase.database().ref(`/posts/${post.slug}`).set(post);
};

/*
Deletes a post from the database.
*/
export const deletePost = async (slug) => {
  initFirebase();

  return firebase.database().ref(`/posts/${slug}`).set(null);
};
