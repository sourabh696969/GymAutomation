const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { UserSupport } = require("../models/supportModel");
const { Notification } = require("../models/subAdminNotificationModel");

const createSupportUser = asyncHandler(async (req, res) => {
  const { description } = req.body;
  const userId = req.user;
  console.log(userId);

  if (!description) {
    res.status(404);
    throw new Error("All Fields required!");
  }

  const userData = await User.findById(userId);

  if (!userData) {
    res.status(404);
    throw new Error("User not found!");
  }

  const support = await UserSupport.create({
    description,
    userData: userId,
  });

  setTimeout(async () => {
    await UserSupport.findByIdAndDelete(support._id);
  }, 604800000);

  res.status(201).json({ message: "Support Created!", support });
  await Notification.create({
    notification: `${userData.name} !! New Quary registered.`,
  });
});

const updateSupportStatusOfUser = asyncHandler(async (req, res) => {
  const supportId = req.params.id;
  const { status } = req.body;

  if (status === undefined || status === null || status === "") {
    res.status(404);
    throw new Error("All fields required!");
  }
  const updatesupport = await UserSupport.findByIdAndUpdate(supportId, {
    status: status,
  });

  if (!updatesupport) {
    res.status(404);
    throw new Error("data not found!");
  }

  res.status(200).json({ message: "Support updated successfully!" });
});

const getUserSupport = asyncHandler(async (req, res) => {
  const { page, limit, searchQuary } = req.query;

  const pages = Number(page) || 1;
  const limits = Number(limit) || 10;
  const skip = (pages - 1) * limits;

  const supportData = await UserSupport.find({
    $or: [
      {
        userData: {
          $in: await User.find({
            $or: [{ name: { $regex: searchQuary, $options: "i" } }],
          }).distinct("_id"),
        },
      },
    ],
  })
    .populate("userData", "name phone")
    .skip(skip)
    .limit(limits);

  if (!supportData || supportData.length === 0) {
    res.status(404);
    throw new Error("data not found!");
  }
  res.status(200).json(supportData);
});

const getUserSupportById = asyncHandler(async (req, res) => {
  const supportId = req.params.id;
  const supportData = await UserSupport.findById(supportId).populate(
    "userData",
    "name phone"
  );
  if (!supportData) {
    res.status(404);
    throw new Error("data not found!");
  }
  res.status(200).json(supportData);
});

const deleteUserSupport = asyncHandler(async (req, res) => {
  const supportId = req.params.id;
  const deletedSupport = await UserSupport.findByIdAndDelete(supportId);
  if (!deletedSupport) {
    res.status(404);
    throw new Error("data not found!");
  }
  res.status(200).json({ message: "Support deleted successfully!" });
});

module.exports = {
  createSupportUser,
  updateSupportStatusOfUser,
  getUserSupport,
  getUserSupportById,
  deleteUserSupport,
};
