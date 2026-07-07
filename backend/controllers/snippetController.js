import Snippet from "../models/Snippets.js";
import Version from "../models/Version.js";

export const createSnippet = async (req, res) => {
  try {
    const { title, description, language, code, tags } = req.body;
    if (!title || !language || !code) {
      return res.status(400).json({
        message: "please fill all the fields",
      });
    }
    const normalisedTags = tags.map((tag) => tag.trim().toLowerCase());
    const snippet = await Snippet.create({
      title,
      description,
      language,
      code,
      tags: normalisedTags,
      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      snippet,
      message: "Snippet created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getAllSnippets = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Number(req.query.limit) || 10);
    const sort = req.query.sort || "latest";
    const skip = (page - 1) * limit;
    let sortOption = {};
    if (sort === "latest") {
      sortOption = { createdAt: -1 };
    } else if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    } else if (sort === "mostViewed") {
      sortOption = { viewCount: -1 };
    } else if (sort === "mostCopied") {
      sortOption = { copyCount: -1 };
    } else if (sort === "favorites") {
      sortOption = { favorite: -1, createdAt: -1 };
    } else {
      sortOption = { createdAt: -1 };
    }
    const total = await Snippet.countDocuments({
      owner: req.user._id,
    });
    const totalPages = Math.ceil(total / limit);
    const snippets = await Snippet.find({
      owner: req.user._id,
    })
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .populate("owner", "name email");
    return res.status(200).json({
      success: true,
      page,
      limit,
      totalSnippets: total,
      totalPages,
      count: snippets.length,
      snippets,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getSnippetById = async (req, res) => {
  try {
    const { id } = req.params;
    const snippet = await Snippet.findOne({
      _id: id,
      owner: req.user._id,
    });
    if (!snippet) {
      return res.status(404).json({
        message: "Snippet not found",
      });
    }
    return res.status(200).json({
      success: true,
      snippet,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const updateSnippet = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, language, code, tags } = req.body;
    if (!title?.trim() || !language?.trim() || !code?.trim()) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const snippet = await Snippet.findOne({
      _id: id,
      owner: req.user._id,
    });
    if (!snippet) {
      return res.status(404).json({
        message: "Snippet not found",
      });
    }
    const normalizedTags = tags?.map((tag) => tag.trim().toLowerCase()) || [];
    if (
      snippet.title === title.trim() &&
      snippet.code === code.trim() &&
      snippet.language === language.trim() &&
      snippet.description === (description?.trim() || "") &&
      JSON.stringify(snippet.tags) === JSON.stringify(normalizedTags)
    ) {
      return res.status(200).json({
        success: true,
        message: "No changes detected",
        snippet,
      });
    }
    await Version.create({
      snippet: snippet._id,
      title: snippet.title,
      description: snippet.description,
      language: snippet.language,
      code: snippet.code,
      tags: snippet.tags,
    });
    snippet.title = title.trim();
    snippet.description = description?.trim() ?? snippet.description;
    snippet.language = language.trim();
    snippet.code = code.trim();
    snippet.tags = normalizedTags;
    await snippet.save();

    return res.status(200).json({
      success: true,
      snippet,
      message: "snippet updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteSnippet = async (req, res) => {
  try {
    const { id } = req.params;
    const snippet = await Snippet.findOneAndDelete({
      _id: id,
      owner: req.user._id,
    });
    if (!snippet) {
      return res.status(404).json({
        message: "No snippet found",
      });
    }
    return res.status(200).json({
      success: true,
      snippet,
      message: "Snippet deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const searchSnippet = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q?.trim()) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }
    const snippets = await Snippet.find({
      owner: req.user._id,
      $or: [
        {
          title: {
            $regex: q,
            $options: "i",
          },
        },
        {
          description: {
            $regex: q,
            $options: "i",
          },
        },
        {
          code: {
            $regex: q,
            $options: "i",
          },
        },
      ],
    });
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

export const filterLanguage = async (req, res) => {
  try {
    const { language } = req.query;
    if (!language?.trim()) {
      return res.status(400).json({
        message: "please enter language",
      });
    }
    const snippets = await Snippet.find({
      owner: req.user._id,
      language: {
        $regex: language,
        $options: "i",
      },
    });

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

export const filterTag = async (req, res) => {
  try {
    const { tag } = req.query;
    if (!tag?.trim()) {
      return res.status(400).json({
        message: "please enter tags",
      });
    }
    const snippets = await Snippet.find({
      owner: req.user._id,
      tags: {
        $regex: `^${tag.trim()}$`,
        $options: "i",
      },
    });
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

export const toggleFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const snippet = await Snippet.findOne({
      _id: id,
      owner: req.user._id,
    });
    if (!snippet) {
      return res.status(404).json({
        message: "Snippet not found",
      });
    }
    snippet.favorite = !snippet.favorite;
    await snippet.save();
    return res.status(200).json({
      success: true,
      message: snippet.favorite
        ? "Snippet added to favorites"
        : "Snippet removed from favorites",
      snippet,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getFavouriteSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find({
      owner: req.user._id,
      favorite: true,
    });
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

export const togglePublicVisibility = async (req, res) => {
  try {
    const { id } = req.params;
    const snippet = await Snippet.findOne({
      _id: id,
      owner: req.user._id,
    });
    if (!snippet) {
      return res.status(404).json({
        message: "Snippet not found",
      });
    }
    snippet.isPublic = !snippet.isPublic;
    await snippet.save();
    return res.status(200).json({
      success: true,
      message: snippet.isPublic
        ? "Snippet is now public"
        : "Snippet is now private",
      snippet,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getPublicSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find({
      isPublic: true,
    })
      .populate("owner", "name email")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: snippets.length,
      snippets,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const incrementViewCount = async (req, res) => {
  try {
    const { id } = req.params;
    const snippet = await Snippet.findOneAndUpdate(
      {
        _id: id,
        isPublic: true,
      },
      {
        $inc: {
          viewCount: 1,
        },
      },
      {
        new: true,
      },
    );
    if (!snippet) {
      return res.status(404).json({
        message: "Public snippet not found",
      });
    }
    return res.status(200).json({
      success: true,
      snippet,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const incrementCopyCount = async (req, res) => {
  try {
    const { id } = req.params;
    const snippet = await Snippet.findOneAndUpdate(
      {
        _id: id,
        isPublic: true,
      },
      {
        $inc: {
          copyCount: 1,
        },
      },
      {
        new: true,
      },
    );
    if (!snippet) {
      return res.status(404).json({
        message: "Public snippet not found",
      });
    }
    return res.status(200).json({
      success: true,
      snippet,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
