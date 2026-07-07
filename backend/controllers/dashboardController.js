import Collection from "../models/Collections.js";
import Snippet from "../models/Snippets.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalSnippets = await Snippet.countDocuments({
      owner: req.user._id,
    });
    const totalFavorites = await Snippet.countDocuments({
      owner: req.user._id,
      favorite: true,
    });
    const totalPublic = await Snippet.countDocuments({
      owner: req.user._id,
      isPublic: true,
    });
    const totalCollections = await Collection.countDocuments({
      owner: req.user._id,
    });
    const snippets = await Snippet.find({
      owner: req.user._id,
    }).select("viewCount copyCount");
    let totalViews = 0;
    let totalCopies = 0;
    snippets.forEach((snippet) => {
      totalViews += snippet.viewCount;
      totalCopies += snippet.copyCount;
    });
    return res.status(200).json({
      success: true,
      stats: {
        totalSnippets,
        totalFavorites,
        totalPublic,
        totalCollections,
        totalViews,
        totalCopies,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getRecentSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find({
      owner: req.user._id,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("owner", "name email");

    return res.status(200).json({
      success: true,
      count: snippets.length,
      snippets,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
