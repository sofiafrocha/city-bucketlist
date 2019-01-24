import * as admin from 'firebase-admin';

console.log('FIREBASE_PROJECT_ID', process.env.FIREBASE_PROJECT_ID);

admin.initializeApp({
	credential: admin.credential.cert({
		projectId: process.env.FIREBASE_PROJECT_ID,
		clientEmail: process.env.FIREBASE_EMAIL,
		privateKey: process.env.FIREBASE_PRIVATE_KEY,
	}),
	databaseURL: process.env.DATABASE_URL
});

const result = [];
const db = admin.firestore();
const citiesCollection = db.collection('cities');
// const query = citiesCollection.get();

console.log('citiesCollection', citiesCollection);

// const db = admin.database();
// const ref = db.ref("cities");

exports.handler = async (event, context) => {
	citiesCollection.get()
	.then((results) => {
		console.log('we have results!', results);

		results.forEach((doc) => {
			console.log('id', doc.id, doc.data());
			result.push(doc.data());
		});
	})
	.catch((error) => {
		console.log('Erroryyyy!', error);
	});

	return {
		statusCode: 200,
		body: JSON.stringify(
			{
				msg: "buuuuuuuu!",
				cities: [],
			}
		)
	};
};

// import * as admin from 'firebase-admin';

/*
console.log('here?', process.env);

admin.initializeApp({
	credential: admin.credential.cert({
		projectId: process.env.FIREBASE_PROJECT_ID,
		clientEmail: process.env.FIREBASE_EMAIL,
		privateKey: process.env.FIREBASE_PRIVATE_KEY,
	}),
	databaseURL: process.env.DATABASE_URL
});

const db = admin.database();
const query = db.ref('cities');
const result = [];

console.log('db', db);
console.log('------------------------');
console.log('query', query);

query.once("value", function(snapshot) {
	console.log('~~~~~~~~~~~~~~~~~~~~', snapshot.val());
});
*/
	/*
	query.get()
		.then((results) => {
			results.forEach((doc) => {
				console.log('id', doc.id, doc.data());
				result.push(doc.data());
			});
		})
		.catch((error) => {
			console.log('Erroryyyy!', error);
		});
		*/

// console.log('admin', admin);

// Initialize Firebase
/*

*/


/*
const app = admin.initializeApp();
const db = admin.firestore();
const query = db.collection('cities');
const result = [];

console.log('app', app);

exports.handler = function(event, context, callback) {
	query.get()
		.then((results) => {
			results.forEach((doc) => {
				console.log('id', doc.id, doc.data());
				result.push(doc.data());
			});
		})
		.catch((error) => {
			console.log('Erroryyyy!', error);
		});

	callback(null, {
		statusCode: 200,
		body: "Hello, World"
	});
}
	*/