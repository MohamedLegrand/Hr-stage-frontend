import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/auth/authSlice";
import stagiaireReducer from "../modules/stagiaire/stagiaireSlice";
import documentsReducer from "../modules/documents/documentsSlice";
import paiementReducer from "../modules/paiement/paiementSlice";
import preinscriptionReducer from "../modules/preinscription/preinscriptionSlice";
import adminReducer from "../modules/admin/adminSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stagiaire: stagiaireReducer,
    documents: documentsReducer,
    paiement: paiementReducer,
    preinscription: preinscriptionReducer,
    admin: adminReducer,
  }
});

export default store;