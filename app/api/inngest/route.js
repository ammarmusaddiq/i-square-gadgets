import { serve } from "inngest/next";
import { inngest } from "../../../config/inngestClient";
import {
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
} from "../../../inngest/functions/userFunctions";
import { createUserOrder } from "../../../inngest/functions/orderFunctions";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion,
    createUserOrder,
  ],
});
