import * as profileService from "../services/profile.service.js";

export const getProfile = async ( req, res, next ) => {
    try {
      const user =
        await profileService.getProfile(
          req.user._id
        );

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
};

export const updateProfile = async ( req, res, next ) => {
    try {
      const user =
        await profileService.updateProfile(
          req.user._id,
          req.validatedData.body
        );

      res.status(200).json({
        success: true,
        message:
          "Profile updated successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
};

export const changePassword = async ( req, res, next ) => {
    try {
      const {
        oldPassword,
        newPassword,
      } = req.validatedData.body;

      await profileService.changePassword(
        req.user._id,
        oldPassword,
        newPassword
      );

      res.status(200).json({
        success: true,
        message:
          "Password changed successfully",
      });
    } catch (error) {
      next(error);
    }
};