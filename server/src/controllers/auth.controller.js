import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async ( req, res, next ) => {
    try {
      const {
        name,
        email,
        password,
      } = req.validatedData.body;

      const user =
        await registerUser(
          name,
          email,
          password
        );

      res.status(201).json({
        success: true,
        message:
          "User Registered Successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  };

export const login = async ( req, res, next ) => {
    try {
      const { email, password } =
        req.validatedData.body;

      const result =
        await loginUser(
          email,
          password
        );

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  };

export const logout = async ( req, res ) => {
    res.status(200).json({
      success: true,
      message:
        "Logout Successful",
    });
  };