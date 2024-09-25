import { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
  origin: [process.env.APPURL as string],
  credentials: true,
};

export default corsOptions;
