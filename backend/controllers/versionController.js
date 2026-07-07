import Version from "../models/Version.js";
import Snippet from "../models/Snippets.js";

export const getVersionHistory = async (req, res) => {
  try {
    const { snippetId } = req.params;
    const snippet = await Snippet.findOne({
      _id: snippetId,
      owner: req.user._id,
    });
    if (!snippet) {
      return res.status(404).json({
        message: "Snippet not found",
      });
    }
    const versions = await Version.find({
      snippet: snippetId,
    }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      success: true,
      count: versions.length,
      versions,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const restoreVersion = async (req, res) => {
  try {
    const { versionId } = req.params;
    const version = await Version.findById(versionId);
    if (!version) {
      return res.status(404).json({
        message: "Version not found",
      });
    }
    const snippet = await Snippet.findOne({
      _id: version.snippet,
      owner: req.user._id,
    });
    if (!snippet) {
      return res.status(404).json({
        message: "Snippet not found",
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

    snippet.title = version.title;

    snippet.description = version.description;

    snippet.language = version.language;

    snippet.code = version.code;

    snippet.tags = version.tags;

    await snippet.save();

    return res.status(200).json({
      success: true,
      message: "Version restored successfully",
      restoredFrom: version._id,
      snippet,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
