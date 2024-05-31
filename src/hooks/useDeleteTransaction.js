import { useCallback } from "react";
import { db } from "../config/firebase-config";
import { doc, deleteDoc } from "firebase/firestore";

export const useDeleteTransaction = () => {
  const deleteTransaction = useCallback(async (id) => {
    try {
      const transactionRef = doc(db, "transactions", id);
      await deleteDoc(transactionRef);
    } catch (error) {
      console.error("Error deleting transaction: ", error);
    }
  }, []);

  return { deleteTransaction };
};