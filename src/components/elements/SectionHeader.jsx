import Heading from "@/components/elements/Heading";

const SectionHeader = ({ title, className, children }) => {
  return (
    <div className={className}>
      {title && (
        <Heading
          as="h2"
          title={title}
          className="text-xl font-bold xl:text-2xl 2xl:text-3xl"
        />
      )}
      {children}
    </div>
  );
};

export default SectionHeader;
