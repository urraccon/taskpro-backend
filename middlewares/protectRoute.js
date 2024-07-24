import { httpError, ctrlWrapper } from "../helpers/index.js";
import { userModel } from "../models/index.js";
import { checkToken } from "../services/index.js";

const protectRoute = ctrlWrapper(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer ") &&
    req.headers.authorization.split(" ")[1];

  if (!token) throw httpError("401", "Not authorized");

  const id = checkToken(token);

  if (!id) throw httpError("401", "Not authorized");

  const currentUser = await userModel.findOne({ token });

  if (!currentUser) throw httpError("401", "Not authorized");

  req.user = currentUser;

  next();
});

export default protectRoute;
