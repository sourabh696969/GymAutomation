const asyncHandler = require("express-async-handler");
const Gym = require("../models/gymModel");
const { GymSupport } = require("../models/supportModel");

const createSupportGym = asyncHandler(async (req, res) => {
  const { description } = req.body;
  const gymId = req.user;
  console.log(gymId);

  if (!description) {
    res.status(404);
    throw new Error("All Fields required!");
  }

  const gymData = await Gym.findById(gymId);

  if (!gymData) {
    res.status(404);
    throw new Error("Gym not found!");
  }

  const support = await GymSupport.create({
    description,
    gymData: gymId,
  });

  setTimeout(async () => {
    await GymSupport.findByIdAndDelete(support._id);
  }, 604800000);

  res.status(201).json({ message: "Support Created!", support });
});

const updateSupportStatusOfGym = asyncHandler(async (req, res) => {
  const supportId = req.params.id;
  const { status } = req.body;

  if (status === undefined || status === null || status === "") {
    res.status(404);
    throw new Error("All fields required!");
  }
  const updatesupport = await GymSupport.findByIdAndUpdate(supportId, {
    status: status,
  });

  if (!updatesupport) {
    res.status(404);
    throw new Error("data not found!");
  }

  res.status(200).json({ message: "Support updated successfully!" });
});

const getGymSupport = asyncHandler(async (req, res) => {
  const { page, limit, searchQuary } = req.query;

  const pages = Number(page) || 1;
  const limits = Number(limit) || 10;
  const skip = (pages - 1) * limits;

  const supportData = await GymSupport.find({
    $or: [
      {
        gymData: {
          $in: await Gym.find({
            $or: [
              { ownerName: { $regex: searchQuary, $options: "i" } },
              { gymName: { $regex: searchQuary, $options: "i" } },
            ],
          }).distinct("_id"),
        },
      },
    ],
  })
    .populate("gymData", "ownerName gymName phone")
    .skip(skip)
    .limit(limits);

  if (!supportData || supportData.length === 0) {
    res.status(404);
    throw new Error("data not found!");
  }
  res.status(200).json(supportData);
});

const getGymSupportById = asyncHandler(async (req, res) => {
  const supportId = req.params.id;
  const supportData = await GymSupport.findById(supportId).populate(
    "gymData",
    "ownerName gymName phone"
  );
  if (!supportData) {
    res.status(404);
    throw new Error("data not found!");
  }
  res.status(200).json(supportData);
});

const deleteGymSupport = asyncHandler(async (req, res) => {
  const supportId = req.params.id;
  const deletedSupport = await GymSupport.findByIdAndDelete(supportId);
  if (!deletedSupport) {
    res.status(404);
    throw new Error("data not found!");
  }
  res.status(200).json({ message: "Support deleted successfully!" });
});

module.exports = {
  createSupportGym,
  updateSupportStatusOfGym,
  getGymSupport,
  getGymSupportById,
  deleteGymSupport,
};
