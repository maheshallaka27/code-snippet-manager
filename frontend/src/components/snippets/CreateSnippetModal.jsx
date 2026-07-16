import { useState } from "react";
import { useForm } from "react-hook-form";
import Editor from "@monaco-editor/react";

import Modal from "../ui/Modal";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { createSnippet } from "../../services/snippet.service.js";
import toast from "react-hot-toast";
const languages = [
  { label: "Java", value: "java" },
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "C++", value: "cpp" },
  { label: "C", value: "c" },
];

const CreateSnippetModal = ({ open, onClose, refreshSnippets }) => {
  const [code, setCode] = useState("// Write your code here...");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      language: "java",
      tags: "",
    },
  });

  const onSubmit = async (data) => {
    if (!code.trim()) {
      toast.error("Code cannot be empty");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...data,
        code,
        tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
      };

      await createSnippet(payload);

      toast.success("Snippet created successfully");

      refreshSnippets();

      reset();

      setCode("// Write your code here...");

      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create snippet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} title="Create Snippet" onClose={onClose} size="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Title"
          placeholder="Enter snippet title"
          error={errors.title?.message}
          {...register("title", {
            required: "Title is required",
          })}
        />

        <TextArea
          label="Description"
          placeholder="Short description..."
          rows={3}
          {...register("description")}
        />

        <Select
          label="Language"
          options={languages}
          error={errors.language?.message}
          {...register("language", {
            required: "Language is required",
          })}
        />

        <Input
          label="Tags"
          placeholder="arrays, graph, dp"
          {...register("tags")}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Code
          </label>

          <div className="overflow-hidden rounded-xl border border-slate-300">
            <Editor
              height="450px"
              language={watch("language")}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                fontSize: 15,
                minimap: {
                  enabled: false,
                },
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-2">
          <Button
            type="button"
            variant="secondary"
            className="w-auto"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button type="submit" className="w-auto" disabled={loading}>
            {loading ? "Creating..." : "Create Snippet"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateSnippetModal;
