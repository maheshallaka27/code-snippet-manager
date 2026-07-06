import Collection from "../models/Collections.js";
import Snippet from "../models/Snippets.js";

export const createCollection = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name?.trim()) {
      return res.status(400).json({
        message: "please enter name",
      });
    }
    const collection = await Collection.create({
      name: name.trim(),
      description,
      owner: req.user._id,
    });
    return res.status(201).json({
      success: true,
      collection,
      message: "Collection created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find({
      owner: req.user._id,
    }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      success: true,
      collections,
      count: collections.length,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getCollectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await Collection.findOne({
      _id: id,
      owner: req.user._id,
    }).populate("snippets");
    if (!collection) {
      return res.status(404).json({
        message: "Collection not found",
      });
    }
    return res.status(200).json({
      success: true,
      collection,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!name?.trim()) {
      return res.status(400).json({
        message: "Please enter collection name",
      });
    }
    const collection = await Collection.findOneAndUpdate(
      {
        _id: id,
        owner: req.user._id,
      },
      {
        name,
        description,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!collection) {
      return res.status(404).json({
        message: "Collection not found",
      });
    }
    return res.status(200).json({
      success: true,
      collection,
      message: "Collection updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await Collection.findOneAndDelete({
      _id: id,
      owner: req.user._id,
    });
    if (!collection) {
      return res.status(404).json({
        message: "Collection not found",
      });
    }
    return res.status(200).json({
      success: true,
      collection,
      message: "Collection deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const addSnippetToCollection = async (req, res) => {
  try {
    const { collectionId, snippetId } = req.params;
    const snippet = await Snippet.findOne({
      _id: snippetId,
      owner: req.user._id,
    });
    if (!snippet) {
      return res.status(404).json({
        message: "Snippet not found",
      });
    }
    const collection = await Collection.findOneAndUpdate(
      {
        _id: collectionId,
        owner: req.user._id,
      },
      {
        $addToSet: {
          snippets: snippetId,
        },
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    ).populate("snippets");
    if (!collection) {
      return res.status(404).json({
        message: "Collection not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Snippet added to collection successfully",
      collection,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const removeSnippetFromCollection = async (req, res) => {
  try {
    const { collectionId, snippetId } = req.params;
    const snippet = await Snippet.findOne({
      _id: snippetId,
      owner: req.user._id,
    });
    if (!snippet) {
      return res.status(404).json({
        message: "Snippet not found",
      });
    }
    const collection = await Collection.findOneAndUpdate(
      {
        _id: collectionId,
        owner: req.user._id,
      },
      {
        $pull: {
          snippets: snippetId,
        },
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    ).populate("snippets");
    if (!collection) {
      return res.status(404).json({
        message: "Collection not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Snippet removed from collection successfully",
      collection,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
