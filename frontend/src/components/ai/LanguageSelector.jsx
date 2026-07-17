import Select from "../ui/Select";

const languages = [
  { label: "Java", value: "java" },
  { label: "Python", value: "python" },
  { label: "JavaScript", value: "javascript" },
  { label: "C++", value: "cpp" },
  { label: "C", value: "c" },
];

const LanguageSelector = ({ value, onChange }) => {
  return (
    <Select
      label="Target Language"
      options={languages}
      value={value}
      onChange={onChange}
    />
  );
};

export default LanguageSelector;
