const EmptyState = ({ title, description }) => {
  return (
    <div className="rounded-lg border border-dashed p-10 text-center">
      <h2 className="text-xl font-semibold">{title}</h2>

      <p className="mt-2 text-gray-500">{description}</p>
    </div>
  );
};

export default EmptyState;
