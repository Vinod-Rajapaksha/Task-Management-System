import * as userService from "../services/user.service.js";

export const getUsers = async ( req, res, next ) => {
    try {
      const users =
        await userService.getAllUsers();

      res.status(200).json({
        success: true,
        count: users.length,
        users,
      });
    } catch (error) {
      next(error);
    }
};

export const getUser = async ( req, res, next ) => {
    try {
      const user =
        await userService.getUserById(
          req.params.id
        );

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
};

export const deleteUser = async ( req, res, next ) => {
    try {
      await userService.deleteUser(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
};