const RightHero = () => {
  return (
    <div
      id="bg-overlay"
      className="relative hidden h-full bg-no-repeat bg-cover bg-hero-pattern lg:block"
    >
      <div className="relative flex items-center h-full px-8 mx-auto md:px-0 xl:max-w-md">
        <h1 className="px-12 text-4xl font-bold text-center text-white lg:leading-tight xl:leading-tight xl:text-5xl xl:px-0">
          Share your <span className="text-bc-secondary">ideas </span> and make
          a <span className="text-bc-tertiary">change.</span>
        </h1>
      </div>
    </div>
  );
};

export default RightHero;
