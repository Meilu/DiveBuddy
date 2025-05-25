import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// Define the shape of each dive site
interface DiveSite {
  name: string;
  lat: number;
  lng: number;
  averageMaxDepth?: number;
  averageDivetime?: number;
  averageVis?: number;
  level?: string;
  wildlife?: string[];
  country_iso3: string;
}

// Initialize Firebase Admin with your service account
const serviceAccountPath = path.resolve('serviceAccountKey.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));
console.log(`Using service account from: ${serviceAccountPath}`);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function uploadDiveSites() {
  const dataPath = path.resolve('json/divesites.json');
  const diveSites: DiveSite[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  const batch = db.batch();
  const collectionRef = db.collection('divesites');

  diveSites.forEach((site) => {
    const docRef = collectionRef.doc();
    batch.set(docRef, site);
  });

  await batch.commit();
  console.log(`✅ Uploaded ${diveSites.length} dive sites to Firestore.`);
}

uploadDiveSites().catch(console.error);
