const asyncHandler = require("express-async-handler");
const {
  Notification,
  AdminNotification,
} = require("../models/adminNotificationModel");
const Gym = require("../models/gymModel");

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

///// Notification Controllers for Admin To Gym /////
const createNotificationForGym = asyncHandler(async (req, res) => {
  const { title, description, gymId } = req.body;

  if ((!title, !description, !gymId)) {
    res.status(404);
    throw new Error("All fields required!");
  }

  const notification = await AdminNotification.create({
    title,
    description,
    gymId,
  });
  res.status(201).json({ message: "Notification Sent successfully!" });
});

const createNotificationForAllGyms = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(404);
    throw new Error("Title and description are required!");
  }

  const gymIds = await Gym.find().distinct("_id");

  const notifications = await Promise.all(
    gymIds.map(async (gymId) => {
      return await AdminNotification.create({
        title,
        description,
        gymId,
      });
    })
  );

  res
    .status(201)
    .json({ message: "Notifications Sent successfully!", notifications });
});

const getReadNotificationOfGyms = asyncHandler(async (req, res) => {
  const gymId = req.params.id;

  const notificationData = await AdminNotification.find({
    status: true,
    gymId: gymId,
  });

  if (!notificationData) {
    res.status(404);
    throw new Error("data not found!");
  }

  res
    .status(200)
    .json({ totalNotification: notificationData.length, notificationData });
});

const getUnreadNotificationOfGyms = asyncHandler(async (req, res) => {
  const gymId = req.params.id;

  const notificationData = await AdminNotification.find({
    status: false,
    gymId: gymId,
  });

  if (!notificationData) {
    res.status(404);
    throw new Error("data not found!");
  }

  res
    .status(200)
    .json({ totalNotification: notificationData.length, notificationData });
});

const getNotificationOfGymsAdmin = asyncHandler(async (req, res) => {
  const notificationData = await AdminNotification.find();

  if (!notificationData) {
    res.status(404);
    throw new Error("data not found!");
  }

  res
    .status(200)
    .json({ totalNotification: notificationData.length, notificationData });
});

const getSingleNotificationOfGym = asyncHandler(async (req, res) => {
  const notificationId = req.params.id;

  const notificationData = await AdminNotification.findById(notificationId);

  if (!notificationData) {
    res.status(404);
    throw new Error("data not found!");
  }

  res.status(200).json(notificationData);
});

const updateNotificationStatusOfGym = asyncHandler(async (req, res) => {
  const notificationId = req.params.id;
  const { status } = req.body;

  if (status === undefined || status === null || status === "") {
    res.status(404);
    throw new Error("All fields required!");
  }
  const updateNotification = await AdminNotification.findByIdAndUpdate(
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

const deleteSingleNotificationOfGym = asyncHandler(async (req, res) => {
  const notificationId = req.params.id;

  const deleteNotification = await AdminNotification.findByIdAndDelete(
    notificationId
  );

  if (!deleteNotification) {
    res.status(404);
    throw new Error("data not found!");
  }

  res.status(200).json({ message: "Notification deleted successfully!" });
});

const deleteUnreadNotificationGym = asyncHandler(async (req, res) => {
  const deleteNotification = await AdminNotification.deleteMany({
    status: true,
  });

  if (!deleteNotification) {
    res.status(404);
    throw new Error("Notification not found!");
  }

  res.status(200).json({ message: "Notification deleted successfully!" });
});

module.exports = {
  createNotificationForGym,
  createNotificationForAllGyms,
  getReadNotificationOfGyms,
  getUnreadNotificationOfGyms,
  getSingleNotificationOfGym,
  getNotificationOfGymsAdmin,
  updateNotificationStatusOfGym,
  deleteSingleNotificationOfGym,
  deleteUnreadNotificationGym,
  getUnreadNotification,
  getReadNotification,
  updateNotificationStatus,
  deleteNotificationById,
  deleteUnreadNotification,
};
