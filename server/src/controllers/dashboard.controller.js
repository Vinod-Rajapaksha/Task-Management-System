import { getDashboardData } from "../services/dashboard.service.js";

export const getDashboard = async ( req, res, next ) => {
    try {
      const dashboard =
        await getDashboardData(
          req.user._id
        );

      res.status(200).json({
        success: true,
        dashboard,
      });
    } catch (error) {
      next(error);
    }
};