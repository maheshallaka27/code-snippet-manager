import Snippet from "../models/Snippets.js";

export const createSnippet = async (req, res) => {
  try {
    const { title, description, language, code, tags } = req.body;
    if (!title || !language || !code) {
      return res.status(400).json({
        message: "please fill all the fields",
      });
    }
    const snippet = await Snippet.create({
      title,
      description,
      language,
      code,
      tags,
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
    const snippets = await Snippet.find({
      owner: req.user._id,
    }).populate("owner", "name email");
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
    const snippet = await Snippet.findOneAndUpdate(
      {
        _id: id,
        owner: req.user._id,
      },
      {
        title,
        description,
        language,
        code,
        tags,
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );
    if (!snippet) {
      return res.status(404).json({
        message: "Snippet not found",
      });
    }
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
