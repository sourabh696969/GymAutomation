const asyncHandler = require("express-async-handler");
const {
  Notification,
  SubAdminNotification,
} = require("../models/subAdminNotificationModel");
const User = require("../models/userModel");

///// Notification Controllers for Admin /////
const getUnreadNotification = asyncHandler(async (req, res) => {
  const notificationData = await Notification.find({ status: false });

  if (!notificationData) {
    res.status(404);
    throw new Error("data not found!");
  }

  res
    .status(200)
    .json({ totalNotification: notificationData.length, notificationData });
});

const getReadNotification = asyncHandler(async (req, res) => {
  const notificationData = await Notification.find({ status: true });

  if (!notificationData) {
    res.status(404);
    throw new Error("data not found!");
  }

  res
    .status(200)
    .json({ totalNotification: notificationData.length, notificationData });
});

const updateNotificationStatus = asyncHandler(async (req, res) => {
  const notificationId = req.params.id;
  const { status } = req.body;

  if (status === undefined || status === null || status === "") {
    res.status(404);
    throw new Error("All fields required!");
  }
  const updateNotification = await Notification.findByIdAndUpdate(
    notificationId,
    {
      status: status,
    }
  );

  if (!updateNotification) {
    res.status(404);
    throw new Error("data not found!");
  }

  res.status(200).json({ message: "Notification updated successfully!" });
});

const deleteNotificationById = asyncHandler(async (req, res) => {
  const notificationId = req.params.id;

  const deleteNotification = await Notification.findByIdAndDelete(
    notificationId
  );

  if (!deleteNotification) {
    res.status(404);
    throw new Error("Notification not found!");
  }

  res.status(200).json({ message: "Notification deleted successfully!" });
});

const deleteUnreadNotification = asyncHandler(async (req, res) => {
  const deleteNotification = await Notification.deleteMany({ status: true });

  if (!deleteNotification) {
    res.status(404);
    throw new Error("Notification not found!");
  }

  res.status(200).json({ message: "Notification deleted successfully!" });
});

///// Notification Controllers for SubAdmin To User /////
const createNotificationForUser = asyncHandler(async (req, res) => {
  const { title, description, userId } = req.body;

  if ((!title, !description, !userId)) {
    res.status(404);
    throw new Error("All fields required!");
  }

  const notification = await SubAdminNotification.create({
    title,
    description,
    userId,
  });
  res.status(201).json({ message: "Notification Sent successfully!" });
});

const createNotificationForAllUsers = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(404);
    throw new Error("Title and description are required!");
  }

  const userIds = await User.find().distinct("_id");

  const notifications = await Promise.all(
    userIds.map(async (userId) => {
      return await SubAdminNotification.create({
        title,
        description,
        userId,
      });
    })
  );

  res
    .status(201)
    .json({ message: "Notifications Sent successfully!", notifications });
});

const getReadNotificationOfUsers = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const notificationData = await SubAdminNotification.find({
    status: true,
    userId: userId,
  });

  if (!notificationData) {
    res.status(404);
    throw new Error("data not found!");
  }

  res
    .status(200)
    .json({ totalNotification: notificationData.length, notificationData });
});

const getUnreadNotificationOfUsers = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const notificationData = await AdminNotification.find({
    status: false,
    userId: userId,
  });

  if (!notificationData) {
    res.status(404);
    throw new Error("data not found!");
  }

  res
    .status(200)
    .json({ totalNotification: notificationData.length, notificationData });
});

const getNotificationOfUsersSubAdmin = asyncHandler(async (req, res) => {
  const notificationData = await SubAdminNotification.find();

  if (!notificationData) {
    res.status(404);
    throw new Error("data not found!");
  }

  res
    .status(200)
    .json({ totalNotification: notificationData.length, notificationData });
});

const getSingleNotificationOfUser = asyncHandler(async (req, res) => {
  const notificationId = req.params.id;

  const notificationData = await SubAdminNotification.findById(notificationId);

  if (!notificationData) {
    res.status(404);
    throw new Error("data not found!");
  }

  res.status(200).json(notificationData);
});

const updateNotificationStatusOfUser = asyncHandler(async (req, res) => {
  const notificationId = req.params.id;
  const { status } = req.body;

  if (status === undefined || status === null || status === "") {
    res.status(404);
    throw new Error("All fields required!");
  }
  const updateNotification = await SubAdminNotification.findByIdAndUpdate(
    notificationId,
    {
      status: status,
    }
  );

  if (!updateNotification) {
    res.status(404);
    throw new Error("data not found!");
  }

  res.status(200).json({ message: "Notification updated successfully!" });
});

const deleteSingleNotificationOfUser = asyncHandler(async (req, res) => {
  const notificationId = req.params.id;

  const deleteNotification = await SubAdminNotification.findByIdAndDelete(
    notificationId
  );

  if (!deleteNotification) {
    res.status(404);
    throw new Error("data not found!");
  }

  res.status(200).json({ message: "Notification deleted successfully!" });
});

const deleteUnreadNotificationUser = asyncHandler(async (req, res) => {
  const deleteNotification = await SubAdminNotification.deleteMany({
    status: true,
  });

  if (!deleteNotification) {
    res.status(404);
    throw new Error("Notification not found!");
  }

  res.status(200).json({ message: "Notification deleted successfully!" });
});

module.exports = {
  createNotificationForUser,
  createNotificationForAllUsers,
  getReadNotificationOfUsers,
  getUnreadNotificationOfUsers,
  getSingleNotificationOfUser,
  getNotificationOfUsersSubAdmin,
  updateNotificationStatusOfUser,
  deleteSingleNotificationOfUser,
  deleteUnreadNotificationUser,
  getUnreadNotification,
  getReadNotification,
  updateNotificationStatus,
  deleteNotificationById,
  deleteUnreadNotification,
};
