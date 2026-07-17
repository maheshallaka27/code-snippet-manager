import { Copy, Bot } from "lucide-react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Loader from "../common/Loader";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
const AIResponseModal = ({ open, onClose, title, response, loading }) => {
  const copyResponse = async () => {
    try {
      await navigator.clipboard.writeText(response);
      toast.success("Copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={title} size="xl">
      {loading ? (
        <div className="flex h-72 items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="text-blue-600" size={24} />
              <h2 className="text-xl font-semibold">AI Response</h2>
            </div>

            <Button
              variant="secondary"
              className="w-auto"
              onClick={copyResponse}
            >
              <Copy size={18} />
              Copy
            </Button>
          </div>

          <div className="prose max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");

                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="rounded bg-slate-200 px-1 py-0.5">
                      {children}
                    </code>
                  );
                },
              }}
            >
              {response}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AIResponseModal;
