console.log('firebase? hello?');

exports.handler = async (event, context) => {
	const body = JSON.stringify({ msg: "buuuuuuuu!" });
	console.log('body', body);

	return {
		statusCode: 200,
		body,
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