import { Router } from "express";
import { db } from "../firebase";
import { IDiveSite } from "@shared/dist";
import { firestoreDocToDiveSite } from "../converters/diveSite.converter";

import NodeCache from "node-cache";

const router = Router();
const cache = new NodeCache({ stdTTL: 3600 });

const DIVE_SITES_CACHE_KEY = "divesites";

router.get("/", async (req, res) => {
  try {
    const cachedSites = cache.get<IDiveSite[]>(DIVE_SITES_CACHE_KEY);

    if (cachedSites) {
      res.json(cachedSites);
      return;
    }

    const snapshot = await db.collection(DIVE_SITES_CACHE_KEY).get();
    const sites: IDiveSite[] = snapshot.docs.map((doc) => firestoreDocToDiveSite(doc));

    cache.set(DIVE_SITES_CACHE_KEY, sites);
    res.json(sites);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
