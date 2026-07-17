import Button from "../ui/Button";

const AIActionPanel = ({
  loading,
  onExplain,
  onOptimize,
  onBug,
  onComplexity,
  onTests,
  onConvert,
}) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">🤖 AI Assistant</h2>

      <div className="grid grid-cols-2 gap-3">
        <Button onClick={onExplain} disabled={loading}>
          🧠 Explain
        </Button>

        <Button onClick={onOptimize} disabled={loading}>
          ⚡ Optimize
        </Button>

        <Button onClick={onBug} disabled={loading}>
          🐞 Find Bugs
        </Button>

        <Button onClick={onComplexity} disabled={loading}>
          📊 Complexity
        </Button>

        <Button onClick={onTests} disabled={loading}>
          🧪 Test Cases
        </Button>

        <Button onClick={onConvert} disabled={loading}>
          🔄 Convert
        </Button>
      </div>
    </div>
  );
};

export default AIActionPanel;
