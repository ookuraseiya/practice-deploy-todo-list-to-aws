const PRD_API = process.env.NEXT_PUBLIC_PRD_API;
const DEV_API = process.env.NEXT_PUBLIC_DEV_API;
export const API = PRD_API || DEV_API;
